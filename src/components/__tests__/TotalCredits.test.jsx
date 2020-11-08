import React from 'react'
import { render, screen } from '#app/utils/test-utils'

import TotalCredits from '../TotalCredits'

describe('TotalCredits component', () => {
  const props = {
    totalCredits: 100
  }

  it('Should render the <TotalCredits /> component', () => {
    render(<TotalCredits />, { props })
    expect(screen.getByTestId('total-credits')).toBeTruthy()
  })
})
