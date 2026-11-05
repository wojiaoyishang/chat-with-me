import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const source = fs.readFileSync(new URL('../src/runtime/backend/bootstrapRequests.js', import.meta.url), 'utf8')
    .replace(/^import .*;\r?\n/gm, '').replaceAll('export function ', 'function ');
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return {promise, resolve, reject}; };
const settle = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };

function harness() {
    const requests = [];
    const current = {scope: {id: 'default', url: '/api', epoch: 0}, token: 'one', user: '1'};
    const context = {exports: {}, URL, URLSearchParams, navigator: {language: 'en'},
        getBackendConnection: () => current.scope, getConnectionToken: () => current.token,
        getConnectionUserId: () => current.user,
        apiClient: {get: (path, options) => { const work = deferred(); requests.push({path, options, ...work}); return work.promise; }},
    };
    vm.runInNewContext(source + '\nexports.load = loadBootstrapResource; exports.start = startDashboardLoad; exports.redirect = loginRedirectTarget;', context);
    return {...context.exports, requests, current};
}

test('authenticated chat becomes ready while decorative dashboard data is still pending', async () => {
    const app = harness(), calls = [];
    app.start({userEndpoint: '/user/info', displayEndpoint: '/dashboard',
        onUser: value => calls.push(['user', value.id]), onDisplay: () => calls.push(['display']),
        onUserError: () => calls.push(['user-error']), onDisplayError: () => calls.push(['display-error']),
        onReady: () => calls.push(['ready']),
    });
    assert.deepEqual(app.requests.map(item => item.path), ['/dashboard', '/user/info']);
    app.requests[1].resolve({id: 1});
    await settle();
    assert.deepEqual(calls, [['user', 1], ['ready']]);
    app.requests[0].reject(new Error('slow unavailable logo'));
    await settle();
    assert.deepEqual(calls, [['user', 1], ['ready'], ['display-error']]);
});

test('StrictMode replay reuses initial GETs and retired consumers never update state', async () => {
    const app = harness(), calls = [];
    const options = label => ({userEndpoint: '/user/info', displayEndpoint: '/dashboard',
        onUser: () => calls.push(label + ':user'), onDisplay: () => calls.push(label + ':display'),
        onUserError: () => {}, onDisplayError: () => {}, onReady: () => calls.push(label + ':ready'),
    });
    app.start(options('retired'))();
    app.start(options('active'));
    assert.equal(app.requests.length, 2);
    for (const request of app.requests) { assert.equal(request.options.timeout, 10000); request.resolve({}); }
    await settle();
    assert.deepEqual(calls.sort(), ['active:display', 'active:ready', 'active:user']);
});

test('bootstrap in-flight sharing is scoped to backend, credentials and locale and failures release it', async () => {
    const app = harness();
    const first = app.load('/user/info');
    assert.equal(app.load('/user/info'), first);
    app.current.token = 'two';
    const nextLogin = app.load('/user/info');
    assert.notEqual(nextLogin, first);
    app.current.scope = {...app.current.scope, epoch: 1};
    const nextBackend = app.load('/user/info');
    assert.notEqual(nextBackend, nextLogin);
    app.requests[0].resolve({}); app.requests[1].resolve({}); app.requests[2].reject(new Error('offline'));
    await assert.rejects(nextBackend, /offline/);
    await Promise.all([first, nextLogin]);
    const retry = app.load('/user/info');
    assert.equal(app.requests.length, 4);
    app.requests[3].resolve({});
    await retry;
});

test('SPA login keeps internal destinations and rejects external or login-loop redirects', () => {
    const app = harness();
    for (const redirect of ['https://other.test/chat', '//other.test/chat', '/\\other.test/chat', '/login']) {
        assert.equal(app.redirect('?redirect=' + encodeURIComponent(redirect), 'https://chat.test'), '/chat');
    }
    assert.equal(app.redirect('?redirect=' + encodeURIComponent('/chat/one?focus=two#last'), 'https://chat.test'), '/chat/one?focus=two#last');
    assert.equal(app.redirect('', 'https://chat.test'), '/chat');
});
