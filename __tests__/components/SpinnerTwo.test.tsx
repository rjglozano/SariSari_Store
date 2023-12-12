import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpinnerTwo from '@/components/SpinnerTwo';

describe('SpinnerTwo component', () => {
    it('should render properly', () => {
      render(<SpinnerTwo />);
  
      // Use screen queries to get elements and make assertions
      const spinners = screen.getAllByTestId('spinner');
  
      // Example assertions
      expect(spinners.length).toBe(3);
  
      spinners.forEach((spinner) => {
        const animatedCircle = spinner.querySelector('.animate-ping');
        const staticCircle = spinner.querySelector('.relative.inline-flex.rounded-full');
  
        expect(animatedCircle).toHaveStyle({
          backgroundColor: expect.stringMatching(/rgba\(255, 0, 0, 0.7\d+\)/),
        });
  
        expect(staticCircle).toHaveStyle({
          backgroundColor: expect.stringMatching(/rgb\(255, 200, 200\)/),
        });
      });
    });
  
    // Add more tests based on your specific requirements
  });