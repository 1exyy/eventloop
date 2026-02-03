import type { HistoryMessageType } from '../types/consoleConfig';

export const consoleLabels: Record<HistoryMessageType, string> = {
    startExecution: 'Начало выполнения',
    syncCodeExecuted: 'Синхронный код выполнен',
    executionCompleted: 'Выполнение завершено',
    maxIterationsWarning: 'Предупреждение о максимальных итерациях',
    clickRunFirst: 'Сначала нажмите запуск',
    noTasks: 'Нет задач',
    processedMicrotask: 'Обработана микрозадача',
    processedMacrotask: 'Обработана макрозадача',
    scheduled: 'Запланировано',
    processing: 'Обработка',
    addedToCallStack: 'Добавлено в стек вызовов',
    removedFromCallStack: 'Удалено из стека вызовов',
    consoleLog: 'Лог консоли',
    errorPrefix: 'Префикс ошибки',
};