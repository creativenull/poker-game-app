import React, { useEffect, useState } from 'react'

import Box from '@material-ui/core/Box'

import Dealer from './components/Dealer'
import GameActions from './components/GameActions'
import Player from './components/Player'
import Deck from './lib/Deck'

// Main
const App = () => {
  const deck = new Deck()

  const [dealerCards] = useState(deck.getCards(5))
  const [playerCards] = useState(deck.getCards(5))

  const [betCredits, setBetCredits] = useState(0)
  const [totalCredits, setTotalCredits] = useState(100)
  const unit = 5

  useEffect(() => {
    document.title = 'Poker Game'
  }, [])

  return (
    <Box display="flex" justifyContent="center">
      <Box flex="3" display="flex" justifyContent="center">
        <Box>
          <Dealer cards={dealerCards} />
          <Player cards={playerCards} />
        </Box>
      </Box>
      <Box flex="1">
        <GameActions credits={{ betCredits, totalCredits, unit }} actions={{ setBetCredits, setTotalCredits }} />
      </Box>
    </Box>
  )
}

export default App
