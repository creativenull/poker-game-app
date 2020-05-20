import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { hideDialog } from '#store/dialog/actions'

const useStyles = makeStyles({
  button: {
    color: 'black',
    backgroundColor: 'white'
  },
  dialogContent: {
    color: 'white'
  }
})

function AppDialog (props) {
  const { dialog, hideDialog } = props
  const classes = useStyles()

  function dialogCloseHandler (_, reason) {
    if (reason !== 'clickaway') {
      hideDialog()
    }
  }

  return (
    <Dialog
      open={dialog.open}
      onClose={dialogCloseHandler}
      disableBackdropClick
    >
      <Alert variant="filled" severity={dialog.type} icon={false}>
        <DialogTitle>
          <Typography variant="h4" component="span">
            {dialog.title}
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {dialog.message}
        </DialogContent>
        <DialogActions>
          <Button className={classes.button} onClick={dialogCloseHandler} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Alert>
    </Dialog>
  )
}

AppDialog.propTypes = {
  dialog: PropTypes.object,
  hideDialog: PropTypes.func
}

const mapStateToProps = (state) => ({
  dialog: state.dialog
})

const mapDispatchToProps = {
  hideDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDialog)
