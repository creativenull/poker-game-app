import React from 'react'
import { render, screen } from '#app/utils/test-utils'

import AppDialog from '../AppDialog'

describe('AppDialog component', () => {
  const props = {
    dialog: {},
    hideDialog: jest.fn()
  }

  it('Should render the <AppDialog /> component', () => {
    render(<AppDialog />, { props })
    expect(screen.getByTestId('app-dialog')).toBeTruthy()
  })
})
