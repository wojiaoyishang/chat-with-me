import { create } from 'zustand';
import {shareJsonData} from '../../lib/structuralShare.js';
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
            return state.summary === shareJsonData(state.summary, summary) ? state : { summary };
        });
        return accepted;
    },
    merge: (items) =>
        set((state) => {
            let tasks = state.tasks;
            let statusEpoch = state.statusEpoch;
            for (const item of items) {
                if (!item || typeof item.taskId !== 'string' || !item.taskId || !Number.isInteger(item.revision))
                    continue;
                if (!tasks[item.taskId] || tasks[item.taskId].revision <= item.revision) {
                    const previous = tasks[item.taskId];
                    const next = { ...previous, ...item };
                    if (!Object.hasOwn(item, 'observation') && previous?.observation)
                        next.observation = previous.observation;
                    if (item.observation?.version === 1 && previous?.observation?.version === 1 &&
                        item.observation.revision < previous.observation.revision)
                        next.observation = previous.observation;
                    const shared = shareJsonData(previous, next);
                    if (shared === previous) continue;
                    if (tasks === state.tasks) tasks = {...tasks};
                    tasks[item.taskId] = shared;
                    if (typeof item.status === 'string' && (!previous || previous.status !== item.status)) statusEpoch += 1;
                }
            }
            return tasks === state.tasks ? state : { tasks, statusEpoch };
        }),
}));
