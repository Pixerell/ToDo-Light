import React, {useCallback, useState} from 'react';
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

    const [pendingTasksActive, setPendingTasks] = useState(pendingTasks);

    const handleCreateTask = useCallback((newTask: TaskProps) => {
        setPendingTasks((prevPendingTasks) => [...prevPendingTasks, newTask]);
    }, []);

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
                    <p className="taskCount">{pendingTasksActive.length} left</p>
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
