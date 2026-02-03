import styles from './styles.module.css';
import {CallStack} from "../Visualization/CallStack.tsx";
import {Macrotasks} from "../Visualization/Macrotasks.tsx";
import {Microtasks} from "../Visualization/Microtasks.tsx";

export const EventLoop = () => {
    return (
        <div className={styles.eventloop}>
            <CallStack/>
            <Microtasks/>
            <Macrotasks/>
        </div>
    );
};