import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
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
  /** @param {{ backgroundImage: string }} props */
  root: props => ({
    backgroundImage: `url(${props.backgroundImage})`,
    padding: 10
  })
})

/** @param {any} props */
function App (props) {
  const { gameState, admin, winners } = props
  const classes = useStyles({ backgroundImage: admin.backgroundImage })

  // Register key shortcut to open admin panel
  useEffect(() => {
    document.addEventListener('keydown', e => onUpdateRegisterKeyCombo(e))

    return () => {
      document.removeEventListener('keydown', e => onUpdateRegisterKeyCombo(e))
    }
  }, [])

  // Change UI elements based on game state
  useEffect(() => {
    onUpdateDispatchGameChanges(gameState)
  }, [gameState])

  // Show dialog UI once the game state has ended
  useEffect(() => {
    onUpdateDispatchWinnerDialogChanges(winners)
  }, [winners])

  // Dark mode setup
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: admin.themeMode ? 'dark' : 'light'
        }
      }),
    [admin]
  )

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppSnackbar />
        <AppDialog />
        <AppAdminDialog />
        <AppMain />
      </div>
    </ThemeProvider>
  )
}

App.propTypes = {
  admin: PropTypes.object,
  dealer: PropTypes.object,
  gameState: PropTypes.string,
  hideDealer: PropTypes.bool,
  player: PropTypes.object,
  winners: PropTypes.array
}

/** @param {any} state */
const mapStateToProps = state => ({
  admin: state.admin.settings,
  gameState: state.game.gameState,
  winners: state.game.winners
})

export default connect(mapStateToProps)(App)
