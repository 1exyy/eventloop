import styles from './styles.module.css';
import type {FC} from 'react';
import {type CustomModalProps, Modal} from "../UI/Modal/Modal.tsx";
import {Input} from "../UI/Input/Input.tsx";
import {useConfigStore} from "../../store/configStore.ts";
import {Button} from "../UI/Button/Button.tsx";

interface ConfigModalProps extends CustomModalProps {

}

export const ConfigModal: FC<ConfigModalProps> = ({onClose, isOpen}) => {
    const {
        completionTimeMs,
        setCompletionTimeMs,
        syncCodeExecutionTimeMs,
        setSyncCodeExecutionTimeMs,
        maxIterations,
        setMaxIterations,
        stepDelayMs,
        setStepDelayMs,
        reset
    } = useConfigStore();

    const handleReset = () => {
        reset();
    };

    return (
        <Modal title="Настройки" isOpen={isOpen} onClose={onClose}>
            <div className={styles.inputGroup}>
                <Input
                    label="Время выполнения задачи (мс)"
                    value={completionTimeMs}
                    onChange={(e) => setCompletionTimeMs(Number(e.target.value))}
                    type="number"
                />
            </div>
            <div className={styles.inputGroup}>
                <Input
                    label="Время выполнения синхронного кода (мс)"
                    value={syncCodeExecutionTimeMs}
                    onChange={(e) => setSyncCodeExecutionTimeMs(Number(e.target.value))}
                    type="number"
                />
            </div>
            <div className={styles.inputGroup}>
                <Input
                    label="Максимальное количество итераций"
                    value={maxIterations}
                    onChange={(e) => setMaxIterations(Number(e.target.value))}
                    type="number"
                />
            </div>
            <div className={styles.inputGroup}>
                <Input
                    label="Задержка между шагами (мс)"
                    value={stepDelayMs}
                    onChange={(e) => setStepDelayMs(Number(e.target.value))}
                    type="number"
                />
            </div>
            <Button variant="step" onClick={handleReset} className={styles.resetButton}>
                Сбросить настройки
            </Button>
        </Modal>
    );
};