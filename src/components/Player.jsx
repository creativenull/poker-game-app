import React from 'react'

import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/core/styles'

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
  clickOnceList: PropTypes.array
}

// Component
function Player ({ player, onClick, clickOnceList }) {
  const classes = useStyles()

  function disable (card) {
    if (clickOnceList.includes(card.id)) {
      return true
    }

    return false
  }

  return (
    <Box display="flex" flexDirection="column" margin="10px 0">
      <Typography className={classes.cardTitle} variant="h3">Player</Typography>
      <Box display="flex">
        {player.hand.map(card => (
          <PlayingCard key={`player${card.id}`} card={card} onClick={onClick} noHover={disable(card)} />
        ))}
      </Box>
    </Box>
  )
}

export default Player
