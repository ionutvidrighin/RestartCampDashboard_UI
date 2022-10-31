import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { sendTestEmailTemplate } from '../../../api/callEmailTemplates';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SnackBar from '../SnackBar';

const useStyles = makeStyles({
  textField: {
    width: '280px',
    marginBottom: '.5rem !important',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(10px, 5px) scale(0.75)'
    },
    "& .MuiFormLabel-root": {
      color: 'white',
      fontSize: '.8rem'
    },
    "& .MuiInputBase-root": {
      color: 'white'
    }
  },
  submitButton: {
    backgroundColor: '#509ecc', 
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    transition: '.5s ease all',
    "&:hover": {
      backgroundColor: '#c23a6a',
      transition: '.5s ease all'
    }
  }
})

const SendTestEmailTemplate = ({ hasEditPermission, url, token }) => {
  const localStyles = useStyles()

  const [emailAddress, setEmailAddress] = useState("")
  const [snackBar, setSnackBar] = useState({})

  const handleCollectEmailAddress = (e) => {
    setEmailAddress(e.target.value)
  }

  const handleSendTestEmail = async () => {
    if (emailAddress === "") {
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        success: false,
        upDuration: 3500,
        text: 'Nicio adresă e-mail introdusă'
      })
      return
    }

    try {
      const response = await sendTestEmailTemplate(url, token, {emailAddress})
      setSnackBar({
        background: '#28cc95', 
        open: true,
        success: true,
        upDuration: 3000,
        text: response.data.message
      })
      setEmailAddress("")
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Server Error - No response'
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        success: false,
        upDuration: 3500,
        text: errorMessage
      })
    }
  }

  return (
    <div className='send-test-email-template'>
      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Adresa e-mail test"
        value={emailAddress}
        onChange={handleCollectEmailAddress}
        disabled={!hasEditPermission}
      />
      <Button
        variant="contained"
        type='submit'
        className={localStyles.submitButton}
        onClick={handleSendTestEmail}
        disabled={!hasEditPermission}>
        Trimite Test E-mail
      </Button>

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  )
}

export default SendTestEmailTemplate