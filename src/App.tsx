import {Editor} from "./components/Editor/Editor.tsx";
import './App.css';
import {EventLoop} from "./components/EventLoop/EventLoop.tsx";
import {Timeline} from "./components/Visualization/Timeline/Timeline.tsx";


function App() {
    return (
        <div className="app_container">
            <Editor/>
            <EventLoop/>
            <Timeline/>
        </div>
    )
}

export default App;
