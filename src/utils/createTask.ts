import {generateUUID} from "./generateUUID";
import {STATUS_PENDING, STATUS_SUCCESS} from "./taskArrays";

export const createTask = (description:string, currentTaskType:string) => {
    const statusType = currentTaskType === STATUS_SUCCESS ? STATUS_SUCCESS : STATUS_PENDING;
    return {
        id: generateUUID(),
        taskDescription: description,
        status: statusType,
        date: new Date().toLocaleString('en-US',{hour12: false}).replace(',', ''),
    };
};
