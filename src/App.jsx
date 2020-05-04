import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { hideDialog } from '#store/dialog/actions'
import { updateDealerView, resetBetCredits } from '#store/game/actions'

import Box from '@material-ui/core/Box'
// import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/core/styles'

import Dealer from '#components/Dealer'
import GameActions from '#components/GameActions'
import Player from '#components/Player'
import Poker from '#lib/Poker'

import { GameState } from '#app/constant-types'

function App ({ dialog, hideDialog, gameState, hideDealer, updateDealerView, resetBetCredits }) {
  // Initial states
  const classes = useStyles()
  const [poker, setPoker] = useState(new Poker())
  const [dealer, setDealer] = useState({
    id: 'dealer',
    hand: poker.getPlayerHand()
  })
  const [player, setPlayer] = useState({
    id: 'player',
    hand: poker.getPlayerHand()
  })

  // Use to record the card being clicked
  const [playerClickOnceList, setPlayerClickOnceList] = useState([])

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

  function onErrorClose (_, reason) {
    if (reason !== 'clickaway') {
      hideDialog()
    }
  }

  // TODO:
  // If the game state is end, then:
  // [+] Show the dealer hands
  // + Compute and display the winner in a dialog
  // [+] Reset the bet credits
  // + Update the total credits if the player was the winner
  useEffect(() => {
    if (gameState === GameState.START) {
      resetBetCredits()
      updateDealerView()
      setPoker(new Poker())
    } else if (gameState === GameState.END) {
      updateDealerView(false)
      const winner = poker.winner([player, dealer])
      console.log(winner)
    } else {
      if (!hideDealer) {
        updateDealerView()
      }
    }
  }, [gameState])

  useEffect(() => {
    setPlayer({
      ...player,
      hand: poker.getPlayerHand()
    })
    setDealer({
      ...player,
      hand: poker.getPlayerHand()
    })
  }, [poker])

  return (
    <>
      <Dialog
        open={dialog.open}
        onClose={onErrorClose}
        disableBackdropClick
      >
        <Alert variant="filled" severity={dialog.type} icon={false}>
          <DialogTitle>{dialog.title}</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.dialogContent}>
              {dialog.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className={classes.button} onClick={onErrorClose} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Alert>
      </Dialog>

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
  dialog: PropTypes.object,
  hideDialog: PropTypes.func,
  gameState: PropTypes.string,
  hideDealer: PropTypes.bool,
  updateDealerView: PropTypes.func,
  resetBetCredits: PropTypes.func
}

// Styles
const useStyles = makeStyles({
  button: {
    color: 'black',
    backgroundColor: 'white'
  },
  dialogContent: {
    color: 'white'
  }
})

// Store
function mapStateToProps (state) {
  return {
    dialog: state.dialog,
    gameState: state.game.gameState,
    hideDealer: state.game.hideDealer
  }
}

const mapDispatchToProps = {
  hideDialog,
  updateDealerView,
  resetBetCredits
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
