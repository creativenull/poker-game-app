import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/core/styles'

import { GameState } from '#app/constant-types'

import PlayingCard from './PlayingCard'

// Styles
const useStyles = makeStyles({
  cardTitle: {
    fontWeight: 'lighter',
    textAlign: 'center',
    color: green[500]
  }
})

// Prop Types
Player.propTypes = {
  player: PropTypes.exact({
    id: PropTypes.string,
    hand: PropTypes.array
  }),
  onClick: PropTypes.func.isRequired,
  clickOnceList: PropTypes.array,
  gameState: PropTypes.string
}

// Component
function Player ({ player, onClick, clickOnceList, gameState }) {
  const classes = useStyles()
  const [hidden, setHidden] = useState(true)

  // Disable card after click once
  function disable (card) {
    if (clickOnceList.includes(card.id)) {
      return true
    }

    return false
  }

  // Update the cards status to be hidden or not
  useEffect(() => {
    if (gameState === GameState.CONTINUE || gameState === GameState.END) {
      setHidden(false)
    } else {
      setHidden(true)
    }
  }, [gameState])

  return (
    <Box display="flex" flexDirection="column" margin="10px 0">
      <Typography className={classes.cardTitle} variant="h3">Player</Typography>
      <Box display="flex">
        {player.hand.map(card => (
          <PlayingCard
            key={`player${card.id}`}
            card={card}
            onClick={gameState !== GameState.CONTINUE ? null : onClick}
            noHover={gameState !== GameState.CONTINUE ? true : disable(card)}
            hidden={hidden}
          />
        ))}
      </Box>
    </Box>
  )
}

const mapStateToProps = (state) => ({
  gameState: state.game.gameState
})

export default connect(mapStateToProps)(Player)
