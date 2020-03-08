import React from 'react'

import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'
import PropTypes from 'prop-types'

import { CardBlankUTF } from 'Lib/Deck'

const useStyles = makeStyles({
  disabled: {
    background: grey[300]
  },

  paper: {
    transition: '0.2s all ease-in-out',
    '&:hover': {
      background: blue[500]
    }
  },

  paperColor: {
    '&:hover': {
      color: 'white'
    }
  }
})

PlayingCard.propTypes = {
  card: PropTypes.exact({
    value: PropTypes.string,
    rank: PropTypes.number,
    suit: PropTypes.exact({
      color: PropTypes.string,
      utf: PropTypes.string,
      value: PropTypes.string
    }),
    disabled: PropTypes.bool
  }),
  hidden: PropTypes.bool,
  onClick: PropTypes.func
}

// Component
function PlayingCard ({ card, hidden, onClick }) {
  const classes = useStyles()
  let value = card.value || ''
  let suit = card.suit || { color: '', utf: '', value: '' }

  if (hidden) {
    value = ''
    suit = {
      value: '',
      color: 'black',
      utf: CardBlankUTF
    }
  }

  const handleClickOnce = () => {
    if (!card.disabled) {
      onClick(card)
    }
  }

  return (
    <Box
      onClick={handleClickOnce}
      style={{ cursor: 'pointer' }}
      width="150px"
      margin="0 10px"
    >
      <Paper className={card.disabled ? classes.disabled : classes.paper} elevation={3}>
        <Box
          className={card.disabled ? classes.disabledColor : classes.paperColor}
          color={card.disabled ? grey[600] : suit.color}
          display="flex"
          flexDirection="column"
          height="200px"
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
