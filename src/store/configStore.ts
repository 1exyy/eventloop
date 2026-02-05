import {create} from 'zustand';
import {completionTimeMs as defaultCompletionTimeMs} from '../constants/config.ts';

interface ConfigState {
    // Время выполнения задачи (микро/макротаски)
    completionTimeMs: number;
    setCompletionTimeMs: (time: number) => void;

    // Время выполнения синхронного кода
    syncCodeExecutionTimeMs: number;
    setSyncCodeExecutionTimeMs: (time: number) => void;

    // Максимальное количество итераций
    maxIterations: number;
    setMaxIterations: (max: number) => void;

    // Задержка между шагами при пошаговом выполнении
    stepDelayMs: number;
    setStepDelayMs: (delay: number) => void;

    reset: () => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
    completionTimeMs: defaultCompletionTimeMs,
    setCompletionTimeMs: (time) => set({completionTimeMs: time}),

    syncCodeExecutionTimeMs: 100,
    setSyncCodeExecutionTimeMs: (time) => set({syncCodeExecutionTimeMs: time}),

    maxIterations: 1000,
    setMaxIterations: (max) => set({maxIterations: max}),

    stepDelayMs: 500,
    setStepDelayMs: (delay) => set({stepDelayMs: delay}),

    reset: () => set({
        completionTimeMs: defaultCompletionTimeMs,
        syncCodeExecutionTimeMs: 100,
        maxIterations: 1000,
        stepDelayMs: 500,
    }),
}));