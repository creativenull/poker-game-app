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
  const classes = useStyles()

  function incBet () {
    incrementBetCredits()
  }

  return (
    <Card elevation={5}>
      <CardHeader className={classes.cardHeader} title="Bet Credits" />
      <CardContent className={classes.cardContent}>
        <Typography variant="h3" color="primary">${game.betCredits}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button onClick={incBet} endIcon={<AddIcon />} variant="outlined" color="primary">
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
