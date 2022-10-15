import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { CSVLink } from "react-csv";
import Button from '@material-ui/core/Button';
import SnackBar from '../../ReusableComponents/SnackBar';
 
const useStyles = makeStyles({
  button: {
    height: '2.2rem',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#509ecc',
    "&:hover": {
      backgroundColor: '#509ecc'
    }
  },
  snackBarError: {
    "& .MuiSnackbarContent-root": {
      minWidth: '210px !important',
      backgroundColor: '#e04d6b'
    },
    "& .MuiSnackbarContent-message": {
      width: '100%',
      textAlign: 'center',
      color: 'white'
    }
  }
})

const DownloadCSV = ({buttonLabel, data, CSVfileName, exportPermission, CSVheaders}) => {
  const localStyles = useStyles()
  const [snackBar, setSnackBar] = useState({upDuration: 3000})

  const handleDisplayErrorForNoTableDataSelected = () => {
    if (data.length === 0) {
      setSnackBar({
        ...snackBar,
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
      { data.length === 0 ?
        <Button
          className={localStyles.button}
          variant="contained"
          onClick={handleDisplayErrorForNoTableDataSelected}
          disabled={!exportPermission}>
          { buttonLabel }
        </Button>
        :
        <CSVLink
          data={data}
          id={`csv-export ${CSVfileName}`} 
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

export default DownloadCSV
