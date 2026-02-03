
export const completionTimeMs = 2000;

export const messages = {
    defaultCode: `console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
});

console.log('End');`,

    history: {
        startExecution: 'Starting execution...' as const,
        syncCodeExecuted: 'Synchronous code executed' as const,
        executionCompleted: 'Execution completed!' as const,
        maxIterationsWarning: 'Warning: Maximum iterations reached (possible infinite loop)' as const,
        clickRunFirst: 'Click "Run" first to start execution' as const,
        noTasks: 'No tasks to process' as const,
        processedMicrotask: 'Processed one microtask' as const,
        processedMacrotask: 'Processed one macrotask' as const,
        scheduled: (taskName: string) => `Scheduled ${taskName}` as const,
        processing: (taskName: string) => `Processing ${taskName}` as const,
        addedToCallStack: (taskName: string) => `Added '${taskName}' to CallStack` as const,
        removedFromCallStack: (taskName: string) => `Removed '${taskName}' from CallStack after execution` as const,
        consoleLog: (msg: any) => `Console.log: ${String(msg)}` as const,
        errorPrefix: (msg: string) => `Error: ${msg}` as const,
    },

    tasks: {
        setTimeout: (delay: number) => `setTimeout callback (delay: ${delay})` as const,
        setInterval: (delay: number) => `setInterval callback (delay: ${delay})` as const,
        promiseThen: 'Promise.then callback' as const,
        promiseCatch: 'Promise.catch callback' as const,
        setImmediate: 'setImmediate callback' as const,
        queueMicrotask: 'queueMicrotask callback' as const,
        microtaskPrefix: 'Microtask: ' as const,
        macrotaskPrefix: 'Macrotask: ' as const,
    },

    stack: {
        globalScript: '<global_script>' as const,
    },
};

export type Messages = typeof messages;