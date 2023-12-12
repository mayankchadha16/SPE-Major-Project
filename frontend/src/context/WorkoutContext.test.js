import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WorkoutsContextProvider, workoutsReducer } from './WorkoutContext';

// Helper function to render components with WorkoutsContextProvider
const renderWithWorkoutsContextProvider = (ui) => {
  return render(<WorkoutsContextProvider>{ui}</WorkoutsContextProvider>);
};

// Test cases
describe('WorkoutsContext', () => {
  test('should render WorkoutsContextProvider without crashing', () => {
    renderWithWorkoutsContextProvider(<div>Test</div>);
  });
});
