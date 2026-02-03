import {useEventLoopStore} from '../../store/eventLoopStore';
import CodeMirror from '@uiw/react-codemirror';
import {javascript} from '@codemirror/lang-javascript';
import {oneDark} from '@codemirror/theme-one-dark';
import {Controls} from "../Controls/Controls.tsx";
import styles from './styles.module.css'

export const Editor = () => {
    const {code, setCode} = useEventLoopStore();

    return (
        <div className={styles.editor}>
            <Controls/>
            <CodeMirror
                className={styles.input}
                value={code}
                extensions={[javascript({jsx: false}), oneDark]}
                onChange={(value) => setCode(value)}
                theme="dark"
            />
        </div>
    );
};