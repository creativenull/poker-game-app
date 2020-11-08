import React from 'react'
import { render, screen } from '#app/utils/test-utils'

import AppMain from '../AppMain'

describe('AppMain component', () => {
  it('Should render the <AppMain /> component', () => {
    render(<AppMain />)
    expect(screen.getByTestId('app-main')).toBeTruthy()
  })
})
