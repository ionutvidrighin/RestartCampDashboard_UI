import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import SnackBar from '../../ReusableComponents/SnackBar';
import { CSVLink } from "react-csv";
import { CSV_HEADERS_ALL_STUDENTS } from "../../../pages/AdministrareCursanti/Total_cursanti_inscrisi/columns";
import { CSV_HEADERS_STUDENTS_BY_COURSE } from "../../../pages/AdministrareCursanti/Cursanti_inscrisi_per_curs/columns";
import { CSV_HEADERS_STUDENTS_PRESENCE } from "../../../pages/AdministrareCursanti/Cursanti_prezenti_per_curs/columns";
import { chartTableTitles } from "../../../constants/chartTableTitlesConstants";

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

const DownloadCSV = ({data, tableTitle}) => {
  const localStyles = useStyles()
  const [snackBar, setSnackBar] = useState({upDuration: 3000})

  const handleDisplayErrorForNoTableDataSelected = () => {
    if (data.length === 0) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        position: 'top',
        text: "Nicio intrare selectată din tabel"
      })
    }
  }

  let csvHeader = ''
  let csvFileName;
  switch(tableTitle) {
    case chartTableTitles.cursanti_inscrisi_total:
    csvHeader = CSV_HEADERS_ALL_STUDENTS
    csvFileName = 'Total_cursanti_inscrisi'
    break;

    case chartTableTitles.cursanti_inscrisi_curs:
    csvHeader = CSV_HEADERS_STUDENTS_BY_COURSE
    csvFileName = 'Cursanti_inscrisi_per_curs'
    break;

    case chartTableTitles.cursanti_prezenti:
    csvHeader = CSV_HEADERS_STUDENTS_PRESENCE
    csvFileName = 'Cursanti_prezenti_la_curs'
    break;

    default:
    csvHeader = null
    csvFileName = ""
  }

  return (
    <div className='ms-2'>
      { data.length === 0 ?
        <Button
          className={localStyles.button}
          variant="contained"
          onClick={handleDisplayErrorForNoTableDataSelected}>
          Exportă în CSV
        </Button>
        :
        <CSVLink
          data={data} 
          id="csv-export" 
          headers={csvHeader}
          filename={csvFileName} >
          <Button
            className={localStyles.button}
            variant="contained"
            onClick={()=>{}} >
            Exportă în CSV
          </Button>
        </CSVLink>
      }

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  )
}

export default DownloadCSV
