import type {ConsoleConfig} from "../types/consoleConfig.ts";

export const createDefaultConsoleConfig = (): ConsoleConfig => ({
    startExecution: true,
    syncCodeExecuted: true,
    executionCompleted: true,
    maxIterationsWarning: true,
    clickRunFirst: true,
    noTasks: true,
    processedMicrotask: true,
    processedMacrotask: true,
    scheduled: true,
    processing: true,
    addedToCallStack: true,
    removedFromCallStack: true,
    consoleLog: true,
    errorPrefix: true,
});