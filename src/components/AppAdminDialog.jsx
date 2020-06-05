import React, { useState } from 'react'
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
import { defaultSettings } from '#config/settings'

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
  }
})

// Component
function AppAdminDialog ({ adminDialogIsOpen, hideAdminDialog, settings, updateSettings }) {
  const classes = useStyles()
  const [backgroundImage, setBackgroundImg] = useState(settings.backgroundImage)
  const [winRatio, setWinRatio] = useState(settings.winRatio)
  const [replaceCardLimit, setReplaceCardLimit] = useState(settings.replaceCardLimit)

  // prizes
  const [prizesRoyalFlush, setPrizesRoyalFlush] = useState(settings.prizes.ROYAL_FLUSH)
  const [prizesStraightFlush, setPrizesStraightFlush] = useState(settings.prizes.STRAIGHT_FLUSH)
  const [prizesFourKind, setPrizesFourKind] = useState(settings.prizes.FOUR_OF_A_KIND)
  const [prizesFullHouse, setPrizesFullHouse] = useState(settings.prizes.FULL_HOUSE)
  const [prizesFlush, setPrizesFlush] = useState(settings.prizes.FLUSH)
  const [prizesStraight, setPrizesStraight] = useState(settings.prizes.STRAIGHT)
  const [prizesThreeKind, setPrizesThreeKind] = useState(settings.prizes.THREE_OF_A_KIND)
  const [prizesTwoPair, setPrizesTwoPair] = useState(settings.prizes.TWO_PAIR)
  const [prizesPair, setPrizesPair] = useState(settings.prizes.PAIR)
  const [prizesHighCard, setPrizesHighCard] = useState(settings.prizes.HIGH_CARD)

  function dialogSaveHandler () {
    updateSettings({
      backgroundImage,
      winRatio: parseFloat(winRatio) > 0 ? parseFloat(winRatio) : defaultSettings.winRatio,
      replaceCardLimit: parseInt(replaceCardLimit) > 0 ? parseInt(replaceCardLimit) : defaultSettings.replaceCardLimit,
      prizes: {
        ROYAL_FLUSH: prizesRoyalFlush,
        STRAIGHT_FLUSH: prizesStraightFlush,
        FOUR_OF_A_KIND: prizesFourKind,
        FULL_HOUSE: prizesFullHouse,
        FLUSH: prizesFlush,
        STRAIGHT: prizesStraight,
        THREE_OF_A_KIND: prizesThreeKind,
        TWO_PAIR: prizesTwoPair,
        PAIR: prizesPair,
        HIGH_CARD: prizesHighCard
      }
    })
    hideAdminDialog()
  }

  function dialogCloseHandler () {
    hideAdminDialog()
  }

  function dialogResetHandler () {
    setBackgroundImg(defaultSettings.backgroundImage)
    setWinRatio(defaultSettings.winRatio)
    setReplaceCardLimit(defaultSettings.replaceCardLimit)
    setPrizesRoyalFlush(defaultSettings.prizes.ROYAL_FLUSH)
    setPrizesStraightFlush(defaultSettings.prizes.STRAIGHT_FLUSH)
    setPrizesFourKind(defaultSettings.prizes.FOUR_OF_A_KIND)
    setPrizesFullHouse(defaultSettings.prizes.FULL_HOUSE)
    setPrizesFlush(defaultSettings.prizes.FLUSH)
    setPrizesStraight(defaultSettings.prizes.STRAIGHT)
    setPrizesThreeKind(defaultSettings.prizes.THREE_OF_A_KIND)
    setPrizesTwoPair(defaultSettings.prizes.TWO_PAIR)
    setPrizesPair(defaultSettings.prizes.PAIR)
    setPrizesHighCard(defaultSettings.prizes.HIGH_CARD)
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
          value={backgroundImage}
          onChange={(e) => setBackgroundImg(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          className={classes.textField}
          label="Win Ratio"
          value={winRatio}
          onChange={(e) => setWinRatio(e.target.value)}
          variant="outlined"
          type="number"
          fullWidth
          required
        />

        <TextField
          className={classes.textField}
          label="Card Replace Limit"
          value={replaceCardLimit}
          onChange={(e) => setReplaceCardLimit(e.target.value)}
          type="number"
          variant="outlined"
          fullWidth
          required
        />

        <Typography variant="h5" component="div">Prize Returns</Typography>

        <Divider />

        <AdminPrizeTextField
          className={classes.textField}
          label="Royal Flush"
          value={prizesRoyalFlush}
          onChange={setPrizesRoyalFlush}
        />

        <AdminPrizeTextField
          className={classes.textField}
          label="Straight Flush"
          value={prizesStraightFlush}
          onChange={setPrizesStraightFlush}
        />

        <AdminPrizeTextField
          className={classes.textField}
          label="Four of a Kind"
          value={prizesFourKind}
          onChange={setPrizesFourKind}
        />

        <AdminPrizeTextField
          className={classes.textField}
          label="Full House"
          value={prizesFullHouse}
          onChange={setPrizesFullHouse}
        />

        <AdminPrizeTextField
          className={classes.textField}
          label="Flush"
          value={prizesFlush}
          onChange={setPrizesFlush}
        />

        <AdminPrizeTextField
          className={classes.textField}
          label="Straight"
          value={prizesStraight}
          onChange={setPrizesStraight}
        />

        <AdminPrizeTextField
          className={classes.textField}
          label="Three of a Kind"
          value={prizesThreeKind}
          onChange={setPrizesThreeKind}
        />

        <AdminPrizeTextField
          className={classes.textField}
          label="Two Pair"
          value={prizesTwoPair}
          onChange={setPrizesTwoPair}
        />

        <AdminPrizeTextField
          className={classes.textField}
          label="Pair"
          value={prizesPair}
          onChange={setPrizesPair}
        />

        <AdminPrizeTextField
          className={classes.textField}
          label="High Card"
          value={prizesHighCard}
          onChange={setPrizesHighCard}
        />
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
