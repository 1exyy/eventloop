export type HistoryMessageType =
    | 'startExecution'
    | 'syncCodeExecuted'
    | 'executionCompleted'
    | 'maxIterationsWarning'
    | 'clickRunFirst'
    | 'noTasks'
    | 'processedMicrotask'
    | 'processedMacrotask'
    | 'scheduled'
    | 'processing'
    | 'addedToCallStack'
    | 'removedFromCallStack'
    | 'consoleLog'
    | 'errorPrefix';

export interface ConsoleConfig {
    startExecution: boolean;
    syncCodeExecuted: boolean;
    executionCompleted: boolean;
    maxIterationsWarning: boolean;
    clickRunFirst: boolean;
    noTasks: boolean;
    processedMicrotask: boolean;
    processedMacrotask: boolean;
    scheduled: boolean;
    processing: boolean;
    addedToCallStack: boolean;
    removedFromCallStack: boolean;
    consoleLog: boolean;
    errorPrefix: boolean;
}

