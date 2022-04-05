// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'

test('sanity', () => {
  expect(true).toBe(true)
})
test('Spinner component renders correctly', () => {
  render(<Spinner on={true} />)

  const loadingMessage = screen.queryByText('Please', { exact: false })

  expect(loadingMessage).toBeInTheDocument()
  expect(loadingMessage).toBeVisible()
})