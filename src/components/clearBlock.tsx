import React from 'react';
import appIco from '../assets/appIco.svg';

const ClearCompletedButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <div data-testid="clear-completed-button" className="cleanBlock" onClick={onClick}>
        <p className="imgAnim">Clear completed</p>
        <img className="imgAnim" src={appIco} alt="App Icon" />
    </div>
);

export default React.memo(ClearCompletedButton);