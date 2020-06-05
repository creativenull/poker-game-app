import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

function AdminPrizesForm (props) {
  return (
    <Box width="100%" display="flex" justifyContent="space-between">
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Typography component="span">{props.label}</Typography>
      </Box>
      <Box flex={1}>
        <TextField
          className={props.className}
          value={props.value}
          onChange={(e) => { props.onChange(e.target.value) }}
          variant="outlined"
          type="number"
          fullWidth
          required
        />
      </Box>
    </Box>
  )
}

AdminPrizesForm.propTypes = {
  className: PropTypes.any,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
}

export default AdminPrizesForm
