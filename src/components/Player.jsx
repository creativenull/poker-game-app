import React from 'react'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { GameState } from '#app/constant-types'

import { gameReplaceCardAction } from '#store/game/actions'

import PlayingCard from './PlayingCard'

// Styles
const useStyles = makeStyles({
  cardTitle: {
    fontWeight: 'lighter',
    textAlign: 'center',
    color: green[500]
  }
})

// Component
function Player ({ player, gameReplaceCardAction, clickOnceList, gameState }) {
  const classes = useStyles()

  let hidden = true
  if (gameState === GameState.CONTINUE || gameState === GameState.END) {
    hidden = false
  } else {
    hidden = true
  }

  // Disable card after click once
  function disable (card) {
    if (clickOnceList.includes(card.id)) {
      return true
    }

    return false
  }

  function hide (card) {
    if (clickOnceList.includes(card.id)) {
      return true
    }

    return false
  }

  function onClick (card) {
    gameReplaceCardAction(card)
  }

  return (
    <Box display="flex" flexDirection="column" margin="10px 0">
      <Typography className={classes.cardTitle} variant="h3">Player</Typography>
      <Box display="flex">
        {player.hand.map(card => (
          <PlayingCard
            key={`player${card.id}`}
            card={card}
            onClick={gameState !== GameState.CONTINUE ? () => null : () => onClick(card)}
            noHover={gameState !== GameState.CONTINUE ? true : disable(card)}
            hidden={gameState !== GameState.CONTINUE ? hidden : hide(card)}
          />
        ))}
      </Box>
    </Box>
  )
}

Player.propTypes = {
  player: PropTypes.exact({
    id: PropTypes.string,
    hand: PropTypes.array
  }),
  gameReplaceCardAction: PropTypes.func,
  clickOnceList: PropTypes.array,
  gameState: PropTypes.string
}

// Store
const mapStateToProps = (state) => ({
  gameState: state.game.gameState,
  player: state.game.player,
  clickOnceList: state.game.clickOnceList
})

const mapDispatchToProps = {
  gameReplaceCardAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
