import React, { useContext } from 'react'

import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/core/styles'

import GameStore from 'Store/game'
import { GameState } from 'Store/game/types'

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
  onClick: PropTypes.func
}

// Component
function Player ({ player, onClick }) {
  const classes = useStyles()

  const { state } = useContext(GameStore)
  const hidden = (state.gameState === GameState.INIT_GAME || state.gameState === GameState.END_GAME)

  return (
    <Box display="flex" flexDirection="column" margin="10px 0">
      <Typography className={classes.cardTitle} variant="h3">Player</Typography>
      <Box display="flex">
        {player.hand.map((card, i) => <PlayingCard key={`pl${i}`} card={card} onClick={onClick} hidden={hidden} />)}
      </Box>
    </Box>
  )
}

export default Player
