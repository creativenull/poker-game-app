import React from 'react'
import { render, screen } from '#app/utils/test-utils'

import AppSnackbar from '../AppSnackbar'

describe('AppSnackbar component', () => {
  const props = {
    open: false,
    closeSnackbar: jest.fn()
  }

  it('Should render the <AppSnackbar /> component', () => {
    render(<AppSnackbar />, { props })
    expect(screen.getByTestId('app-snackbar')).toBeTruthy()
  })
})
