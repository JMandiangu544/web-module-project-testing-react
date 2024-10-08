import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import server from '../../../backend/mock-server';
import App from '../App';

describe('Stranger Things App', () => {
  let user;

  afterEach(() => { 
    server.resetHandlers(); 
  });

  beforeAll(() => { 
    server.listen(); 
  });

  afterAll(() => { 
    server.close(); 
  });

  beforeEach(() => {
    render(<App />);
    user = userEvent.setup();
  });

  test('App mounts without crashing', () => {
    // Print the simulated DOM
    screen.debug();
  });

  test('App renders the correct texts', async () => {
    // Click on the button that displays "Press to Get Show Data"
    const button = screen.getByText('Press to Get Show Data');
    await user.click(button);

    // Wait for following texts to be in the DOM
    await waitFor(() => {
      expect(screen.queryByText('Press to Get Show Data')).not.toBeInTheDocument();
      expect(screen.getByText('Stranger Things')).toBeInTheDocument();
      expect(screen.getByText("A love letter to the '80s classics that captivated a generation", { exact: false })).toBeInTheDocument();
      expect(screen.getByText('Select A Season')).toBeInTheDocument();
    });

    // Select Season 2 from the dropdown
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'Season 2');

    // Create the following assertions
    expect(screen.getByText('Season 2, Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Chapter One: MADMAX')).toBeInTheDocument();
    expect(screen.getByText("One year after the events with the Upside Down and the Demogorgon", { exact: false })).toBeInTheDocument();
  });
});