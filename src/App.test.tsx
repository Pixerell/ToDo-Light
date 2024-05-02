import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import {STATUS_PENDING, STATUS_SUCCESS, TaskProps} from "./utils/taskArrays";

class IntersectionObserverMock {
  constructor() {}
}

// Ignore для того чтобы Typescript принял Observer и его не пришлось бы полностью мокать
beforeAll(() => {
  // @ts-ignore
  window.IntersectionObserver = IntersectionObserverMock;
});
afterAll(() => {
  // @ts-ignore
  delete window.IntersectionObserver;
});

describe('App', () => {
  it('Рендер', () => {
    render(<App />);
  });
});


const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('handleClearCompleted', () => {
  it('Удаления STATUS_COMPLETED', () => {
    const currentTaskType = STATUS_SUCCESS;
    const getTasksFromLocalStorageMock = jest.fn(() => []);
    const updateTasksMock = jest.fn();

    const handleClearCompleted = () => {
      localStorage.removeItem('STATUS_SUCCESS');

      // @ts-ignore
      if (currentTaskType !== STATUS_PENDING) {
        const pendingData = getTasksFromLocalStorageMock();
        updateTasksMock([...pendingData]);
      }
      if (currentTaskType === STATUS_SUCCESS) {
        updateTasksMock([]);
      }
    };
    handleClearCompleted();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('STATUS_SUCCESS');
    // @ts-ignore
    if (currentTaskType !== STATUS_PENDING) {
      expect(getTasksFromLocalStorageMock).toHaveBeenCalled();
    } else {
      expect(getTasksFromLocalStorageMock).not.toHaveBeenCalled();
    }
    // @ts-ignore
    if (currentTaskType !== STATUS_PENDING) {
      expect(updateTasksMock).toHaveBeenCalledWith([]);
    } else {
      expect(updateTasksMock).toHaveBeenCalledWith([]);
    }
  });
});

describe('handleFilterClick function', () => {
  it('Фильтрация статусов', () => {
    // Mocking getTasksFromLocalStorage function
    const getTasksFromLocalStorageMock = jest.fn((status: string) => {
      if (status === STATUS_SUCCESS) {
        return [{ id: '1', status: STATUS_SUCCESS }, { id: '2', status: STATUS_SUCCESS }];
      } else if (status === STATUS_PENDING) {
        return [{ id: '3', status: STATUS_PENDING }, { id: '4', status: STATUS_PENDING }];
      } else {
        return [{ id: '1', status: STATUS_SUCCESS }, { id: '2', status: STATUS_SUCCESS },
          { id: '3', status: STATUS_PENDING }, { id: '4', status: STATUS_PENDING }];
      }
    });
    const updateTasksMock = jest.fn();
    const setCurrentTaskTypeMock = jest.fn();
    const setHasMoreTasksMock = jest.fn();
    const filterStatus: string = STATUS_SUCCESS;

    const handleFilterClick = (filterStatus: string) => {
      let filteredTasks: TaskProps[];

      if (filterStatus === STATUS_SUCCESS || filterStatus === STATUS_PENDING) {
        // @ts-ignore
        filteredTasks = getTasksFromLocalStorageMock(filterStatus);
      } else {
        const pendingData = getTasksFromLocalStorageMock(STATUS_PENDING);
        const successData = getTasksFromLocalStorageMock(STATUS_SUCCESS);
        // @ts-ignore
        filteredTasks = [...successData, ...pendingData];
      }

      updateTasksMock(filteredTasks)
      setCurrentTaskTypeMock(filterStatus);
      setHasMoreTasksMock(true);
    };

    handleFilterClick(filterStatus);

    expect(getTasksFromLocalStorageMock).toHaveBeenCalledWith(STATUS_SUCCESS);
    expect(updateTasksMock).toHaveBeenCalledWith([{ id: '1', status: STATUS_SUCCESS }, { id: '2', status: STATUS_SUCCESS }]);
    expect(setCurrentTaskTypeMock).toHaveBeenCalledWith(filterStatus);
    expect(setHasMoreTasksMock).toHaveBeenCalledWith(true);
  });
});

