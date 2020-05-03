import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue'
import { makeStyles } from '@material-ui/core/styles'

import { GameState } from '#app/constant-types'
import { incrementBetCredits } from '#store/game/actions'

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

BetCredits.propTypes = {
  game: PropTypes.object,
  incrementBetCredits: PropTypes.func
}

// Component
function BetCredits ({ game, incrementBetCredits }) {
  const { cardHeader, cardContent, cardActions } = useStyles()
  const { gameState, betCredits } = game
  const disabled = (gameState === GameState.CONTINUE || gameState === GameState.END)

  function incBet () {
    incrementBetCredits()
  }

  return (
    <Card elevation={5}>
      <CardHeader className={cardHeader} title="Bet Credits" />
      <CardContent className={cardContent}>
        <Typography variant="h3" color="primary">${betCredits}</Typography>
      </CardContent>
      <CardActions className={cardActions}>
        <Button
          onClick={incBet}
          endIcon={<AddIcon />}
          disabled={disabled}
          variant="outlined"
          color="primary"
        >
          Bet
        </Button>
      </CardActions>
    </Card>
  )
}

function mapStateToProps (state) {
  return {
    game: state.game
  }
}

const mapDispatchToProps = {
  incrementBetCredits
}

export default connect(mapStateToProps, mapDispatchToProps)(BetCredits)
