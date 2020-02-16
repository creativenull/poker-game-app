import React from 'react'

import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/core/styles'

import PlayingCards from './PlayingCards'

const useStyles = makeStyles({
  cardTitle: {
    fontWeight: 'lighter',
    textAlign: 'center'
  },

  player: {
    color: green[500]
  }
})

// Component
const Player = ({ cards }) => {
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="column" margin="10px 0">
      <Typography className={[classes.cardTitle, classes.player]} variant="h3">Dealer</Typography>
      <Box display="flex">
        <PlayingCards cards={cards} />
      </Box>
    </Box>
  )
}

// Prop Types
Player.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Player
