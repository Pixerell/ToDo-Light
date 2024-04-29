import React from 'react';
import allIco from '../assets/all.svg';
import pendingIco from '../assets/uncomp.svg';
import completedIco from '../assets/like.svg';
import {STATUS_ALL, STATUS_PENDING, STATUS_SUCCESS} from "../utils/taskArrays";

function Sidebar({ handleFilterClick }: { handleFilterClick: (filterStatus: string) => void }) {
    return (
        <div className="sidebar">
            <img className="imgAnim" src={completedIco} alt="Completed Icon" onClick={() => handleFilterClick(STATUS_SUCCESS)} />
            <img className="imgAnim" src={pendingIco} alt="Pending Icon" onClick={() => handleFilterClick(STATUS_PENDING)} />
            <img className="imgAnim" src={allIco} alt="All Icon" onClick={() => handleFilterClick(STATUS_ALL)} />
        </div>
    );
}

export default Sidebar;
