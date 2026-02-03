import { create } from 'zustand';
import type { ConsoleConfig, HistoryMessageType } from '../types/consoleConfig';
import {createDefaultConsoleConfig} from "../utils/consoleConfig.ts";

interface ConsoleConfigState extends ConsoleConfig {
    // Методы для изменения отдельных флагов
    setConfig: (key: HistoryMessageType, value: boolean) => void;

    // Методы для сброса всех флагов
    resetAll: () => void;
    setAll: (value: boolean) => void;

    // Метод для проверки, нужно ли выводить сообщение
    shouldShow: (key: HistoryMessageType) => boolean;
}

export const useConsoleConfigStore = create<ConsoleConfigState>((set, get) => {
    const defaultConfig = createDefaultConsoleConfig();

    return {
        ...defaultConfig,

        setConfig: (key, value) => {
            set({ [key]: value } as Partial<ConsoleConfigState>);
        },

        resetAll: () => {
            set(defaultConfig);
        },

        setAll: (value) => {
            set({
                startExecution: value,
                syncCodeExecuted: value,
                executionCompleted: value,
                maxIterationsWarning: value,
                clickRunFirst: value,
                noTasks: value,
                processedMicrotask: value,
                processedMacrotask: value,
                scheduled: value,
                processing: value,
                addedToCallStack: value,
                removedFromCallStack: value,
                consoleLog: value,
                errorPrefix: value,
            });
        },

        shouldShow: (key) => {
            return get()[key];
        },
    };
});