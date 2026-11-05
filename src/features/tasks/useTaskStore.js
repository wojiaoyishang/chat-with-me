import { create } from 'zustand';
export const useTaskStore = create((set) => ({
    ownerKey: '',
    summary: null,
    statusEpoch: 0,
    tasks: {},
    open: false,
    selectedId: null,
    show: (selectedId = null) => set({ open: true, selectedId }),
    setOpen: (open) => set({ open }),
    bindOwner: (ownerKey) => set((state) => state.ownerKey === ownerKey ? state : {
        ownerKey, tasks: {}, summary: null, statusEpoch: 0, open: false, selectedId: null,
    }),
    setSummary: (summary, ownerKey, statusEpoch) => {
        let accepted = false;
        set((state) => {
            if (state.ownerKey !== ownerKey || state.statusEpoch !== statusEpoch ||
                !Number.isInteger(summary?.activeCount) || summary.activeCount < 0) return state;
            accepted = true;
            return { summary };
        });
        return accepted;
    },
    merge: (items) =>
        set((state) => {
            const tasks = { ...state.tasks };
            let statusEpoch = state.statusEpoch;
            for (const item of items) {
                if (!item || typeof item.taskId !== 'string' || !item.taskId || !Number.isInteger(item.revision))
                    continue;
                if (!tasks[item.taskId] || tasks[item.taskId].revision <= item.revision) {
                    const previous = tasks[item.taskId];
                    tasks[item.taskId] = { ...previous, ...item };
                    if (typeof item.status === 'string' && (!previous || previous.status !== item.status)) statusEpoch += 1;
                    if (!Object.hasOwn(item, 'observation') && previous?.observation)
                        tasks[item.taskId].observation = previous.observation;
                    if (item.observation?.version === 1 && previous?.observation?.version === 1 &&
                        item.observation.revision < previous.observation.revision)
                        tasks[item.taskId].observation = previous.observation;
                }
            }
            return { tasks, statusEpoch };
        }),
}));
