import React from 'react'

import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/core/styles'

import PlayingCards from './PlayingCards'

// Styles
const useStyles = makeStyles({
  cardTitle: {
    fontWeight: 'lighter',
    textAlign: 'center',
    color: grey[900]
  }
})

// Component
const Dealer = ({ cards }) => {
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="column" margin="10px 0">
      <Typography className={classes.cardTitle} variant="h3">Dealer</Typography>
      <Box display="flex">
        <PlayingCards cards={cards} />
      </Box>
    </Box>
  )
}

// Prop Types
Dealer.propTypes = {
  cards: PropTypes.array.isRequired
}

export default Dealer
