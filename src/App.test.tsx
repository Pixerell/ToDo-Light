import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

class IntersectionObserverMock {
  constructor() {}

  observe() {
  }

  disconnect() {
  }
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

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});