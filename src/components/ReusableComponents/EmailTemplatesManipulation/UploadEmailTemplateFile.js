import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { uploadEmailTemplateFile } from '../../../api/callEmailTemplates';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import UploadIcon from '../../../assets/upload-icon.png';
import SnackBar from '../SnackBar';

const useStyles = makeStyles({
  textField: {
    color: 'white',
    "& .MuiFormLabel-root": {
      color: 'white'
    },
    "& .MuiFilledInput-adornedStart": {
      paddingLeft: '0'
    }
  },
  icon: {
    "& .MuiIconButton-label": {
      marginTop: '1.3rem'
    },
    "& .MuiButtonBase-root": {
      padding: '0 !important'
    },
    "& .MuiIconButton-root": {
      padding: '0 !important'
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

const UploadEmailTemplateFile = ({ hasEditPermission, url, token }) => {
  const localStyles = useStyles()

  const [selectedFile, setSelectedFile] = useState(null)
  const [snackBar, setSnackBar] = useState({})

	const handleSelectFile = (event) => {
		setSelectedFile(event.target.files[0])
	}

  const handleUploadFile = async () => {
    if (!selectedFile) {
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        success: false,
        upDuration: 2000,
        text: 'Niciun fișier selectat'
      })
      return
    }

    if (!selectedFile.name.includes('.handlebars')) {
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        success: false,
        upDuration: 4000,
        text: 'Format fișier incorect. Fișierul trebuie sa fie HTML cu extensia ".handlebars"'
      })
      setSelectedFile(null)
      return
    }

    const formData = new FormData()
		formData.append('File', selectedFile)

    try {
      const response = await uploadEmailTemplateFile(url, formData, token)
      const message = response.data.message
      setSnackBar({
        background: '#28cc95', 
        open: true,
        success: true,
        upDuration: 3000,
        text: message
      })
      setSelectedFile(null)
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
    <div className='upload-email-template'>
      <TextField
        variant="filled"
        value={selectedFile ? selectedFile.name : ""}
        label="Încarcă Fișier Template"
        sx={{ m: 1, width: '25ch' }}
        className={localStyles.textField}
        InputProps={{
          fullWidth: true,
          startAdornment: (
            <IconButton component="label" className={localStyles.icon}>
              <UploadIconComponent />
              <input
                type="file"
                hidden
                onChange={handleSelectFile}
                name="[name]"
                disabled={!hasEditPermission}
              />
            </IconButton>
          )
        }}
        disabled={!hasEditPermission}
      />

      <Button
        onClick={handleUploadFile}
        variant='contained' 
        className={`${localStyles.submitButton} mt-2`}
        disabled={!hasEditPermission}>
        Încarcă template 
      </Button>

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  )
}

const UploadIconComponent = () => {
  return <img src={UploadIcon} alt="upload-icon" style={{width: '25px'}} />
}

export default UploadEmailTemplateFile