import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'

import { CardBlankUTF } from '#lib/Deck.js'

const useStyles = makeStyles({
  disabled: {
    background: grey[300]
  },

  paperHover: {
    transition: '0.2s all ease-in-out',
    '&:hover': {
      background: blue[500]
    }
  },

  paperColorHover: {
    '&:hover': {
      color: 'white'
    }
  }
})

PlayingCard.propTypes = {
  card: PropTypes.object,
  noHover: PropTypes.bool,
  hidden: PropTypes.bool,
  onClick: PropTypes.func
}

function PlayingCard ({ card, onClick, hidden, noHover = false }) {
  const classes = useStyles()
  const value = hidden ? '' : card.value
  const suit = hidden ? { utf: CardBlankUTF } : card.suit

  function handleClick () {
    if (onClick) {
      onClick(card)
    } else {
      return null
    }
  }

  return (
    <Box
      onClick={() => handleClick()}
      style={{ cursor: 'pointer' }}
      width="150px"
      margin="0 10px"
    >
      <Paper className={noHover ? classes.disabled : classes.paperHover} elevation={3}>
        <Box
          className={noHover ? classes.disabled : classes.paperColorHover}
          color={suit.color}
          display="flex"
          flexDirection="column"
          height="220px"
        >
          <Box flex="1" display="flex">
            <Box flex="1" display="flex" justifyContent="center" alignItems="center" fontSize="2rem">
              {value}
            </Box>
            <Box flex="1"></Box>
            <Box flex="1"></Box>
          </Box>
          <Box flex="2" display="flex">
            <Box flex="1"></Box>
            <Box
              flex="1"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="6rem"
            >
              {suit.utf}
            </Box>
            <Box flex="1"></Box>
          </Box>
          <Box flex="1" display="flex">
            <Box flex="1"></Box>
            <Box flex="1"></Box>
            <Box flex="1" display="flex" justifyContent="center" alignItems="center" fontSize="2rem">
              {value}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default PlayingCard
