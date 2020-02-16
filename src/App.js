import React, { useEffect, useState } from 'react'

import Box from '@material-ui/core/Box'

import Dealer from './components/Dealer'
import GameActions from './components/GameActions'
import Player from './components/Player'

// Component
const App = () => {
  useEffect(() => {
    document.title = 'Poker Game'
  }, [])

  const [cards] = useState([
    {
      name: 'A',
      color: 'black',
      utf: '\u2663'
    },
    {
      name: '6',
      color: 'black',
      utf: '\u2660'
    },
    {
      name: '10',
      color: 'red',
      utf: '\u2666'
    },
    {
      name: 'K',
      color: 'red',
      utf: '\u2665'
    },
    {
      name: 'J',
      color: 'red',
      utf: '\u2665'
    }
  ])

  return (
    <Box display="flex" justifyContent="center">
      <Box flex="3" display="flex" justifyContent="center">
        <Box>
          <Dealer cards={cards} />
          <Player cards={cards} />
        </Box>
      </Box>
      <Box flex="1">
        <GameActions />
      </Box>
    </Box>
  )
}

export default App
