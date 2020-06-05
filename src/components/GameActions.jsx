import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

import PlayArrowIcon from '@material-ui/icons/PlayArrow'

import { updateGameState } from '#store/game/actions'
import { showDialog } from '#store/dialog/actions'

import { GameState } from '#app/constant-types'
import BetCredits from './BetCredits'
import TotalCredits from './TotalCredits'

/**
 * Change the game action button text, depending on game state
 *
 * @param {string} gameState
 *
 * @returns {string}
 */
function getGameStateText (gameState) {
  if (gameState === GameState.INIT || gameState === GameState.START) {
    return 'Start'
  } else if (gameState === GameState.CONTINUE) {
    return 'Continue'
  } else if (gameState === GameState.END) {
    return 'Try Again'
  }

  return 'Start'
}

/**
 * Dialog props for required
 *
 * @return
 */
function requiredDialogProps () {
  return {
    title: '😯 Add credits',
    message: <Typography variant="body1">Cannot start with no bet credits, you should add some</Typography>,
    type: 'error'
  }
}

// Styles
const useStyles = makeStyles({
  startBtn: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    '&:hover': {
      backgroundColor: '#aaa'
    }
  }
})

// Component
function GameActions ({ gameState, betCredits, updateGameState, showDialog }) {
  const classes = useStyles()
  const gameStateText = getGameStateText(gameState)

  // Update the game state
  function onClickUpdateGameState () {
    if (betCredits > 0) {
      updateGameState()
    } else {
      showDialog(requiredDialogProps())
    }
  }

  return (
    <Container>
      <BetCredits />
      <TotalCredits />
      <Box display="flex" justifyContent="center">
        <Button
          className={classes.startBtn}
          onClick={() => { onClickUpdateGameState() }}
          startIcon={<PlayArrowIcon />}
          size="large"
          variant="outlined"
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
