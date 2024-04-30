import React from 'react'
import  './task.css'
import '../../App.scss'
import circle from '../../assets/circle.svg'
import like from '../../assets/like.svg'
import logo from '../../assets/appIco.svg'

interface TaskItemProps {
    taskDescription: string;
    date: string;
    status: string;
}

function TaskItem({ taskDescription, date, status }: TaskItemProps) {
    const getIcon = () => {
        switch (status) {
            case 'Pending':
                return circle;
            case 'Completed':
                return like;
            default:
                return logo;
        }
    };

    const iconSrc = getIcon();
    const textColor = status === 'Completed' ? 'var(--cyan-color)' : 'var(--yellow-color)';

    return (
        <div className="taskItem" style={{ color: textColor }}>
            <img className="imgAnim" src={iconSrc} alt={`${status} Icon`}/>
            <p className="taskDesc" >{taskDescription}</p>
            <p className="taskDate">{date}</p>
        </div>
    )
}

export default TaskItem;