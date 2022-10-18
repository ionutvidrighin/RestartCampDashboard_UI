import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { CSVLink } from "react-csv";
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

const ALL_DATA = 'all'
const MONTHLY_DATA = 'monthly'
const WHATSAPP_DATA = 'whatsapp'

const CSVExport = ({dataType, buttonLabel, CSVfileName, exportPermission, CSVheaders}) => {
  const localStyles = useStyles()
  const [snackBar, setSnackBar] = useState({upDuration: 3000})

  const dataToExport = useSelector(state => {
    let data
    if (dataType === ALL_DATA) {
      data = state.csvDataExport.allData
    } else if (dataType === MONTHLY_DATA) {
      data = state.csvDataExport.monthlyData
    } else if (dataType === WHATSAPP_DATA) {
      data = state.csvDataExport.whatsappData
    }
    return data
  })

  const handleDisplayErrorForNoTableDataSelected = () => {
    if (dataToExport.length === 0) {
      setSnackBar({
        background: '#e43d6f', 
        open: true,
        success: false,
        position: 'top',
        text: "Nicio intrare selectată din tabel"
      })
    }
  }

  return (
    <div className='ms-2'>
      { dataToExport && dataToExport.length === 0 ?
        <Button
          className={localStyles.button}
          variant="contained"
          onClick={handleDisplayErrorForNoTableDataSelected}
          disabled={!exportPermission}>
          { buttonLabel }
        </Button>
        :
        <CSVLink
          data={dataToExport}
          id='csv-export' 
          headers={CSVheaders}
          filename={CSVfileName} >
          <Button
            className={localStyles.button}
            variant="contained"
            onClick={()=>{}}
            disabled={!exportPermission}>
            { buttonLabel }
          </Button>
        </CSVLink>
      }

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  )
}

export default CSVExport
