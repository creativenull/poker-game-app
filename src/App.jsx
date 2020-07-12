import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import makeStyles from '@material-ui/core/styles/makeStyles'

import { winnerDialog, loserDialog } from '#store/dialog/actions'
import { openAdminDialog } from '#store/admin/actions'
import {
  updateDealerView,
  resetBetCredits,
  gameGetAllHandsAction,
  gameGetWinnerAction,
  gameResetPokerAction,
  gameUpdateTotalCredits
} from '#store/game/actions'

import AppDialog from '#components/AppDialog'
import AppAdminDialog from '#components/AppAdminDialog'
import AppMain from '#components/AppMain'

import { GameState } from '#app/constant-types'

// Styles
const useStyles = makeStyles({
  root: props => ({
    backgroundImage: `url(${props.backgroundImage})`,
    padding: 10
  })
})

// Component
function App (props) {
  const { openAdminDialog } = props
  const { winnerDialog, loserDialog } = props
  const { gameState } = props
  const { hideDealer, updateDealerView, resetBetCredits } = props
  const { player, dealer, winners } = props
  const { gameGetAllHandsAction, gameGetWinnerAction, gameResetPokerAction, gameUpdateTotalCredits } = props
  const classes = useStyles({ backgroundImage: props.backgroundImage })

  /** @param {EventTarget} e */
  function adminEventListenerHandler (e) {
    if (e.shiftKey && e.keyCode === 90) {
      openAdminDialog()
    }
  }

  // Keyboard shortcut to open admin panel
  useEffect(() => {
    document.addEventListener('keydown', adminEventListenerHandler)

    return () => {
      document.removeEventListener('keydown', adminEventListenerHandler)
    }
  })

  // Game action update on re-render
  useEffect(() => {
    if (gameState === GameState.INIT) {
      gameGetAllHandsAction()
    } else if (gameState === GameState.START) {
      // Reset the game state after each play
      resetBetCredits()
      updateDealerView()
      gameResetPokerAction()
      gameGetAllHandsAction()
    } else if (gameState === GameState.END) {
      // If the game state is END, then:
      // + Show the dealer hands
      // + Compute and display the winner in a dialog
      // + Reset the bet credits
      // + Update the total credits if the player was the winner
      updateDealerView(false)
      gameGetWinnerAction()
      gameUpdateTotalCredits()
    } else {
      if (!hideDealer) {
        updateDealerView()
      }
    }
  }, [
    gameState,
    gameGetAllHandsAction,
    resetBetCredits,
    updateDealerView,
    gameResetPokerAction,
    gameGetWinnerAction,
    hideDealer,
    gameUpdateTotalCredits
  ])

  // Show dialog once winners are set
  useEffect(() => {
    if (winners.length > 0) {
      console.table(winners)
      if (winners[0].id === player.id) {
        // PLAYER is winner
        const [player, dealer] = winners

        if (player.handRank === dealer.handRank) {
          // Won by tie breaker
          winnerDialog({ playerHand: player.name, dealerHand: dealer.name, tie: true })
        } else {
          // Won by higher hand
          winnerDialog({ playerHand: player.name, dealerHand: dealer.name })
        }
      } else if (winners[0].id === dealer.id) {
        // DEALER is winner
        const [dealer, player] = winners

        if (dealer.handRank === player.handRank) {
          // Lost by tie breaker
          loserDialog({ playerHand: player.name, dealerHand: dealer.name, tie: true })
        } else {
          // Lost by lower hand
          loserDialog({ playerHand: player.name, dealerHand: dealer.name })
        }
      }
    }
  }, [winners, dealer.id, player.id, winnerDialog, loserDialog])

  return (
    <div className={classes.root}>
      <AppDialog />
      <AppAdminDialog />

      <AppMain />
    </div>
  )
}

App.propTypes = {
  backgroundImage: PropTypes.string,
  dealer: PropTypes.object,
  gameGetAllHandsAction: PropTypes.func,
  gameGetWinnerAction: PropTypes.func,
  gameResetPokerAction: PropTypes.func,
  gameState: PropTypes.string,
  gameUpdateTotalCredits: PropTypes.func,
  hideDealer: PropTypes.bool,
  loserDialog: PropTypes.func,
  openAdminDialog: PropTypes.func,
  player: PropTypes.object,
  resetBetCredits: PropTypes.func,
  updateDealerView: PropTypes.func,
  winnerDialog: PropTypes.func,
  winners: PropTypes.array
}

// Store
const mapStateToProps = (state) => ({
  backgroundImage: state.admin.settings.backgroundImage,
  dealer: state.game.dealer,
  gameState: state.game.gameState,
  hideDealer: state.game.hideDealer,
  player: state.game.player,
  winners: state.game.winners
})

const mapDispatchToProps = {
  gameGetAllHandsAction,
  gameGetWinnerAction,
  gameResetPokerAction,
  gameUpdateTotalCredits,
  loserDialog,
  openAdminDialog,
  resetBetCredits,
  updateDealerView,
  winnerDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
