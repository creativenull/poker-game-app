import React from 'react'
import PropTypes from 'prop-types'
import PlayingCard from './PlayingCard'

const PlayingCards = ({ cards }) => (
  <>
    {cards.map((card, i) => (
      <PlayingCard key={i} name={card.name} color={card.color} utf={card.utf} />
    ))}
  </>
)

PlayingCards.propTypes = {
  cards: PropTypes.array
}

export default PlayingCards
