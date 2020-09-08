import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import { closeSnackbar } from '#store/dialog/actions'

// Component
function AppSnackbar(props) {
  const { open, closeSnackbar } = props

  function handleClose () {
    closeSnackbar()
  }

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        Saved!
      </Alert>
    </Snackbar>
  )
}

AppSnackbar.propTypes = {
  open: PropTypes.bool
}

// Store
const mapStateToProps = (state) => ({
  open: state.dialog.snackbar.open
})

const mapDispatchToProps = {
  closeSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSnackbar)
