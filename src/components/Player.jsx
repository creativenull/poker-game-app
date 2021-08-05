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
    color: green[500],
    backgroundColor: '#fff',
    margin: '10px 0'
  }
})

function getHiddenState (gameState) {
  if (gameState === GameState.CONTINUE || gameState === GameState.END) {
    return false
  }

  return true
}

// Component
function Player ({ player, gameReplaceCardAction, clickOnceList, gameState }) {
  const classes = useStyles()
  const hidden = getHiddenState(gameState)

  function isIncludedCard (card) {
    if (clickOnceList.includes(card.id)) {
      return true
    }

    return false
  }

  function onClickHandler (card) {
    if (gameState !== GameState.CONTINUE) {
      return null
    } else {
      gameReplaceCardAction(card)
    }
  }

  function disableHandler (card) {
    if (gameState !== GameState.CONTINUE) {
      return true
    } else {
      return isIncludedCard(card)
    }
  }

  function hiddenHandler (card) {
    if (gameState !== GameState.CONTINUE) {
      return hidden
    } else {
      return isIncludedCard(card)
    }
  }

  return (
    <Box data-testid='player-hand' display='flex' flexDirection='column' margin='10px 0'>
      <Typography className={classes.cardTitle} variant='h3'>
        Player
      </Typography>
      <Box display='flex'>
        {player.hand.map(card => (
          <PlayingCard
            key={`player${card.id}`}
            card={card}
            onClick={() => onClickHandler(card)}
            noHover={disableHandler(card)}
            hidden={hiddenHandler(card)}
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
const mapStateToProps = state => ({
  gameState: state.game.gameState,
  player: state.game.player,
  clickOnceList: state.game.clickOnceList
})

const mapDispatchToProps = {
  gameReplaceCardAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
