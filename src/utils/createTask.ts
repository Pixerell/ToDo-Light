import {generateUUID} from "./generateUUID";

export const createTask = (description:string) => {
    return {
        id: generateUUID(),
        taskDescription: description,
        status: "Pending",
        date: new Date().toLocaleString(),
    };
};

