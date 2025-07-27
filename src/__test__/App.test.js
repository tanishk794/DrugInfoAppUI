// CompanyFilter.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompanyFilter from '../assets/Components/CompanyFilter.jsx'; // Adjust path as needed


global.fetch = jest.fn();

describe('CompanyFilter', () => {
  const mockProps = {
    selectedCompany: '',
    handleCompanyChange: jest.fn(),
    apiBaseUrl: 'http://localhost:3000'
  };

  beforeEach(() => {
    fetch.mockClear();
    mockProps.handleCompanyChange.mockClear();
  });

  test('fetches companies and handles company selection', async () => {
    
    const mockCompanies = ['', 'Pfizer', 'Johnson & Johnson', 'Merck'];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: mockCompanies
      })
    });

    render(<CompanyFilter {...mockProps} />);

    // Verify initial loading state
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Verify API was called correctly
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/companies',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Verify dropdown is enabled after loading
    const selectComponent = screen.getByTestId('company-filter');
    expect(selectComponent).not.toHaveAttribute('aria-disabled', 'true');

    // Open dropdown by clicking on the select component
    fireEvent.mouseDown(selectComponent.querySelector('[role="combobox"]'));
    
    // Wait for dropdown to open and find options in the document body
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Verify dropdown options are available
    expect(screen.getByText('All Companies')).toBeInTheDocument();
    expect(screen.getByText('Pfizer')).toBeInTheDocument();
    expect(screen.getByText('Johnson & Johnson')).toBeInTheDocument();
    expect(screen.getByText('Merck')).toBeInTheDocument();

    // Select a company and verify change handler is called
    fireEvent.click(screen.getByText('Pfizer'));
    expect(mockProps.handleCompanyChange).toHaveBeenCalledTimes(1);
  });
});