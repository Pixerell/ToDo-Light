import {STATUS_ALL, STATUS_PENDING, STATUS_SUCCESS} from "./utils/taskArrays";

export const updateThemeColors = (taskType: string) => {
    document.documentElement.style.setProperty('--mainApp-color', getMainAppColor(taskType));
    document.documentElement.style.setProperty('--inputField', getInputFieldColor(taskType));
};

const getInputFieldColor = (taskType: string) => {
    switch (taskType) {
        case STATUS_PENDING:
            return '#1B1303';
        case STATUS_ALL:
            return '#13031B';
        case STATUS_SUCCESS:
            return '#03161B';
        default:
            return '#1B1303';
    }
};

const getMainAppColor = (taskType: string) => {
    switch (taskType) {
        case STATUS_PENDING:
            return '#F5CE42';
        case STATUS_ALL:
            return '#ff60ff';
        case STATUS_SUCCESS:
            return '#07F5AF';
        default:
            return '#F5CE42';
    }
};

