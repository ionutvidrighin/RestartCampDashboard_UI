import React, { useState } from 'react';
import { downloadEmailTemplateFile } from '../../../api/callEmailTemplates';
import { makeStyles } from '@material-ui/styles';
import FileDownload from 'js-file-download';
import Button from '@material-ui/core/Button';
import SnackBar from '../SnackBar';

const useStyles = makeStyles({
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

const DownloadEmailTemplateFile = ({ hasEditPermission, url, token, templateName }) => {
  const localStyles = useStyles()

  const [snackBar, setSnackBar] = useState({})

  const handleDownloadFile = async () => {
    try {
      const response = await downloadEmailTemplateFile(url, token)
      FileDownload(response.data, templateName)
      setSnackBar({
        background: '#28cc95', 
        open: true,
        success: true,
        upDuration: 3000,
        text: 'Template descărcat cu succes!'
      })      
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
    <div className='download-email-template'>
      <Button variant='contained' className={localStyles.submitButton} onClick={handleDownloadFile} disabled={!hasEditPermission}>
        Descarcă template 
      </Button>

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  )
}

export default DownloadEmailTemplateFile