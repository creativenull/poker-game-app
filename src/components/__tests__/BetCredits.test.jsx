import React from 'react'
import { render, screen } from '#app/utils/test-utils'

import BetCredits from '../BetCredits'

describe('BetCredits component', () => {
  const props = {
    game: {},
    incrementBetCredits: jest.fn()
  }

  it('Should render the <BetCredits /> component', () => {
    render(<BetCredits />, { props })
    expect(screen.getByTestId('bet-credits')).toBeTruthy()
  })
})
