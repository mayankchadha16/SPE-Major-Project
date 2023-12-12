import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthContextProvider } from './AuthContext';

// Mock local storage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Helper function to render components with AuthContextProvider
const renderWithAuthContextProvider = (ui) => {
  return render(<AuthContextProvider>{ui}</AuthContextProvider>);
};

// Test cases
describe('AuthContext', () => {
  test('should render AuthContextProvider without crashing', () => {
    renderWithAuthContextProvider(<div>Test</div>);
  });
});
