import React from 'react'
import  './task.css'
import '../../App.scss'
import circle from '../../assets/circle.svg'
import like from '../../assets/like.svg'
import logo from '../../assets/appIco.svg'
import {TaskProps} from "../../utils/taskArrays";


function TaskItem({ taskDescription, date, status, id }: TaskProps) {
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
    console.log("Task Comp is called")

    return (
        <div id={id} className="taskItem" style={{ color: textColor }}>
            <img className="imgAnim" src={iconSrc} alt={`${status} Icon`}/>
            <p className="taskDesc" >  {taskDescription}</p>
            <p className="taskDate">{date}</p>
        </div>
    )
}

export default React.memo(TaskItem);