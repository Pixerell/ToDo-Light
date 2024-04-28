import React, {useCallback, useEffect, useRef, useState} from 'react';
import './App.scss';
import bgImg from './assets/absLines.png'
import allIco from './assets/all.svg'
import pendingIco from './assets/uncomp.svg'
import completedIco from './assets/like.svg'
import appIco from './assets/appIco.svg'
import TaskItem from "./components/task/task";
import {TaskProps, pendingTasks} from "./utils/taskArrays";
import InputHolder from "./components/inputHolder";

function App() {
    console.log("App is called")
    const [tasks, setTasks] = useState<TaskProps[]>(pendingTasks);

    const [pendingTasksActive, setPendingTasksActive] = useState<TaskProps[]>(tasks.slice(0, 6));
    const [hasMoreTasks, setHasMoreTasks] = useState<boolean>(true);

    const lastTaskRef = useRef<HTMLDivElement>(null);

    const observerCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && hasMoreTasks) {
                loadMoreTasks();
            }
        });
    };

    const observerOptions: IntersectionObserverInit = {
        threshold: 0
    };

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        if (lastTaskRef.current) {
            observer.observe(lastTaskRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [pendingTasksActive]);

    const loadMoreTasks = () => {
        const startIndex = pendingTasksActive.length;
        const endIndex = startIndex + 6;
        const newTasks = tasks.slice(startIndex, endIndex);

        setPendingTasksActive(prevTasks => [...prevTasks, ...newTasks]);
        if (endIndex >= tasks.length) {
            setHasMoreTasks(false);
        }
    };

    const handleCreateTask = useCallback((newTask: TaskProps) => {
        try {
            setTasks(prevTasks => [...prevTasks, newTask]);
        } catch (error) {
            console.error("Error occurred while adding new task:", error);
        }
    }, [setTasks]);

    console.log(pendingTasksActive, "ACTIVE PENDING TASKS");
    console.log(tasks, "ALL TASKS");

    return (
    <div className="App">
            <img alt="abstract lines background" className="bgImg" src={bgImg}/>
            <h1>todos</h1>
            <div className="wrapper">
                <div className="sidebar">
                    <img className="imgAnim" src={completedIco} alt="Completed Icon" />
                    <img className="imgAnim" src={pendingIco} alt="Pending Icon" />
                    <img className="imgAnim" src={allIco} alt="All Icon"/>
                </div>
                <div className="main">
                    <p className="taskCount">{pendingTasksActive.length} left {tasks.length} all</p>
                    <div className="taskHolder">
                        {pendingTasksActive.map((task:TaskProps) => (
                            <TaskItem
                                key={task.id}
                                id={task.id}
                                taskDescription={task.taskDescription}
                                date={task.date}
                                status={task.status}
                             />

                        ))}
                        <div className="intersecter" ref={lastTaskRef}></div>
                    </div>

                    <InputHolder onCreateTask={handleCreateTask}/>
                </div>
            </div>
            <div className="cleanBlock">
                <p className="imgAnim">clear completed</p>
                <img className="imgAnim"  src={appIco} alt="App Icon"/>
            </div>
    </div>
  );
}

export default App;
