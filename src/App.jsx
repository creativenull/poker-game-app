import React, { useState, useContext } from 'react'

import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import Dealer from '#components/Dealer'
import GameActions from '#components/GameActions'
import Player from '#components/Player'
import Poker from '#lib/Poker'
// import { handOptions } from '#config/gameState'

import ErrorStore from '#store/error'
import { Actions } from '#store/error/types'

/**
 * Main Component
 */
function App () {
  const error = useContext(ErrorStore)

  // Player states
  const poker = new Poker()
  const [dealer] = useState({
    id: 'dealer',
    hand: poker.getCards(5, { onClick: replaceCard })
  })
  const [player, setPlayer] = useState({
    id: 'player',
    hand: poker.getCards(5, { onClick: replaceCard })
  })

  /**
   * Handle Error when closing
   */
  function handleErrorClose (_, reason) {
    if (reason !== 'clickaway') {
      error.dispatch({ type: Actions.HIDE_ERROR })
    }
  }

  function replaceCard (card) {
    // Create a copy of player cards
    // Find the card index needed to replace
    // remove that element and add the card from poker class
    // Add new card set into player cards
    //
    const newPlayerHand = JSON.parse(JSON.stringify(player.hand))
    const index = newPlayerHand.findIndex((pCard) => pCard.value === card.value && pCard.suit.value === card.suit.value)
    const [newCard] = poker.getCards(1, { onClick: null })
    newPlayerHand.splice(index, 1, newCard)
    setPlayer({
      id: 'player',
      hand: newPlayerHand
    })
  }

  return (
    <>
      <Snackbar open={error.state.open} onClose={handleErrorClose} autoHideDuration={6000}>
        <Alert onClose={handleErrorClose} variant="filled" severity="error">
          {error.state.message}
        </Alert>
      </Snackbar>

      <Box display="flex" justifyContent="center">
        <Box flex="3" display="flex" justifyContent="center">
          <Box>
            <Dealer dealer={dealer} />
            <Player player={player} onClick={replaceCard} />
          </Box>
        </Box>
        <Box flex="1">
          <GameActions />
        </Box>
      </Box>
    </>
  )
}

export default App
