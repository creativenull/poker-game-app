import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import green from '@material-ui/core/colors/green'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { hideAdminDialog } from '#store/admin/actions'

// Styles
const useStyles = makeStyles({
  button: {
    color: 'white',
    backgroundColor: green[600],
    '&:hover': {
      background: green[500]
    }
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
function AppAdminDialog ({ adminDialogIsOpen, hideAdminDialog }) {
  const classes = useStyles()
  const [img, setImg] = useState('')
  const [prizes, setPrizes] = useState('')

  function dialogSaveHandler () {
    hideAdminDialog()
  }

  function dialogCloseHandler () {
    hideAdminDialog()
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
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          className={classes.textField}
          label="Add Background Image"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          fullWidth
          required
        />
        <TextField
          className={classes.textField}
          label="Prize return for each winning hand"
          value={prizes}
          onChange={(e) => setPrizes(e.target.value)}
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions>
        <Button className={classes.button} onClick={dialogSaveHandler} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AppAdminDialog.propTypes = {
  adminDialogIsOpen: PropTypes.bool,
  hideAdminDialog: PropTypes.func
}

// Store
const mapStateToProps = (state) => ({
  adminDialogIsOpen: state.admin.dialog.open
})

const mapDispatchToProps = {
  hideAdminDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(AppAdminDialog)
