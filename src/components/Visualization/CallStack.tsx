import {Wrapper} from "../UI/Wrapper/Wrapper.tsx";
import {useEventLoopStore} from "../../store/eventLoopStore.ts";
import {CallItem} from "./CallItem/CallItem.tsx";
import {v4 as uuid} from 'uuid'
const description = 'Структура данных LIFO (Last In — First Out), которая отслеживает текущее состояние выполнения программы. Каждый вызов функции помещается в стек, а после завершения — удаляется.'
export const CallStack = () => {
    const {callStack} = useEventLoopStore();

    return (
        <Wrapper title="CallStack" description={description}>
            {callStack.map((task) => <CallItem key={uuid()} name={task} variant="callstack"/>)}
        </Wrapper>
    );
};

