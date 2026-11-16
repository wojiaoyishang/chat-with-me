import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { webcrypto } from 'node:crypto';
import vm from 'node:vm';
import { generateUUID } from '../src/lib/uuid.js';
import { commandRows, commandProfileFromRows } from '../src/features/workspace/components/commandProfile.js';
import { workflowId } from '../src/features/workflows/workflowModel.js';

const source = readFileSync(new URL('../src/lib/uuid.js', import.meta.url), 'utf8')
    .replace('export function generateUUID', 'function generateUUID');
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

test('UUID generation uses the native method with its crypto receiver', () => {
    const expected = '00000000-0000-4000-8000-000000000001';
    const crypto = { randomUUID() { assert.equal(this, crypto); return expected; } };
    assert.equal(vm.runInNewContext(`${source}\ngenerateUUID()`, { crypto }), expected);
});

test('HTTP fallback sets the UUID version and variant and retains random bytes', () => {
    for (const [byte, expected] of [
        [0, '00000000-0000-4000-8000-000000000000'],
        [255, 'ffffffff-ffff-4fff-bfff-ffffffffffff'],
    ]) {
        const crypto = { getRandomValues(bytes) { assert.equal(this, crypto); assert.equal(bytes.length, 16); return bytes.fill(byte); } };
        assert.equal(vm.runInNewContext(`${source}\ngenerateUUID()`, { crypto }), expected);
    }
});

test('workspace command configuration and workflow IDs work without randomUUID', (t) => {
    const original = Object.getOwnPropertyDescriptor(globalThis, 'crypto');
    Object.defineProperty(globalThis, 'crypto', {
        configurable: true,
        value: { getRandomValues: webcrypto.getRandomValues.bind(webcrypto) },
    });
    t.after(() => Object.defineProperty(globalThis, 'crypto', original));

    const profile = { commands: { inspect: { argv: ['python', '-V'], cwd: '.', timeoutSeconds: 30 } } };
    const rows = commandRows(profile);
    assert.match(rows[0].key, uuidPattern);
    assert.deepEqual(commandProfileFromRows(rows, profile), {
        commands: { inspect: { ...profile.commands.inspect, allowExtraArgs: false } },
    });
    assert.match(workflowId(), uuidPattern);
    const ids = Array.from({ length: 1000 }, () => generateUUID());
    assert.ok(ids.every(id => uuidPattern.test(id)));
    assert.equal(new Set(ids).size, ids.length);
});
