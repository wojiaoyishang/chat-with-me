/* Notifications only: no fetch interception or application caching. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        (async () => {
            const target = new URL(event.notification.data?.url || self.registration.scope);
            if (target.origin !== self.location.origin || !target.href.startsWith(self.registration.scope)) return;
            const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
            const existing = windows.find((client) => client.url.startsWith(self.registration.scope));
            if (existing) {
                await existing.navigate(target.href);
                await existing.focus();
            } else await self.clients.openWindow(target.href);
        })(),
    );
});
