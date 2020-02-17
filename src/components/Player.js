import React from 'react'

import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/core/styles'

import PlayingCards from './PlayingCards'

// Styles
const useStyles = makeStyles({
  cardTitle: {
    fontWeight: 'lighter',
    textAlign: 'center',
    color: green[500]
  }
})

// Component
const Player = ({ cards }) => {
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="column" margin="10px 0">
      <Typography className={classes.cardTitle} variant="h3">Player</Typography>
      <Box display="flex">
        <PlayingCards cards={cards} />
      </Box>
    </Box>
  )
}

// Prop Types
Player.propTypes = {
  cards: PropTypes.array.isRequired
}

export default Player
