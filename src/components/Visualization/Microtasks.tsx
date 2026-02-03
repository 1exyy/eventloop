import {Wrapper} from "../UI/Wrapper/Wrapper.tsx";
import {useEventLoopStore} from "../../store/eventLoopStore.ts";
import {CallItem} from "./CallItem/CallItem.tsx";

const description  = "«Мелкие» задачи с высоким приоритетом, выполняемые сразу после завершения текущего стека вызовов, но до следующей макрозадачи.\n\n" +
    "Promise.resolve().then(() => console.log('microtask 1'));\n" +
    "Promise.resolve().then(() => console.log('microtask 2'));\n" +
    "\n" +
    "queueMicrotask(() => console.log('queueMicrotask'));\n"
export const Microtasks = () => {
    const {microtasks} = useEventLoopStore();
    return (
        <Wrapper title="Microtasks" description={description}>
            {microtasks.map((task, index) => <CallItem name={task.name} key={index}
                                                       variant="microtask"/>)}
        </Wrapper>
    );
};



