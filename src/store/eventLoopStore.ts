import { create } from 'zustand';
import { useConfigStore } from './configStore';
import { useConsoleConfigStore } from './consoleConfigStore';
import { messages } from '../constants/config.ts';
import type { HistoryMessageType } from '../types/consoleConfig';

type Task = {
    name: string;
    callback: () => void;
};

interface EventLoopState {
    code: string;
    setCode: (code: string) => void;

    isRunning: boolean;
    setIsRunning: (isRunning: boolean) => void;

    callStack: string[];
    addToCallStack: (fn: string) => void;
    removeFromCallStack: () => void;

    microtasks: Task[];
    macrotasks: Task[];

    addToMicrotasks: (task: Task) => void;
    addToMacrotasks: (task: Task) => void;

    executionHistory: Array<{ message: string; type: HistoryMessageType }>;
    addToHistory: (message: string, type: HistoryMessageType) => void;

    reset: () => void;

    run: () => Promise<void>;
    step: () => Promise<void>;
    stop: () => void;

    processNextMicrotask: () => Promise<void>;
    processNextMacrotask: () => Promise<void>;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let shouldStop = false;

export const useEventLoopStore = create<EventLoopState>((set, get) => ({
    // ===============================
    // базовое состояние
    // ===============================

    code: messages.defaultCode,
    setCode: (code) => set({ code }),

    isRunning: false,
    setIsRunning: (isRunning) => set({ isRunning }),

    callStack: [],

    addToCallStack: (fn) => {
        set((s) => ({ callStack: [...s.callStack, fn] }));
        get().addToHistory(messages.history.addedToCallStack(fn), 'addedToCallStack');
    },

    removeFromCallStack: () => {
        set((s) => ({ callStack: s.callStack.slice(0, -1) }));
        const currentStack = get().callStack;
        if (currentStack.length > 0) {
            const lastFn = currentStack[currentStack.length - 1];
            get().addToHistory(messages.history.removedFromCallStack(lastFn), 'removedFromCallStack');
        }
    },

    microtasks: [],
    macrotasks: [],

    addToMicrotasks: (task) =>
        set((s) => ({ microtasks: [...s.microtasks, task] })),

    addToMacrotasks: (task) =>
        set((s) => ({ macrotasks: [...s.macrotasks, task] })),

    executionHistory: [],

    addToHistory: (message: string, type: HistoryMessageType) => {
        const shouldShow = useConsoleConfigStore.getState().shouldShow(type);

        if (shouldShow) {
            set((s) => ({
                executionHistory: [...s.executionHistory, { message, type }],
            }));
        }
    },

    reset: () =>
        set({
            code: messages.defaultCode,
            isRunning: false,
            callStack: [],
            microtasks: [],
            macrotasks: [],
            executionHistory: [],
        }),

    // ===============================
    // функция остановки
    // ===============================

    stop: () => {
        shouldStop = true;
        get().setIsRunning(false);
        get().addToHistory(messages.history.executionCompleted, 'executionCompleted');
    },

    // ===============================
    // обработка microtask
    // ===============================

    processNextMicrotask: async () => {
        const { microtasks } = get();
        if (!microtasks.length) return;

        if (shouldStop) {
            shouldStop = false;
            return;
        }

        const [task, ...rest] = microtasks;

        set({ microtasks: rest });

        get().addToCallStack(task.name);
        get().addToHistory(messages.history.processing(task.name), 'processing');

        task.callback();

        const completionTime = useConfigStore.getState().completionTimeMs;
        await sleep(completionTime);

        get().removeFromCallStack();
    },

    // ===============================
    // обработка macrotask
    // ===============================

    processNextMacrotask: async () => {
        const { macrotasks } = get();
        if (!macrotasks.length) return;

        if (shouldStop) {
            shouldStop = false;
            return;
        }

        const [task, ...rest] = macrotasks;

        set({ macrotasks: rest });

        get().addToCallStack(task.name);
        get().addToHistory(messages.history.processing(task.name), 'processing');

        task.callback();

        const completionTime = useConfigStore.getState().completionTimeMs;
        await sleep(completionTime);

        get().removeFromCallStack();
    },

    // ===============================
    // RUN (полный цикл event loop)
    // ===============================

    run: async () => {
        shouldStop = false;

        const {
            addToHistory,
            setIsRunning,
            addToMicrotasks,
            addToMacrotasks,
            addToCallStack,
            removeFromCallStack,
            processNextMicrotask,
            processNextMacrotask,
        } = get();

        // Получаем конфигурацию из configStore
        const { syncCodeExecutionTimeMs, maxIterations } = useConfigStore.getState();

        setIsRunning(true);

        addToHistory(messages.history.startExecution, 'startExecution');
        addToCallStack(messages.stack.globalScript);

        try {
            // =====================================
            // фейковый runtime
            // =====================================

            const context = {
                console: {
                    log: (msg: any) =>
                        addToHistory(messages.history.consoleLog(msg), 'consoleLog'),
                },

                queueMicrotask: (cb: Function) => {
                    const name = messages.tasks.queueMicrotask;

                    addToMicrotasks({
                        name,
                        callback: () => cb(),
                    });

                    addToHistory(messages.history.scheduled(name), 'scheduled');
                },

                setTimeout: (cb: Function, delay: number) => {
                    const name = messages.tasks.setTimeout(delay);

                    addToMacrotasks({
                        name,
                        callback: () => cb(),
                    });

                    addToHistory(messages.history.scheduled(name), 'scheduled');
                },

                setInterval: (cb: Function, delay: number) => {
                    const name = messages.tasks.setInterval(delay);

                    addToMacrotasks({
                        name,
                        callback: () => {
                            cb();
                            context.setInterval(cb, delay);
                        },
                    });

                    addToHistory(messages.history.scheduled(name), 'scheduled');
                },

                Promise: {
                    resolve: () => ({
                        then: (cb: Function) => {
                            const name = messages.tasks.promiseThen;

                            addToMicrotasks({
                                name,
                                callback: () => cb(),
                            });

                            addToHistory(messages.history.scheduled(name), 'scheduled');

                            return this;
                        },
                    }),
                },
            };

            // =====================================
            // выполнение sync кода
            // =====================================

            const wrappedCode = `(function(){ ${get().code} })();`;

            new Function(
                'context',
                `
        const { console, setTimeout, setInterval, Promise, queueMicrotask } = context;
        ${wrappedCode}
      `
            )(context);

            await sleep(syncCodeExecutionTimeMs);

            addToHistory(messages.history.syncCodeExecuted, 'syncCodeExecuted');
            removeFromCallStack();

            let guard = 0;

            while (
                (get().microtasks.length || get().macrotasks.length) &&
                guard < maxIterations
                ) {
                if (shouldStop) {
                    shouldStop = false;
                    break;
                }

                while (get().microtasks.length) {
                    if (shouldStop) {
                        shouldStop = false;
                        return;
                    }
                    await processNextMicrotask();
                }

                if (get().macrotasks.length) {
                    await processNextMacrotask();
                }

                guard++;
            }

            if (guard >= maxIterations) {
                addToHistory(messages.history.maxIterationsWarning, 'maxIterationsWarning');
            }

            if (!shouldStop) {
                addToHistory(messages.history.executionCompleted, 'executionCompleted');
            }
        } catch (error: any) {
            get().reset();
            addToHistory(messages.history.errorPrefix(error.message), 'errorPrefix');
        } finally {
            setIsRunning(false);
        }
    },

    step: async () => {
        const {
            microtasks,
            macrotasks,
            processNextMicrotask,
            processNextMacrotask,
            addToHistory,
            isRunning,
        } = get();

        if (!isRunning) {
            addToHistory(messages.history.clickRunFirst, 'clickRunFirst');
            return;
        }

        const { stepDelayMs } = useConfigStore.getState();

        if (microtasks.length) {
            await processNextMicrotask();
            await sleep(stepDelayMs);
        } else if (macrotasks.length) {
            await processNextMacrotask();
            await sleep(stepDelayMs);
        } else {
            addToHistory(messages.history.noTasks, 'noTasks');
        }
    },
}));