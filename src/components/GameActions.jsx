import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import PlayArrowIcon from '@material-ui/icons/PlayArrow'

import { updateGameState } from '#store/game/actions'
import { showDialog } from '#store/dialog/actions'

import { GameState } from '#app/constant-types'
import BetCredits from './BetCredits'
import TotalCredits from './TotalCredits'

// Component
function GameActions ({ gameState, betCredits, updateGameState, showDialog }) {
  let gameStateText = 'Start'
  if (gameState === GameState.INIT || gameState === GameState.START) {
    gameStateText = 'Start'
  } else if (gameState === GameState.CONTINUE) {
    gameStateText = 'Continue'
  } else if (gameState === GameState.END) {
    gameStateText = 'Try Again'
  }

  // Update the game state
  function updateGameStateText () {
    if (betCredits > 0) {
      updateGameState()
    } else {
      showDialog(
        '😯 Add credits',
        <Typography variant="body1">Cannot start with no bet credits, you should add some</Typography>,
        'error'
      )
    }
  }

  return (
    <Container>
      <BetCredits />
      <TotalCredits />
      <Box display="flex" justifyContent="center">
        <Button
          onClick={() => updateGameStateText()}
          startIcon={<PlayArrowIcon />}
          size="large"
          variant="contained"
          color="primary"
        >
          {gameStateText}
        </Button>
      </Box>
    </Container>
  )
}

GameActions.propTypes = {
  gameState: PropTypes.string,
  betCredits: PropTypes.number,
  updateGameState: PropTypes.func,
  showDialog: PropTypes.func
}

// Store
const mapStateToProps = (state) => ({
  gameState: state.game.gameState,
  betCredits: state.game.betCredits
})

const mapDispatchToProps = {
  updateGameState,
  showDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(GameActions)
