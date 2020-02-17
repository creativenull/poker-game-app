import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import BetCredits from './BetCredits'
import TotalCredits from './TotalCredits'

// Styles
const useStyles = makeStyles({
  button: {
    backgroundColor: green[600],
    color: '#fff',
    '&:hover': {
      backgroundColor: green[400]
    }
  }
})

// Component
const GameActions = ({ credits, actions }) => {
  const classes = useStyles()

  return (
    <Container>
      <BetCredits
        unit={credits.unit}
        credits={credits}
        actions={actions}
      />
      <TotalCredits totalCredits={credits.totalCredits} />
      <Box display="flex" justifyContent="center">
        <Button
          className={classes.button}
          startIcon={<PlayArrowIcon />}
          size="large"
          variant="contained"
        >
        Start
        </Button>
      </Box>
    </Container>
  )
}

GameActions.propTypes = {
  credits: PropTypes.exact({
    unit: PropTypes.number.isRequired,
    betCredits: PropTypes.number.isRequired,
    totalCredits: PropTypes.number.isRequired
  }),
  actions: PropTypes.exact({
    setBetCredits: PropTypes.func.isRequired,
    setTotalCredits: PropTypes.func.isRequired
  })
}

export default GameActions
