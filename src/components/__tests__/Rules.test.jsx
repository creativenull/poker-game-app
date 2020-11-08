import React from 'react'
import { render, screen } from '#app/utils/test-utils'

import Rules from '../Rules'

describe('Rules component', () => {
  const props = {
    prizes: {},
    replaceCardLimit: 5
  }

  it('Should render the <Rules /> component', () => {
    render(<Rules />, { props })
    expect(screen.getByTestId('rules')).toBeTruthy()
  })
})
