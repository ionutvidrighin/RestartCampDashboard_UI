import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { CSVLink } from "react-csv";
import { chartTableTitles } from "../../../constants/chartTableTitlesConstants";
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

const DownloadCSV = ({data, tableTitle, exportPermission, CSVheaders}) => {
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

  let csvFileName;
  switch(tableTitle) {
    case chartTableTitles.cursanti_inscrisi_total:
    csvFileName = 'Total_cursanti_inscrisi'
    break;

    case chartTableTitles.cursanti_inscrisi_curs:
    csvFileName = 'Cursanti_inscrisi_per_curs'
    break;

    case chartTableTitles.cursanti_prezenti:
    csvFileName = 'Cursanti_prezenti_la_curs'
    break;

    default:
    csvFileName = "Export_CSV"
  }

  return (
    <div className='ms-2'>
      { data.length === 0 ?
        <Button
          className={localStyles.button}
          variant="contained"
          onClick={handleDisplayErrorForNoTableDataSelected}
          disabled={!exportPermission}>
          Exportă în CSV
        </Button>
        :
        <CSVLink
          data={data} 
          id="csv-export" 
          headers={CSVheaders}
          filename={csvFileName} >
          <Button
            className={localStyles.button}
            variant="contained"
            onClick={()=>{}}
            disabled={!exportPermission}>
            Exportă în CSV
          </Button>
        </CSVLink>
      }

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  )
}

export default DownloadCSV
