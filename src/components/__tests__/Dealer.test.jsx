import React from 'react'
import { render, screen } from '#app/utils/test-utils'

import Deck from 'deckjs'
import Dealer from '../Dealer'

describe('Dealer component', () => {
  const deck = new Deck()
  const initialState = {
    game: {
      dealer: {
        id: 'dealer',
        hand: deck.getCards(5)
      },
      hideDealer: true
    }
  }

  it('Should render the <Dealer /> component', () => {
    render(<Dealer />, { initialState })
    expect(screen.getByTestId('dealer-hand')).toBeTruthy()
  })

  it('Should get the correct title', () => {
    render(<Dealer />, { initialState })
    expect(screen.getByText(/Dealer/)).toBeTruthy()
  })
})
