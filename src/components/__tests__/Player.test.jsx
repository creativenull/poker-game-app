import React from 'react'
import { render, screen } from '#app/utils/test-utils'

import Deck from '@creativenull/deckjs'
import Player from '../Player'
import { GameState } from '#app/constant-types'

describe('Player component', () => {
  const deck = new Deck()
  const initialState = {
    game: {
      gameState: GameState.INIT,
      player: {
        id: 'player',
        hand: deck.getCards(5)
      },
      clickOnceList: [],
      gameReplaceCardAction: jest.fn()
    }
  }

  it('Should render the <Player /> component', () => {
    render(<Player />, { initialState })
    expect(screen.queryByTestId('player-hand')).toBeTruthy()
  })

  it('Should get the correct title', () => {
    render(<Player />, { initialState })
    expect(screen.getByText(/Player/)).toBeTruthy()
  })
})
