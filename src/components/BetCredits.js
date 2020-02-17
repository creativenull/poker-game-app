import React from 'react'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

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
const BetCredits = ({ credits, actions }) => {
  const classes = useStyles()
  const { betCredits, totalCredits, unit } = credits
  const { setBetCredits, setTotalCredits } = actions

  function incBet (e) {
    e.preventDefault()
    if (betCredits >= 0 && totalCredits > 0) {
      setBetCredits(betCredits + unit)
      setTotalCredits(totalCredits - unit)
    }
  }

  return (
    <Card elevation={5}>
      <CardHeader className={classes.cardHeader} title="Bet Credits" />
      <CardContent className={classes.cardContent}>
        <Typography variant="h3" color="primary">${betCredits}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button onClick={incBet} endIcon={<AddIcon />} variant="outlined" color="primary">
          Bet
        </Button>
      </CardActions>
    </Card>
  )
}

BetCredits.propTypes = {
  credits: PropTypes.exact({
    unit: PropTypes.number.isRequired,
    betCredits: PropTypes.number.isRequired,
    totalCredits: PropTypes.number.isRequired
  }),
  actions: PropTypes.exact({
    setBetCredits: PropTypes.func.isRequired,
    setTotalCredits: PropTypes.func.isRequired
  })
}

export default BetCredits
