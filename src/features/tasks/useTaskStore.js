import { create } from 'zustand';
export const useTaskStore = create((set) => ({
    tasks: {},
    open: false,
    selectedId: null,
    show: (selectedId = null) => set({ open: true, selectedId }),
    setOpen: (open) => set({ open }),
    merge: (items) =>
        set((state) => {
            const tasks = { ...state.tasks };
            for (const item of items) {
                if (!item || typeof item.taskId !== 'string' || !item.taskId || !Number.isInteger(item.revision))
                    continue;
                if (!tasks[item.taskId] || tasks[item.taskId].revision <= item.revision) {
                    const previous = tasks[item.taskId];
                    tasks[item.taskId] = { ...previous, ...item };
                    if (!Object.hasOwn(item, 'observation') && previous?.observation)
                        tasks[item.taskId].observation = previous.observation;
                    if (item.observation?.version === 1 && previous?.observation?.version === 1 &&
                        item.observation.revision < previous.observation.revision)
                        tasks[item.taskId].observation = previous.observation;
                }
            }
            return { tasks };
        }),
}));
