import {generateUUID} from "./generateUUID";
import {STATUS_PENDING, STATUS_SUCCESS} from "./taskArrays";
import {createTask} from "./createTask";
import {act} from "@testing-library/react";
import {useCallback} from "react";
import {renderHook} from "@testing-library/react";

test('Уникальные I', () => {
    const NUM_IDS = 1000;
    const generatedIds = new Set<string>();
    for (let i = 0; i < NUM_IDS; i++) {
        const id = generateUUID();
        generatedIds.add(id);
    }
    expect(generatedIds.size).toBe(NUM_IDS);
});


describe('Создание таски', () => {
    test('STATUS_PENDING', () => {
        const description = 'Example task description';
        const task = createTask(description, STATUS_PENDING);

        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('taskDescription', description);
        expect(task).toHaveProperty('status', STATUS_PENDING);
        expect(task).toHaveProperty('date');
    });

    test('STATUS_SUCCESS', () => {
        const description = 'Example task description';
        const task = createTask(description, STATUS_SUCCESS);

        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('taskDescription', description);
        expect(task).toHaveProperty('status', STATUS_SUCCESS);
        expect(task).toHaveProperty('date');
    });
});


describe('handleInputField', () => {
    it('Создает таску если поле не пустое', () => {
        const newTaskDescription = 'New task description';
        const currentTaskType = 'Some task type';
        const onCreateTask = jest.fn();
        const setNewTaskDescription = jest.fn();
        const createTask = jest.fn().mockReturnValue({});
        const dependencies = [newTaskDescription, currentTaskType, onCreateTask, setNewTaskDescription, createTask];

        const { result } = renderHook(() => useCallback(() => {
            if (newTaskDescription.length <= 0) {
                console.log("Fill out the tasks please")
                return;
            }
            const newTask = createTask(newTaskDescription, currentTaskType);
            onCreateTask(newTask);
            setNewTaskDescription('');
        }, dependencies));

        act(() => {
            result.current();
        });

        expect(createTask).toHaveBeenCalledWith(newTaskDescription, currentTaskType);
        expect(onCreateTask).toHaveBeenCalledWith({});
        expect(setNewTaskDescription).toHaveBeenCalledWith('');
    });

    it('Пустое поле, создавать не будем', () => {
        const newTaskDescription = '';
        const currentTaskType = 'Some task type';
        const onCreateTask = jest.fn();
        const setNewTaskDescription = jest.fn();
        const createTask = jest.fn().mockReturnValue({});
        const dependencies = [newTaskDescription, currentTaskType, onCreateTask, setNewTaskDescription, createTask];

        const { result } = renderHook(() => useCallback(() => {
            if (newTaskDescription.length <= 0) {
                console.log("Fill out the tasks please")
                return;
            }
            const newTask = createTask(newTaskDescription, currentTaskType);
            onCreateTask(newTask);
            setNewTaskDescription('');
        }, dependencies));

        act(() => {
            result.current();
        });

        expect(createTask).not.toHaveBeenCalled();
        expect(onCreateTask).not.toHaveBeenCalled();
        expect(setNewTaskDescription).not.toHaveBeenCalled();
    });
});