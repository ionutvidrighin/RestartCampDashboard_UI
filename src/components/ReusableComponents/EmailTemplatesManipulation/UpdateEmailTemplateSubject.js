import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { getEmailTemplateSubject, updateEmailTemplateSubject } from '../../../api/callEmailTemplates';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SnackBar from '../SnackBar';

const useStyles = makeStyles({
  textField: {
    width: '280px',
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
    margin: 'auto 0',
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

const UpdateEmailTemplateSubject = ({ hasEditPermission, getTemplateURL, updateSubjectURL, token }) => {
  const localStyles = useStyles()
  
  const [emailTemplateValue, setEmailTemplateValue] = useState("")
  const [textFieldValue, setTextFieldValue] = useState('')
  const [snackBar, setSnackBar] = useState({})

  useEffect(() => {
    const callEmailTemplateSubject = async () => {
      try {
        const response = await getEmailTemplateSubject(getTemplateURL, token)
        setEmailTemplateValue(response.data.value)
      } catch (error) {
        setEmailTemplateValue(error.response.data.message)
      }
    }
    callEmailTemplateSubject()
  }, [])

  const handleSelectTextFieldValue = (event) => {
    setTextFieldValue(event.target.value)
  }

  const handleSaveUpdatedEmailSubject = async () => {
    if (textFieldValue === "") {
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        success: false,
        upDuration: 3000,
        text: 'Te rog introdu noul subiect pentru e-mail.'
      })
      return
    }

    try {
      const newEmailSubject = { emailSubject: textFieldValue }
      const response = await updateEmailTemplateSubject(updateSubjectURL, token, newEmailSubject)
      const message = response.data.message
      setSnackBar({
        background: '#28cc95', 
        open: true,
        success: true,
        upDuration: 3000,
        text: message
      })
      setEmailTemplateValue(response.data.value)
      setTextFieldValue("")
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
    <div className='update-email-template-subject mb-5'>
      <div className='mb-3' style={{color: '#d9d9d9'}}>
        <p className='m-0 text-center fw-bold font-italic'>
          SUBIECT E-mail curent:
        </p>

        <p className='m-0 text-center fw-bold'>
          { emailTemplateValue }
        </p>
      </div>
      
      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Actualizează Subiect E-mail"
        value={textFieldValue}
        onChange={handleSelectTextFieldValue}
        disabled={!hasEditPermission}
      />

      <Button
        onClick={handleSaveUpdatedEmailSubject}
        variant='contained' 
        className={`${localStyles.submitButton} mt-2`}
        disabled={!hasEditPermission}>
        Actualizează Subiect E-mail
      </Button>

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  )
}

export default UpdateEmailTemplateSubject