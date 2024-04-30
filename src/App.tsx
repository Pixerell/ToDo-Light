import React, {useCallback, useEffect, useRef, useState} from 'react';
import './App.scss';
import bgImg from './assets/absLines.png'
import appIco from './assets/appIco.svg'
import TaskItem from "./components/task/task";
import {TaskProps, pendingTasks, STATUS_SUCCESS, STATUS_PENDING} from "./utils/taskArrays";
import InputHolder from "./components/inputHolder";
import Sidebar from "./components/Sidebar";

function App() {

    const [currentTaskType, setCurrentTaskType] = useState<string>(STATUS_PENDING);

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

        if (lastTaskRef.current && pendingTasksActive.length < tasks.length) {
            observer.observe(lastTaskRef.current);
        } else {
            setHasMoreTasks(false);
        }

        return () => {
            observer.disconnect();
        };
    }, [pendingTasksActive, tasks]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem(currentTaskType) || '[]');
        setTasks(storedTasks);
        setPendingTasksActive(storedTasks.slice(0, 6));
    }, [currentTaskType]);


    const handleCreateTask = useCallback((newTask: TaskProps) => {
        setTasks(prevTasks => {
            return [...prevTasks, newTask];
        });

    }, [pendingTasksActive, tasks]);

    useEffect(() => {
        localStorage.setItem(currentTaskType, JSON.stringify(tasks));
    }, [tasks, currentTaskType]);

    useEffect(() => {
        if (pendingTasksActive.length < tasks.length && !hasMoreTasks) {
            // Догрузка задач в конце листа
            loadMoreTasks();
        }

    }, [tasks]);

    const loadMoreTasks = () => {
        const startIndex = pendingTasksActive.length;
        const endIndex = startIndex + 6;

        const newTasks = tasks.slice(startIndex, endIndex)
        setPendingTasksActive(prevTasks => [...prevTasks, ...newTasks]);
    };

    const getTasksFromLocalStorage = useCallback(
        (status: string) => {
            const storedData = localStorage.getItem(status);
            return storedData ? JSON.parse(storedData) : [];
        },
        []
    );


    const handleFilterClick = useCallback((filterStatus: string) => {
        let filteredTasks: TaskProps[];

        if (filterStatus === STATUS_SUCCESS || filterStatus === STATUS_PENDING) {
            filteredTasks = getTasksFromLocalStorage(filterStatus);
        } else {
            const pendingData = getTasksFromLocalStorage(STATUS_PENDING);
            const successData = getTasksFromLocalStorage(STATUS_SUCCESS);
            filteredTasks = [...successData, ...pendingData];
        }

        setTasks(filteredTasks);
        setPendingTasksActive(filteredTasks.slice(0, 6));
        setCurrentTaskType(filterStatus);
        setHasMoreTasks(true);
    }, [getTasksFromLocalStorage]);

    useEffect(() => {
        const storedTasks = getTasksFromLocalStorage(currentTaskType);
        setTasks(storedTasks);
        setPendingTasksActive(storedTasks.slice(0, 6));
    }, [currentTaskType, getTasksFromLocalStorage]);


    const handleUpdateStatus = (taskId: string) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                console.log("inside if")
                return { ...task, status: STATUS_SUCCESS };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
    <div className="App">
            <img alt="abstract lines background" className="bgImg" src={bgImg}/>
            <h1>todos</h1>
            <div className="wrapper">
                <Sidebar handleFilterClick={handleFilterClick}/>
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
                                onUpdateStatus={handleUpdateStatus}
                             />
                        ))}
                        <div className="intersecter" ref={lastTaskRef}></div>
                    </div>

                    <InputHolder onCreateTask={handleCreateTask} currentTaskType={currentTaskType}/>
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
