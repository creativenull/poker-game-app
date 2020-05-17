import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

import { updateGameState } from '#store/game/actions'
import { showDialog } from '#store/dialog/actions'

import { GameState } from '#app/constant-types'
import BetCredits from './BetCredits'
import TotalCredits from './TotalCredits'

GameActions.propTypes = {
  gameState: PropTypes.string,
  betCredits: PropTypes.number,
  updateGameState: PropTypes.func,
  showDialog: PropTypes.func
}

// Component
function GameActions ({ gameState, betCredits, updateGameState, showDialog }) {
  const [gameStateText, setGameStateText] = useState('Start')

  // Change text
  useEffect(() => {
    if (gameState === GameState.INIT || gameState === GameState.START) {
      setGameStateText('Start')
    } else if (gameState === GameState.CONTINUE) {
      setGameStateText('Continue')
    } else if (gameState === GameState.END) {
      setGameStateText('Try Again')
    }
  }, [gameState])

  // Update the game state
  function updateGameStateText () {
    if (betCredits > 0) {
      updateGameState()
    } else {
      showDialog('😯 Add credits', 'Cannot start with no bet credits, you should add some')
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

const mapStateToProps = (state) => {
  return {
    gameState: state.game.gameState,
    betCredits: state.game.betCredits
  }
}

const mapDispatchToProps = {
  updateGameState,
  showDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(GameActions)
