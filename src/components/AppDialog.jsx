import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { hideDialog } from '#store/dialog/actions'

// Styles
const useStyles = makeStyles({
  button: {
    color: 'black',
    backgroundColor: 'white'
  },
  dialogContent: {
    color: 'white'
  }
})

// Component
function AppDialog ({ dialog, hideDialog }) {
  const classes = useStyles()

  /** @param {string} reason */
  function dialogCloseHandler (reason) {
    if (reason !== 'clickaway') {
      hideDialog()
    }
  }

  return (
    <Container data-testid='app-dialog'>
      <Dialog open={dialog.open} onClose={dialogCloseHandler}>
        <Alert variant='filled' severity={dialog.type} icon={false}>
          <DialogTitle>
            <Typography variant='h4' component='span'>
              {dialog.title}
            </Typography>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>{dialog.message}</DialogContent>
          <DialogActions>
            <Button className={classes.button} onClick={(_, reason) => dialogCloseHandler(reason)} variant='contained'>
              Close
            </Button>
          </DialogActions>
        </Alert>
      </Dialog>
    </Container>
  )
}

AppDialog.propTypes = {
  dialog: PropTypes.object,
  hideDialog: PropTypes.func
}

// Store
const mapStateToProps = state => ({
  dialog: state.dialog
})

const mapDispatchToProps = {
  hideDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDialog)
