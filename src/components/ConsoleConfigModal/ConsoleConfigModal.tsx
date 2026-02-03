import type {FC} from 'react';
import type {CustomModalProps} from "../UI/Modal/Modal.tsx";
import {Modal} from "../UI/Modal/Modal.tsx";
import {Checkbox} from "../UI/Checkbox/Checkbox.tsx";
import {useConsoleConfigStore} from "../../store/consoleConfigStore.ts";
import type {HistoryMessageType} from "../../types/consoleConfig.ts";
import {consoleLabels} from "../../constants/consoleLabels.ts";
import {Button} from "../UI/Button/Button.tsx";
import styles from './styles.module.css'

interface ConsoleConfigModalProps extends CustomModalProps {

}

export const ConsoleConfigModal: FC<ConsoleConfigModalProps> = ({isOpen, onClose}) => {
    const state = useConsoleConfigStore();

    const handleChange = (key: HistoryMessageType) => (checked: boolean) => {
        state.setConfig(key, checked);
    };

    const handleResetAll = () => {
        state.resetAll();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Настройки консоли">
            {(Object.keys(state) as Array<keyof typeof state>).filter(key =>
                typeof state[key] === 'boolean' && key !== 'setConfig' && key !== 'resetAll' && key !== 'setAll' && key !== 'shouldShow'
            ).map((key) => (
                <div key={key} className={styles.item}>
                    <Checkbox
                        label={consoleLabels[key as HistoryMessageType] || key}
                        checked={state[key] as boolean}
                        onChange={handleChange(key as HistoryMessageType)}
                    />
                </div>
            ))}

            <Button className={styles.button} onClick={handleResetAll}>Сбросить</Button>
        </Modal>
    );
};