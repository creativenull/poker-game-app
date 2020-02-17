import React from 'react'
import PropTypes from 'prop-types'
import PlayingCard from './PlayingCard'

// Component
const PlayingCards = ({ cards }) => (
  <>
    {cards.map((card, i) => (
      <PlayingCard key={i} playingCard={card} />
    ))}
  </>
)

// Prop Types
PlayingCards.propTypes = {
  cards: PropTypes.array
}

export default PlayingCards
