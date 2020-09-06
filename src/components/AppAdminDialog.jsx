import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { hideAdminDialog, updateSettings } from '#store/admin/actions'

import useForm, {
  updateBackgroundImg,
  updateWinRatio,
  updateCardLimit,
  updatePrize,
  resetForm
} from '#app/hooks/useForm'

import AdminPrizeTextField from './AdminPrizeTextField'
import { reloadInitialState } from '#app/hooks/useForm/actions'

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
  }
})

// Component
function AppAdminDialog ({ adminDialogIsOpen, hideAdminDialog, settings, updateSettings }) {
  const classes = useStyles()
  const { state: settingsState, onChangeAction: dispatch } = useForm(settings)
  const prizeKeys = Object.keys(settings.prizes)

  function dialogSaveHandler () {
    updateSettings({ ...settingsState })
    hideAdminDialog()
  }

  function dialogCloseHandler () {
    dispatch(reloadInitialState(settings))
    hideAdminDialog()
  }

  function dialogResetHandler () {
    dispatch(resetForm())
  }

  return (
    <Dialog
      open={adminDialogIsOpen}
      onClose={dialogCloseHandler}
      maxWidth="sm"
      fullWidth
      disableBackdropClick
    >
      <DialogTitle>
        <Typography variant="h4" component="span">
          Admin Panel
        </Typography>
        <Button className={classes.resetBtn} onClick={dialogResetHandler} variant="outlined">
          Reset to Defaults
        </Button>
      </DialogTitle>

      <DialogContent className={classes.dialogContent}>
        <TextField
          className={classes.textField}
          label="Background Image"
          value={settingsState.backgroundImage}
          onChange={(e) => dispatch(updateBackgroundImg(e))}
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          className={classes.textField}
          label="Win Ratio (between 0.1 and 0.99)"
          value={settingsState.winRatio}
          onChange={(e) => dispatch(updateWinRatio(e))}
          variant="outlined"
          type="number"
          fullWidth
          required
        />

        <TextField
          className={classes.textField}
          label="Card Replace Limit (between 1 and 5)"
          value={settingsState.replaceCardLimit}
          onChange={(e) => dispatch(updateCardLimit(e))}
          type="number"
          variant="outlined"
          fullWidth
          required
        />

        <Typography variant="h5" component="div">Prize Returns</Typography>

        <Divider />

        {prizeKeys.map(key => (
          <AdminPrizeTextField
            key={key}
            className={classes.textField}
            label="Royal Flush"
            name={key}
            value={settingsState.prizes[key]}
            onChange={(e) => dispatch(updatePrize(e))}
          />
        ))}
      </DialogContent>

      <DialogActions>
        <Button className={classes.cancelBtn} onClick={dialogCloseHandler} variant="contained">
          Cancel
        </Button>
        <Button className={classes.saveBtn} onClick={dialogSaveHandler} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AppAdminDialog.propTypes = {
  adminDialogIsOpen: PropTypes.bool,
  hideAdminDialog: PropTypes.func,
  settings: PropTypes.object,
  updateSettings: PropTypes.func
}

// Store
const mapStateToProps = (state) => ({
  adminDialogIsOpen: state.admin.dialog.open,
  settings: state.admin.settings
})

const mapDispatchToProps = {
  hideAdminDialog,
  updateSettings
}

export default connect(mapStateToProps, mapDispatchToProps)(AppAdminDialog)
