import type {HistoryMessageType} from "../types/consoleConfig.ts";
import {
    FaPlay,
    FaSyncAlt,
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaList,
    FaMicrochip,
    FaTasks,
    FaClock,
    FaCog,
    FaStackOverflow,
    FaTrash,
    FaTerminal,
    FaTimesCircle
} from 'react-icons/fa';
export const getIconForType = (type: HistoryMessageType) => {
    switch (type) {
        case 'startExecution':
            return <FaPlay size={14} />;
        case 'syncCodeExecuted':
            return <FaSyncAlt size={14} />;
        case 'executionCompleted':
            return <FaCheckCircle size={14} />;
        case 'maxIterationsWarning':
            return <FaExclamationTriangle size={14} />;
        case 'clickRunFirst':
            return <FaInfoCircle size={14} />;
        case 'noTasks':
            return <FaList size={14} />;
        case 'processedMicrotask':
            return <FaMicrochip size={14} />;
        case 'processedMacrotask':
            return <FaTasks size={14} />;
        case 'scheduled':
            return <FaClock size={14} />;
        case 'processing':
            return <FaCog size={14} />;
        case 'addedToCallStack':
            return <FaStackOverflow size={14} />;
        case 'removedFromCallStack':
            return <FaTrash size={14} />;
        case 'consoleLog':
            return <FaTerminal size={14} />;
        case 'errorPrefix':
            return <FaTimesCircle size={14} />;
        default:
            return <FaInfoCircle size={14} />;
    }
};