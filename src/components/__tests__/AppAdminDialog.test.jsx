import React from 'react'
import { render, screen } from '#app/utils/test-utils'

import AppAdminDialog from '../AppAdminDialog'
import { defaultSettings } from '#config/settings'

describe('AppAdminDialog component', () => {
  const props = {
    adminDialogIsOpen: true,
    hideAdminDialog: jest.fn(),
    settings: defaultSettings,
    updateSettings: jest.fn(),
    openSnackbar: jest.fn()
  }

  it('Should render the <AppAdminDialog /> component', () => {
    render(<AppAdminDialog />, { props })
    expect(screen.getByTestId('admin-dialog')).toBeTruthy()
  })
})
