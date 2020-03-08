import React, { useContext } from 'react'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue'
import { makeStyles } from '@material-ui/core/styles'

import GameStore from 'Store/game'
import { Actions, GameState } from 'Store/game/types'

// Styles
const useStyles = makeStyles({
  cardContent: {
    textAlign: 'center'
  },

  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  cardHeader: {
    backgroundColor: blue[900],
    color: '#fff'
  }
})

// Component
function BetCredits () {
  const classes = useStyles()
  const { state, dispatch } = useContext(GameStore)
  const disabled = (state.gameState === GameState.START_GAME || state.gameState === GameState.CONTINUE_GAME)

  function incBet () {
    if (state.betCredits >= 0 && state.totalCredits > 0) {
      dispatch({ type: Actions.INC_BET_CREDITS })
    }
  }

  return (
    <Card elevation={5}>
      <CardHeader className={classes.cardHeader} title="Bet Credits" />
      <CardContent className={classes.cardContent}>
        <Typography variant="h3" color="primary">${state.betCredits}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button disabled={disabled} onClick={incBet} endIcon={<AddIcon />} variant="outlined" color="primary">
          Bet
        </Button>
      </CardActions>
    </Card>
  )
}

export default BetCredits
