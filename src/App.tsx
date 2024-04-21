import React from 'react';
import './App.scss';
import bgImg from './assets/absLines.png'
import allIco from './assets/all.svg'
import pendingIco from './assets/uncomp.svg'
import completedIco from './assets/like.svg'
import enterIco from './assets/enterButton.svg'
import appIco from './assets/appIco.svg'
import TaskItem from "./components/task/task";
import {tasks} from "./utils/tasks";

function App() {
  return (
    <div className="App">
            <img alt="abstract lines background" className="bgImg" src={bgImg}/>
            <h1>todos </h1>
            <div className="wrapper">
                <div className="sidebar">
                    <img className="imgAnim" src={completedIco} alt="Completed Icon" />
                    <img className="imgAnim" src={pendingIco} alt="Pending Icon" />
                    <img className="imgAnim" src={allIco} alt="All Icon"/>
                </div>
                <div className="main">
                    <p className="taskCount">{tasks.length} left</p>
                    <div className="taskHolder">
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                taskDescription={task.taskDescription}
                                date={task.date}
                                status={task.status}
                            />
                        ))}
                    </div>
                    <div className="inputHolder">
                        <input  placeholder="write your task here"/>
                        <img className="imgAnim" src={enterIco} alt="Enter Icon"/>
                    </div>
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
