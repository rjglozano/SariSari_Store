import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '@/components/SearchBar';

describe('SearchBar component', () => {
  it('should render properly', () => {
    render(<SearchBar />);

    const searchInput = screen.getByPlaceholderText('Search something...') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
  });

  it('should update query state on input change', () => {
    render(<SearchBar />);

    const searchInput = screen.getByPlaceholderText('Search something...') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'test query' } });

    expect(searchInput.value).toBe('test query');
  });

});
