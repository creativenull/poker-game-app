import React from 'react'

import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

const PlayingCard = ({ color, name, utf }) => (
  <Box width="150px" margin="0 10px">
    <Paper elevation={3}>
      <Box display="flex" flexDirection="column" color={color} height="200px">
        <Box flex="1" display="flex">
          <Box flex="1" display="flex" justifyContent="center" alignItems="center" fontSize="2rem">
            {name}
          </Box>
          <Box flex="1"></Box>
          <Box flex="1"></Box>
        </Box>
        <Box flex="2" display="flex">
          <Box flex="1"></Box>
          <Box flex="1" display="flex" justifyContent="center" alignItems="center" fontSize="6rem">
            {utf}
          </Box>
          <Box flex="1"></Box>
        </Box>
        <Box flex="1" display="flex">
          <Box flex="1"></Box>
          <Box flex="1"></Box>
          <Box flex="1" display="flex" justifyContent="center" alignItems="center" fontSize="2rem">
            {name}
          </Box>
        </Box>
      </Box>
    </Paper>
  </Box>
)

PlayingCard.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  utf: PropTypes.string.isRequired
}

export default PlayingCard
