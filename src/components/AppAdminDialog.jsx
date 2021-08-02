import React, { useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import makeStyles from '@material-ui/core/styles/makeStyles'
import red from '@material-ui/core/colors/red'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import { hideAdminDialog, updateSettings } from '#store/admin/actions'
import logger from '#config/logger'
import { openSnackbar } from '#store/dialog/actions'

import useForm, {
  updateBackgroundImg,
  updateWinRatio,
  updateCardLimit,
  updatePrize,
  resetForm,
  updateTimezone,
} from '#app/hooks/useForm'

import { reloadInitialState } from '#app/hooks/useForm/actions'

import AdminPrizeTextField from './AdminPrizeTextField'

// Styles
const useStyles = makeStyles({
  cancelBtn: {
    color: 'white',
    backgroundColor: red[600],
    '&:hover': {
      background: red[500]
    }
  },
  saveBtn: {
    color: 'white',
    backgroundColor: green[600],
    '&:hover': {
      background: green[500]
    }
  },
  resetBtn: {
    margin: '0 10px'
  },
  dialogContent: {},
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content'
  },
  textField: {
    margin: '10px 0'
  },
  link: {
    cursor: 'pointer',
    fontSize: '1.2rem'
  }
})

// Component
function AppAdminDialog({ adminDialogIsOpen, hideAdminDialog, settings, updateSettings, openSnackbar }) {
  const classes = useStyles()
  const { state: settingsState, onChangeAction: dispatch } = useForm(settings)
  const prizeKeys = Object.keys(settings.prizes)

  const csvLink = useRef(null)

  function dialogSaveHandler() {
    updateSettings({ ...settingsState })
    hideAdminDialog()
    openSnackbar()
  }

  function dialogCloseHandler() {
    dispatch(reloadInitialState(settings))
    hideAdminDialog()
  }

  function dialogResetSettingsHandler() {
    dispatch(resetForm())
    openSnackbar()
  }

  function dialogResetLogsHandler() {
    logger.setDefault()
    openSnackbar()
  }

  function dialogDownloadCsv() {
    const csvContent = logger.getCsvContent()
    csvLink.current.href = encodeURI(csvContent)
    csvLink.current.download = 'log.csv'
  }

  return (
    <Container data-testid='admin-dialog'>
      <Dialog open={adminDialogIsOpen} onClose={dialogCloseHandler} maxWidth='sm' fullWidth disableBackdropClick>
        <DialogTitle>
          <Typography variant='h4' component='span'>
            Admin Panel
          </Typography>
          <Button className={classes.resetBtn} onClick={dialogResetSettingsHandler} variant='outlined'>
            Reset
          </Button>
        </DialogTitle>

        <DialogContent className={classes.dialogContent}>
          <div style={{ marginBottom: '20px' }}>
            <Link ref={csvLink} className={classes.link} onClick={dialogDownloadCsv}>
              Download Logs
            </Link>
            <Button className={classes.resetBtn} onClick={dialogResetLogsHandler} variant='outlined'>
              Reset Logs
            </Button>
            <IconButton color="primary" onClick={() => {
              const themeMode = !settings.themeMode
              updateSettings({ ...settingsState, themeMode: themeMode })
            }}>
              {settings.themeMode ? <Brightness4Icon /> : <Brightness5Icon />}
            </IconButton>
          </div>

          <TextField
            className={classes.textField}
            label='Background Image'
            value={settingsState.backgroundImage}
            onChange={e => dispatch(updateBackgroundImg(e))}
            variant='outlined'
            fullWidth
            required
          />

          <TextField
            className={classes.textField}
            label='Win Ratio (between 0.1 and 0.99)'
            value={settingsState.winRatio}
            onChange={e => dispatch(updateWinRatio(e))}
            variant='outlined'
            type='number'
            fullWidth
            required
          />

          <TextField
            className={classes.textField}
            label='Card Replace Limit (between 1 and 5)'
            value={settingsState.replaceCardLimit}
            onChange={e => dispatch(updateCardLimit(e))}
            type='number'
            variant='outlined'
            fullWidth
            required
          />

          <TextField
            className={classes.textField}
            label='TimeZone'
            value={settingsState.timeZone}
            onChange={e => dispatch(updateTimezone(e))}
            type='text'
            variant='outlined'
            fullWidth
            required
          />

          <Typography variant='h5' component='div'>
            Prize Returns
          </Typography>

          <Divider />

          {prizeKeys.map(key => (
            <AdminPrizeTextField
              key={key}
              className={classes.textField}
              label={key.split('_').join(' ')}
              name={key}
              value={settingsState.prizes[key]}
              onChange={e => dispatch(updatePrize(e))}
            />
          ))}
        </DialogContent>

        <DialogActions>
          <Button className={classes.cancelBtn} onClick={dialogCloseHandler} variant='contained'>
            Cancel
          </Button>
          <Button className={classes.saveBtn} onClick={dialogSaveHandler} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

AppAdminDialog.propTypes = {
  adminDialogIsOpen: PropTypes.bool,
  hideAdminDialog: PropTypes.func,
  settings: PropTypes.object,
  updateSettings: PropTypes.func,
  openSnackbar: PropTypes.func
}

// Store
const mapStateToProps = state => ({
  adminDialogIsOpen: state.admin.dialog.open,
  settings: state.admin.settings
})

const mapDispatchToProps = {
  hideAdminDialog,
  updateSettings,
  openSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(AppAdminDialog)
