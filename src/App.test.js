import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
});