const subscribers = new Set();
let stop = null;

export const mobileSnapshot = () => typeof window !== 'undefined' && window.innerWidth < 768;
export const mobileServerSnapshot = () => false;

/** All message instances share one browser breakpoint listener. */
export function subscribeMobile(callback) {
    subscribers.add(callback);
    if (!stop && typeof window !== 'undefined') {
        const notify = () => { for (const subscriber of [...subscribers]) subscriber(); };
        const view = window;
        const query = view.matchMedia?.('(max-width: 767px)');
        if (query?.addEventListener) {
            query.addEventListener('change', notify);
            stop = () => query.removeEventListener('change', notify);
        } else {
            view.addEventListener('resize', notify);
            stop = () => view.removeEventListener('resize', notify);
        }
    }
    return () => {
        subscribers.delete(callback);
        if (!subscribers.size) { stop?.(); stop = null; }
    };
}
