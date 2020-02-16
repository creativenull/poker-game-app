import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/core/styles'

import BetCredits from './BetCredits'
import TotalCredits from './TotalCredits'

const useStyles = makeStyles({
  button: {
    backgroundColor: green[600],
    color: '#fff',
    '&:hover': {
      backgroundColor: green[400]
    }
  }
})

const GameActions = () => {
  const classes = useStyles()

  return (
    <Container>
      <BetCredits />
      <TotalCredits />
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

export default GameActions
