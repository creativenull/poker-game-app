import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

import BetCredits from './BetCredits'
import TotalCredits from './TotalCredits'

// Component
function GameActions () {
  return (
    <Container>
      <BetCredits />
      <TotalCredits />
      <Box display="flex" justifyContent="center">
        <Button
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
