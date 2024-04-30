import React from 'react'
import  './task.css'
import '../../App.scss'
import circle from '../../assets/circle.svg'
import like from '../../assets/like.svg'
import logo from '../../assets/appIco.svg'
import {TaskProps} from "../../utils/taskArrays";

interface TaskItemProps extends TaskProps {
    onUpdateStatus: (taskId: string) => void; // Define onUpdateStatus prop
}

function TaskItem({ taskDescription, date, status, id, onUpdateStatus }: TaskItemProps) {
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

    const handleClick = () => {
        onUpdateStatus(id);
    };
    return (
        <div id={id} className="taskItem" style={{ color: textColor }}>
            <img className="imgAnim" src={iconSrc} alt={`${status} Icon`} onClick={handleClick}/>
            <p className="taskDesc" >  {taskDescription}</p>
            <p className="taskDate">{date}</p>
        </div>
    )
}

export default React.memo(TaskItem);