/** Release pending downloads and playback owned by a departing Story surface. */
export function releaseStoryMedia(resources) {
    for (const resource of resources) {
        try {
            if (resource.tagName === 'IMG') {
                resource.removeAttribute('srcset');
                resource.removeAttribute('src');
                continue;
            }
            resource.pause();
            resource.removeAttribute('src');
            for (const source of resource.querySelectorAll('source')) source.removeAttribute('src');
            resource.load();
        } catch {
            // A detached player must not prevent releasing the remaining resources.
        }
    }
}
