import React, {useCallback, useState} from 'react';
import enterIco from '../assets/enterButton.svg'
import {createTask} from "../utils/createTask";
import {TaskProps} from "../utils/taskArrays";

interface InputHolderProps {
    onCreateTask: (newTask: TaskProps) => void;
}
const InputHolder: React.FC<InputHolderProps> = ({onCreateTask})  => {

    const [newTaskDescription, setNewTaskDescription] = useState<string>('');

    const handleInputField = useCallback(() => {
        const newTask = createTask(newTaskDescription);
        console.log('New Task:', newTask);
        onCreateTask(newTask)
        setNewTaskDescription('');
    }, [newTaskDescription]);

    console.log("Input holder is called")

    return (
        <div className="inputHolder">
            <input
                value={newTaskDescription}
                placeholder="write your task here"
                onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <img
                className="imgAnim"
                src={enterIco}
                alt="Enter Icon"
                onClick={handleInputField}
            />
        </div>
    );
};

export default React.memo(InputHolder);
