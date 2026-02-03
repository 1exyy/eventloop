import {useEventLoopStore} from "../../../store/eventLoopStore.ts";
import {Wrapper} from "../../UI/Wrapper/Wrapper.tsx";
import styles from './styles.module.css'
import {v4 as uuid} from 'uuid'
import {ConsoleConfigModal} from "../../ConsoleConfigModal/ConsoleConfigModal.tsx";
import {type FC, useState} from "react";
import {Button} from "../../UI/Button/Button.tsx";
import {FaGear} from "react-icons/fa6";
import {clsx} from "clsx";
import type {HistoryMessageType} from "../../../types/consoleConfig.ts";
import {getIconForType} from "../../../utils/getIconForType.tsx";

export const Timeline = () => {
    const {executionHistory} = useEventLoopStore();
    const [isOpenConfigModal, setIsOpenConfigModal] = useState<boolean>(false);

    const openConfigModalHandler = () => setIsOpenConfigModal(true);

    return (<>
            <Wrapper title="Timeline" description="Сюда выводяться логи и таймлайны" className={styles.console}>
                <Button className={styles.options} onClick={openConfigModalHandler}><FaGear/></Button>
                {executionHistory.map((operation) => <TimelineItem key={uuid()} {...operation}/>)}
            </Wrapper>
            <ConsoleConfigModal isOpen={isOpenConfigModal} onClose={() => setIsOpenConfigModal(false)}/>
        </>

    );
};


interface TimelineItemProps {
    message: string;
    type: HistoryMessageType
}

const TimelineItem: FC<TimelineItemProps> = ({message, type}) => {
    const icon = getIconForType(type);

    return (
        <div className={clsx(styles.item, styles[type])}>
            <span className={styles.icon}>{icon}</span>
            <span className={styles.message}>{message}</span>
        </div>
    );
};
