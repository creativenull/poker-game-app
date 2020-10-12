import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import { closeSnackbar } from '#store/dialog/actions'

// Component
function AppSnackbar (props) {
  const { open, closeSnackbar } = props

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={() => closeSnackbar()}>
      <Alert onClose={() => closeSnackbar()} severity="success">
        Saved!
      </Alert>
    </Snackbar>
  )
}

AppSnackbar.propTypes = {
  open: PropTypes.bool,
  closeSnackbar: PropTypes.func
}

// Store
const mapStateToProps = (state) => ({
  open: state.dialog.snackbar.open
})

const mapDispatchToProps = {
  closeSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSnackbar)
