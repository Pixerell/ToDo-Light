import React, {useCallback, useEffect, useRef, useState} from 'react';
import './App.scss';
import bgImg from './assets/absLines.png'
import TaskItem from "./components/task/task";
import {TaskProps, pendingTasks, STATUS_SUCCESS, STATUS_PENDING, STATUS_ALL} from "./utils/taskArrays";
import InputHolder from "./components/inputHolder";
import Sidebar from "./components/Sidebar";
import ClearCompletedButton from "./components/clearBlock";
import {updateThemeColors} from "./themeUtils";


function App() {

    const [currentTaskType, setCurrentTaskType] = useState<string>(STATUS_PENDING);
    const [tasks, setTasks] = useState<TaskProps[]>(pendingTasks);
    const [pendingTasksActive, setPendingTasksActive] = useState<TaskProps[]>(tasks.slice(0, 6));
    const [hasMoreTasks, setHasMoreTasks] = useState<boolean>(true);

    // Логика обсервера
    const lastTaskRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, {threshold: 0});

        if (lastTaskRef.current && pendingTasksActive.length < tasks.length) {
            observer.observe(lastTaskRef.current);
        } else {
            setHasMoreTasks(false);
        }

        return () => {
            observer.disconnect();
        };
    }, [pendingTasksActive, tasks]);

    const observerCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && hasMoreTasks) {
                loadMoreTasks();
            }
        });
    };


    // Создание таски
    const handleCreateTask = useCallback((newTask: TaskProps) => {
        setTasks(prevTasks => {
            return [...prevTasks, newTask];
        });
    }, [pendingTasksActive, tasks]);

    useEffect(() => {
        localStorage.setItem(currentTaskType, JSON.stringify(tasks));
        updateThemeColors(currentTaskType);
    }, [tasks, currentTaskType]);

    useEffect(() => {
        if (pendingTasksActive.length < tasks.length && !hasMoreTasks) {
            // Догрузка задач в конце листа
            loadMoreTasks();
        }

    }, [tasks]);

    // Пагинация
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

    // Показ на странице массива в зависимости от фильтра
    const handleFilterClick = useCallback((filterStatus: string) => {
        let filteredTasks: TaskProps[];

        if (filterStatus === STATUS_SUCCESS || filterStatus === STATUS_PENDING) {
            filteredTasks = getTasksFromLocalStorage(filterStatus);
        } else {
            const pendingData = getTasksFromLocalStorage(STATUS_PENDING);
            const successData = getTasksFromLocalStorage(STATUS_SUCCESS);
            filteredTasks = [...successData, ...pendingData];
        }

        updateTasks(filteredTasks)
        setCurrentTaskType(filterStatus);
        setHasMoreTasks(true);
    }, [getTasksFromLocalStorage]);

    // Смотритель изменений в типе таски
    useEffect(() => {
        const storedTasks = getTasksFromLocalStorage(currentTaskType);
        updateTasks(storedTasks)
    }, [currentTaskType, getTasksFromLocalStorage]);

    // Смена статусов.
    const handleUpdateStatus = (taskId: string) => {


        let completedTasks = getTasksFromLocalStorage(STATUS_SUCCESS);
        const pendingTasks = getTasksFromLocalStorage(STATUS_PENDING);
        const completedTask = tasks.find(task => task.id === taskId);

        let taskUpdate = (currentTaskType === STATUS_ALL && completedTask && completedTask.status !== STATUS_SUCCESS) ? tasks : tasks.filter(task => task.id !== taskId);

        if (completedTask) {
            if (completedTask.status === STATUS_SUCCESS) {
                const updatedPendingTasks = pendingTasksActive.filter(task => task.id !== taskId);
                completedTasks = completedTasks.filter((task: TaskProps) => task.id !== taskId);
                setPendingTasksActive(updatedPendingTasks);
            } else {
                completedTask.status = STATUS_SUCCESS;
                completedTask.date = new Date().toLocaleString('en-US', { hour12: false }).replace(',', '');
                completedTasks.push(completedTask);
                if (currentTaskType === STATUS_ALL) {
                    const updatedPendingAllTasks = pendingTasks.filter((task: TaskProps) => task.id !== taskId);
                    localStorage.setItem(STATUS_PENDING, JSON.stringify(updatedPendingAllTasks));
                }
            }

            localStorage.setItem(STATUS_SUCCESS, JSON.stringify(completedTasks));
        }

        updateTasks(taskUpdate)
        setHasMoreTasks(true)
    };

    // Просто зачистка массива Completed
    const handleClearCompleted = () => {
        localStorage.removeItem(STATUS_SUCCESS);
        if (currentTaskType !== STATUS_PENDING) {
            const pendingData = getTasksFromLocalStorage(STATUS_PENDING);
            updateTasks([...pendingData])
        }
        if (currentTaskType === STATUS_SUCCESS) {
            updateTasks([])
        }
    };

    const updateTasks = (tasks: TaskProps[]) => {
        setTasks(tasks);
        setPendingTasksActive(tasks.slice(0, 6));
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
                        {pendingTasksActive.map((task: TaskProps) => (
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
            <ClearCompletedButton onClick={handleClearCompleted}/>
        </div>
    );
}

export default App;
