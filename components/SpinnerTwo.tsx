// SpinnerTwo.tsx
import React from 'react';

const SpinnerTwo = () => {
  return (
    <div className='h-screen flex items-center justify-center gap-6 bg-red-100'>
      <span data-testid="spinner" className="relative flex h-10 w-10">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-10 w-10 bg-red-200"></span>
      </span>
      <span data-testid="spinner" className="relative flex h-10 w-10">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-10 w-10 bg-red-200"></span>
      </span>
      <span data-testid="spinner" className="relative flex h-10 w-10">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-10 w-10 bg-red-200"></span>
      </span>
    </div>
  );
}

export default SpinnerTwo;
