import React from 'react'
import { render, screen } from '@testing-library/react'
import Deck from 'deckjs'

import PlayingCard from '../PlayingCard'

describe('PlayingCard component', () => {
  const deck = new Deck()
  const [card] = deck.getCards(1)
  const mockProps = {
    card,
    noHover: true,
    hidden: false,
    onClick: jest.fn()
  }

  it('Should render the <PlayingCard /> component', () => {
    render(<PlayingCard {...mockProps} />)
    expect(screen.queryByTestId('playing-card')).toBeTruthy()
  })
})
