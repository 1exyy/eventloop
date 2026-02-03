import styles from './styles.module.css';
import type {FC} from 'react';
import {Button} from "../UI/Button/Button.tsx";
import {useEventLoopStore} from "../../store/eventLoopStore.ts";
import {MdPlayArrow, MdRefresh, MdStop} from "react-icons/md";
import {useCallback, useState} from "react";
import {FaGear} from "react-icons/fa6";
import {ConfigModal} from "../ConfigModal/ConfigModal.tsx";

export const Controls: FC = () => {
    const [isOpenConfigModal, setIsOpenConfigModal] = useState<boolean>(false);
    const {
        isRunning,
        run,
        stop,
        reset,
    } = useEventLoopStore();

    const openModalConfigModalHandler = () => setIsOpenConfigModal(true);

    const executeHandler = useCallback(() => {
        if (isRunning) stop();
        else run();
    }, [isRunning, stop, run]);

    return (
        <div className={styles.controls}>
            <Button variant={!isRunning ? 'run' : 'reset'} onClick={executeHandler}>
                {!isRunning
                    ? <><MdPlayArrow aria-hidden={true} size={24}/><span>Run</span></>
                    : <><MdStop/><span>Stop</span></>
                }
            </Button>
            <Button variant="reset" disabled={isRunning} onClick={reset}>
                <MdRefresh aria-hidden={true} size={24}/><span>Reset</span>
            </Button>
            <Button onClick={openModalConfigModalHandler} className={styles.config}>
                <FaGear size={24}/>
            </Button>
            <ConfigModal isOpen={isOpenConfigModal} onClose={() => setIsOpenConfigModal(false)}/>
        </div>
    );
};