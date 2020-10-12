import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import makeStyles from '@material-ui/core/styles/makeStyles'

import AppDialog from '#components/AppDialog'
import AppSnackbar from '#components/AppSnackbar'
import AppAdminDialog from '#components/AppAdminDialog'
import AppMain from '#components/AppMain'

import onUpdateDispatchWinnerDialogChanges from '#app/utils/onUpdateDispatchWinnerDialogChanges'
import onUpdateDispatchGameChanges from '#app/utils/onUpdateDispatchGameChanges'
import onUpdateRegisterKeyCombo from '#app/utils/onUpdateRegisterKeyCombo'

// Styles
const useStyles = makeStyles({
  root: props => ({
    backgroundImage: `url(${props.backgroundImage})`,
    padding: 10
  })
})

// Component
function App (props) {
  const { gameState } = props
  const { winners } = props
  const classes = useStyles({ backgroundImage: props.backgroundImage })

  // Register key shortcut to open admin panel
  useEffect(() => {
    document.addEventListener('keydown', onUpdateRegisterKeyCombo)

    return () => {
      document.removeEventListener('keydown', onUpdateRegisterKeyCombo)
    }
  })

  // Change UI elements based on game state
  useEffect(() => {
    onUpdateDispatchGameChanges(gameState)
  }, [gameState])

  // Show dialog UI once the game state has ended
  useEffect(() => {
    onUpdateDispatchWinnerDialogChanges(winners)
  }, [winners])

  return (
    <div className={classes.root}>
      <AppSnackbar />
      <AppDialog />
      <AppAdminDialog />
      <AppMain />
    </div>
  )
}

App.propTypes = {
  backgroundImage: PropTypes.string,
  dealer: PropTypes.object,
  gameState: PropTypes.string,
  hideDealer: PropTypes.bool,
  player: PropTypes.object,
  winners: PropTypes.array
}

// Store
const mapStateToProps = (state) => ({
  backgroundImage: state.admin.settings.backgroundImage,
  gameState: state.game.gameState,
  winners: state.game.winners
})

export default connect(mapStateToProps)(App)
