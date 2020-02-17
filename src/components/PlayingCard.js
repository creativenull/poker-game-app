import React from 'react'

import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

// Component
const PlayingCard = ({ playingCard }) => (
  <Box width="150px" margin="0 10px">
    <Paper elevation={3}>
      <Box display="flex" flexDirection="column" color={playingCard.color} height="200px">
        <Box flex="1" display="flex">
          <Box flex="1" display="flex" justifyContent="center" alignItems="center" fontSize="2rem">
            {playingCard.card}
          </Box>
          <Box flex="1"></Box>
          <Box flex="1"></Box>
        </Box>
        <Box flex="2" display="flex">
          <Box flex="1"></Box>
          <Box flex="1" display="flex" justifyContent="center" alignItems="center" fontSize="6rem">
            {playingCard.suit.utf}
          </Box>
          <Box flex="1"></Box>
        </Box>
        <Box flex="1" display="flex">
          <Box flex="1"></Box>
          <Box flex="1"></Box>
          <Box flex="1" display="flex" justifyContent="center" alignItems="center" fontSize="2rem">
            {playingCard.card}
          </Box>
        </Box>
      </Box>
    </Paper>
  </Box>
)

PlayingCard.propTypes = {
  playingCard: PropTypes.object
}

export default PlayingCard
