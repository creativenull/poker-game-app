import React from 'react'

import Box from '@material-ui/core/Box'

import Dealer from '#components/Dealer'
import GameActions from '#components/GameActions'
import Player from '#components/Player'
import Rules from '#components/Rules'

export default function AppMain () {
  return (
    <Box display="flex" justifyContent="center">
      <Box flex="3" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Box>
          <Dealer />
          <Player />
        </Box>
        <Box marginTop={5}>
          <Rules />
        </Box>
      </Box>
      <Box flex="1">
        <GameActions />
      </Box>
    </Box>
  )
}
