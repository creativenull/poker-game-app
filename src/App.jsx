import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { winnerDialog, loserDialog } from '#store/dialog/actions'
import {
  updateDealerView,
  resetBetCredits,
  gameGetAllHandsAction,
  gameGetWinnerAction,
  gameResetPokerAction
} from '#store/game/actions'

import Dealer from '#components/Dealer'
import GameActions from '#components/GameActions'
import Player from '#components/Player'
import Rules from '#components/Rules'
import AppDialog from '#components/AppDialog'

import { GameState } from '#app/constant-types'

// Component
function App (props) {
  const { winnerDialog, loserDialog } = props
  const { gameState } = props
  const { hideDealer, updateDealerView, resetBetCredits } = props
  const { player, dealer, winners } = props
  const { gameGetAllHandsAction, gameGetWinnerAction, gameResetPokerAction } = props

  // To bold and underline the test
  function bu (message) {
    return (<b><u>{message}</u></b>)
  }

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
          winnerDialog(
            <Typography variant="body1">
              You Won with the {bu(winners[0].name)} higher ranked hand, dealer also had {bu(winners[1].name)} but
              lower ranked
            </Typography>
          )
        } else {
          winnerDialog(
            <Typography variant="body1">
              You Won with the {bu(winners[0].name)} hand! Dealer had a {bu(winners[1].name)} hand
            </Typography>
          )
        }
      } else if (winners[0].id === dealer.id) {
        // Dealer is the winner
        if (winners[0].handRank === winners[1].handRank) {
          loserDialog(
            <Typography variant="body1">
              You Lost with the {bu(winners[1].name)} lower ranked hand, dealer also had {bu(winners[0].name)} but
              higher ranked
            </Typography>
          )
        } else {
          loserDialog(
            <Typography variant="body1">
              You Lost with the {bu(winners[1].name)} hand! Dealer had a {bu(winners[0].name)} hand
            </Typography>
          )
        }
      }
    }
  }, [winners])

  return (
    <>
      <AppDialog />

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
  gameState: PropTypes.string,
  hideDealer: PropTypes.bool,
  player: PropTypes.exact({
    id: PropTypes.string,
    hand: PropTypes.array
  }),
  dealer: PropTypes.exact({
    id: PropTypes.string,
    hand: PropTypes.array
  }),
  winners: PropTypes.array,
  winnerDialog: PropTypes.func,
  loserDialog: PropTypes.func,
  updateDealerView: PropTypes.func,
  resetBetCredits: PropTypes.func,
  gameGetAllHandsAction: PropTypes.func,
  gameGetWinnerAction: PropTypes.func,
  gameResetPokerAction: PropTypes.func
}

// Store
const mapStateToProps = (state) => ({
  gameState: state.game.gameState,
  hideDealer: state.game.hideDealer,
  player: state.game.player,
  dealer: state.game.dealer,
  winners: state.game.winners
})

const mapDispatchToProps = {
  winnerDialog,
  loserDialog,
  updateDealerView,
  resetBetCredits,
  gameGetAllHandsAction,
  gameGetWinnerAction,
  gameResetPokerAction
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
