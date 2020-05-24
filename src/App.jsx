import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'

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

import Dealer from '#components/Dealer'
import GameActions from '#components/GameActions'
import Player from '#components/Player'
import Rules from '#components/Rules'
import AppDialog from '#components/AppDialog'
import AppAdminDialog from '#components/AppAdminDialog'

import { GameState } from '#app/constant-types'

// Component
function App (props) {
  const { openAdminDialog } = props
  const { winnerDialog, loserDialog } = props
  const { gameState } = props
  const { hideDealer, updateDealerView, resetBetCredits } = props
  const { player, dealer, winners } = props
  const { gameGetAllHandsAction, gameGetWinnerAction, gameResetPokerAction, gameUpdateTotalCredits } = props

  useEffect(() => {
    addEventListener('keydown', (e) => {
      if (e.shiftKey && e.keyCode === 90) {
        openAdminDialog()
      }
    })
  }, [])

  // If the game state is END, then:
  // + Show the dealer hands
  // + Compute and display the winner in a dialog
  // + Reset the bet credits
  // + Update the total credits if the player was the winner
  useEffect(() => {
    if (gameState === GameState.INIT) {
      gameGetAllHandsAction()
    } else if (gameState === GameState.START) {
      resetBetCredits()
      updateDealerView()
      gameResetPokerAction()
      gameGetAllHandsAction()
    } else if (gameState === GameState.END) {
      updateDealerView(false)
      gameGetWinnerAction()
      gameUpdateTotalCredits()
    } else {
      if (!hideDealer) {
        updateDealerView()
      }
    }
  }, [gameState])

  // Show winner dialog when it is available
  useEffect(() => {
    if (winners.length > 0) {
      console.table(winners)
      if (winners[0].id === player.id) {
        // Player is the winner
        if (winners[0].handRank === winners[1].handRank) {
          // Won by tie breaker
          winnerDialog(winners[0].name, winners[1].name, true)
        } else {
          // Won by higher hand
          winnerDialog(winners[0].name, winners[1].name)
        }
      } else if (winners[0].id === dealer.id) {
        // Dealer is the winner
        if (winners[0].handRank === winners[1].handRank) {
          // Lost by tie breaker
          loserDialog(winners[1].name, winners[0].name, true)
        } else {
          // Lost by lower hand
          loserDialog(winners[1].name, winners[0].name)
        }
      }
    }
  }, [winners])

  return (
    <>
      <AppDialog />
      <AppAdminDialog />

      <Box display="flex" justifyContent="center">
        <Box flex="3" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Box>
            <Dealer />
            <Player />
          </Box>
          <Box marginTop={5}>
            <Rules />
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
