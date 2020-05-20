import React from 'react'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import grey from '@material-ui/core/colors/grey'
import makeStyles from '@material-ui/core/styles/makeStyles'

import PlayingCard from './PlayingCard'

// Styles
const useStyles = makeStyles({
  cardTitle: {
    fontWeight: 'lighter',
    textAlign: 'center',
    color: grey[900]
  }
})

// Component
function Dealer ({ dealer, hideDealer }) {
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="column" margin="10px 0">
      <Typography className={classes.cardTitle} variant="h3">Dealer</Typography>
      <Box display="flex">
        {dealer.hand.map(card => (
          <PlayingCard key={`dealer${card.id}`} card={card} noHover hidden={hideDealer} />
        ))}
      </Box>
    </Box>
  )
}

Dealer.propTypes = {
  dealer: PropTypes.exact({
    id: PropTypes.string,
    hand: PropTypes.array
  }),
  hideDealer: PropTypes.bool
}

// Store
const mapStateToProps = (state) => ({
  hideDealer: state.game.hideDealer,
  dealer: state.game.dealer
})

export default connect(mapStateToProps)(Dealer)
