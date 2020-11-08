import React from 'react'
import { render, screen } from '#app/utils/test-utils'

import GameActions from '../GameActions'
import { GameState } from '#app/constant-types'

describe('GameActions component', () => {
  const props = {
    gameState: GameState.INIT,
    betCredits: 0,
    updateGameState: jest.fn(),
    showDialog: jest.fn()
  }

  it('Should render the <GameActions /> component', () => {
    render(<GameActions />, { props })
    expect(screen.getByTestId('game-actions')).toBeTruthy()
  })
})
