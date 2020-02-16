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

const BetCredits = () => {
  const classes = useStyles()

  return (
    <Card elevation={5}>
      <CardHeader className={classes.cardHeader} title="Bet Credits" />
      <CardContent className={classes.cardContent}>
        <Typography variant="h3" color="primary">$0</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button endIcon={<AddIcon />} variant="outlined" color="primary">
          Bet
        </Button>
      </CardActions>
    </Card>
  )
}

export default BetCredits
