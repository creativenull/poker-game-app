import React, { useContext } from 'react'

import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/core/styles'

import GameStore from 'Store/game'
import { GameState } from 'Store/game/types'

import PlayingCard from './PlayingCard'

// Styles
const useStyles = makeStyles({
  cardTitle: {
    fontWeight: 'lighter',
    textAlign: 'center',
    color: grey[900]
  }
})

// Prop Types
Dealer.propTypes = {
  dealer: PropTypes.exact({
    id: PropTypes.string,
    hand: PropTypes.array
  })
}

// Component
function Dealer ({ dealer }) {
  const classes = useStyles()

  const { state } = useContext(GameStore)
  const hidden = (state.gameState === GameState.INIT_GAME ||
    state.gameState === GameState.START_GAME ||
    state.gameState === GameState.END_GAME)

  return (
    <Box display="flex" flexDirection="column" margin="10px 0">
      <Typography className={classes.cardTitle} variant="h3">Dealer</Typography>
      <Box display="flex">
        {dealer.hand.map((card, i) => <PlayingCard key={`dl${i}`} card={card} hidden={hidden} />)}
      </Box>
    </Box>
  )
}

export default Dealer
