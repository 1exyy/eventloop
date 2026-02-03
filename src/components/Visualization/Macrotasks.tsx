import {Wrapper} from "../UI/Wrapper/Wrapper.tsx";
import {useEventLoopStore} from "../../store/eventLoopStore.ts";
import {CallItem} from "./CallItem/CallItem.tsx";
import {v4 as uuid} from 'uuid'
const description = "«Крупные» асинхронные задачи, каждая из которых выполняется в отдельной итерации цикла событий.\n\n" +
    "setTimeout(() => console.log('macrotask 1'), 0);\n" +
    "setInterval(() => console.log('interval'), 1000);\n" +
    "requestAnimationFrame(() => console.log('raf'));"
export const Macrotasks = () => {
    const {macrotasks} = useEventLoopStore();
    return (
        <Wrapper title="Macrotasks" description={description}>
            {macrotasks.map((task) => <CallItem key={uuid()} name={task.name}
                                                       variant="macrotask"/>)}
        </Wrapper>
    );
};

