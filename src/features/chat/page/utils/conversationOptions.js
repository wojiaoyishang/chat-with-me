// Each conversation has its own serialized writer. An acknowledgement or WS
// snapshot may update saved values, but must not overwrite a newer local edit.
export class ConversationOptionsWriter {
    constructor({ save, onValues, onError }) {
        this.save = save;
        this.onValues = onValues;
        this.onError = onError;
        this.revision = -1;
        this.options = {};
        this.pending = {};
        this.inflight = null;
        this.running = null;
        this.timer = null;
    }

    apply(snapshot) {
        const revision = Number(snapshot.revision ?? 0);
        if (revision < this.revision) return;
        this.revision = revision;
        this.options = { ...this.options, ...snapshot.options };
        this.onValues({ ...this.options, ...this.inflight, ...this.pending });
    }

    edit(patch, delay = 0) {
        this.pending = { ...this.pending, ...patch };
        clearTimeout(this.timer);
        if (delay) this.timer = setTimeout(() => { void this.flush().catch(() => {}); }, delay);
        else void this.flush().catch(() => {});
    }

    flush() {
        clearTimeout(this.timer);
        this.timer = null;
        if (this.running) return this.running;
        if (!Object.keys(this.pending).length) return Promise.resolve();
        this.running = this.drain().finally(() => { this.running = null; });
        return this.running;
    }

    async drain() {
        while (Object.keys(this.pending).length) {
            const patch = this.pending;
            this.pending = {};
            this.inflight = patch;
            try {
                const snapshot = await this.save(patch);
                this.inflight = null;
                this.apply(snapshot);
            } catch (error) {
                this.inflight = null;
                this.pending = { ...patch, ...this.pending };
                this.onError(error);
                throw error;
            }
        }
    }
}
