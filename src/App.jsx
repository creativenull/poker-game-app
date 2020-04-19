import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { hideToast } from '#store/toast/actions'

import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import Dealer from '#components/Dealer'
import GameActions from '#components/GameActions'
import Player from '#components/Player'
import Poker from '#lib/Poker'

/**
 * Main Component
 */
function App ({ toast, hideToast, game }) {
  // Initial states
  const poker = new Poker()
  const [dealer] = useState({
    id: 'dealer',
    hand: poker.getPlayerHand()
  })
  const [player, setPlayer] = useState({
    id: 'player',
    hand: poker.getPlayerHand()
  })

  // Use to record the card being clicked
  const [playerClickOnceList, setPlayerClickOnceList] = useState([])

  function onErrorClose (_, reason) {
    if (reason !== 'clickaway') {
      hideToast()
    }
  }

  // replace the card, but only once
  function onClickReplaceCard (card) {
    if (playerClickOnceList.includes(card.id)) {
      return null
    }

    // Change the card, and set the list so we dont change it again
    const [hand, newCard] = poker.replace(card, player.hand)
    setPlayer({
      ...player,
      hand
    })
    setPlayerClickOnceList([...playerClickOnceList, newCard.id])
  }

  return (
    <>
      <Snackbar open={toast.open} onClose={onErrorClose} autoHideDuration={6000}>
        <Alert onClose={onErrorClose} variant="filled" severity="error">
          {toast.message}
        </Alert>
      </Snackbar>

      <Box display="flex" justifyContent="center">
        <Box flex="3" display="flex" justifyContent="center">
          <Box>
            <Dealer dealer={dealer} />
            <Player player={player} clickOnceList={playerClickOnceList} onClick={onClickReplaceCard} />
          </Box>
        </Box>
        <Box flex="1">
          <GameActions />
        </Box>
      </Box>
    </>
  )
}

App.propTypes = {
  toast: PropTypes.object,
  hideToast: PropTypes.func,
  game: PropTypes.object
}

function mapStateToProps (state) {
  return {
    toast: state.toast,
    gameState: state.game.gameState
  }
}

const mapDispatchToProps = {
  hideToast
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
