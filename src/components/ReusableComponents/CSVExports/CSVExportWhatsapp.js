import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { CSVLink } from "react-csv";
import { createCSVheaderForWhatsappNumbers } from '../../../utils/helperFunctions';
import Button from '@material-ui/core/Button';
import SnackBar from '../SnackBar';

const useStyles = makeStyles({
  button: {
    height: '2.2rem',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#509ecc',
    "&:hover": {
      backgroundColor: '#509ecc'
    }
  }
})

const CSVExportWhatsapp = ({ exportPermission, dataToExport }) => {
  const localStyles = useStyles()

  const CSVheaders = createCSVheaderForWhatsappNumbers()
  const [snackBar, setSnackBar] = useState({upDuration: 3000})

  const handleDisplayErrorNoDataToExport = () => {
    if (dataToExport.length === 0) {
      setSnackBar({
        background: '#e43d6f', 
        open: true,
        success: false,
        position: 'top',
        text: "Nu există date pentru export"
      })
    }
  }

  return (
    <div className='ms-2'>
      { dataToExport.length === 0 ?
        <Button
          className={localStyles.button}
          variant="contained"
          onClick={handleDisplayErrorNoDataToExport}
          disabled={!exportPermission}>
          Exportă Nr. Tel. Whatsapp CSV
        </Button>
        :
        <CSVLink
          data={dataToExport}
          id='csv-export'
          headers={CSVheaders}
          filename='NrTelCursantiFormatWhatsapp'>
          <Button
            className={localStyles.button}
            variant="contained"
            onClick={()=>{}}
            disabled={!exportPermission}>
            Exportă Nr. Tel. Whatsapp CSV
          </Button>
        </CSVLink>
      }

    { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
  </div>
  )
}

export default CSVExportWhatsapp