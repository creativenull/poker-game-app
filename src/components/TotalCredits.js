import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

// Styles
const useStyles = makeStyles({
  card: {
    margin: '24px 0'
  },

  cardContent: {
    textAlign: 'center'
  },

  cardHeader: {
    backgroundColor: green[700],
    color: '#fff'
  },

  creditsText: {
    color: green[500]
  }
})

// Component
const TotalCredits = ({ totalCredits }) => {
  const classes = useStyles()

  return (
    <Card elevation={5} className={classes.card}>
      <CardHeader className={classes.cardHeader} title="Total Credits" />
      <CardContent className={classes.cardContent}>
        <Typography variant="h3" className={classes.creditsText}>${totalCredits}</Typography>
      </CardContent>
    </Card>
  )
}

TotalCredits.propTypes = {
  totalCredits: PropTypes.number.isRequired
}

export default TotalCredits
