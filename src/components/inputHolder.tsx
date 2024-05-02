import React, {useCallback, useState} from 'react';
import enterIco from '../assets/enterButton.svg'
import {createTask} from "../utils/createTask";
import {TaskProps} from "../utils/taskArrays";

interface InputHolderProps {
    onCreateTask: (newTask: TaskProps) => void;
    currentTaskType: string;
}
const InputHolder: React.FC<InputHolderProps> = ({onCreateTask, currentTaskType })  => {

    const [newTaskDescription, setNewTaskDescription] = useState<string>('');

    const handleInputField = useCallback(() => {

        if (newTaskDescription.length <= 0) {
            console.log("Fill out the tasks please")
            return
        }
        const newTask = createTask(newTaskDescription, currentTaskType);
        onCreateTask(newTask)
        setNewTaskDescription('');
    }, [newTaskDescription]);


    return (
        <div className="inputHolder">
            <input
                value={newTaskDescription}
                placeholder="write your task here"
                onChange={(e) => setNewTaskDescription(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInputField()}
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
