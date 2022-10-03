import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { doesUserHavePermission } from '../../../utils/helperFunctions';
import { fetchStudentsByDate,
  clearStudentsInCoursesMod1State } from '../../../redux/actions/studentsActions/registeredStudentsActions';
import { chartTableTitles } from '../../../constants/chartTableTitlesConstants';
import { setupDataForTableAllStudents, setupDataForChart } from '../helperMethods';
import { makeStyles } from '@material-ui/styles';
import dayjs from 'dayjs';
import Button from '@material-ui/core/Button';
import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';
import TableChartRoundedIcon from '@material-ui/icons/TableChartRounded';
import NoAccessPage from '../../../components/NoAccessPage';
import SnackBar from '../../../components/ReusableComponents/SnackBar';
import DownloadCSV from "../../../components/ReusableComponents/Table/DownloadCSV";
import Table from '../../../components/ReusableComponents/Table/Table';
import LineChart from '../../../components/ReusableComponents/LineChart';
import tableColumns from './columns';

const useStyles = makeStyles({
  button: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#509ecc',
    "&:hover": {
      backgroundColor: '#509ecc'
    }
  }
})

const TotalCursantiInscrisi = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()
  const today = dayjs().format().substring(0, 7)
  const route = useLocation()
  const { pathname } = route

  const getUserPagesAccessFromStore = useSelector(state => state.authReducer.pagesPermission)
  const userHasPermission = doesUserHavePermission(pathname, getUserPagesAccessFromStore)

  useEffect(() => {
    setShowPlaceholder(false)
    if (userHasPermission) {
      dispatch(fetchStudentsByDate({date: today}))
    }
    // clear state at component destroy
    return () => dispatch(clearStudentsInCoursesMod1State())
  }, [])


  const [snackBar, setSnackBar] = useState({})
  const [tableOrChartBtn, setTableOrChartBtn] = useState({
    table: true,
    chart: false,
    text: 'DU-MĂ LA GRAFIC'
  })
  const [searchingDate, setSearchingDate] = useState(today)

  const getDataFromStore = useSelector(state => ({
    // data used inside the Table
    allData: state.registeredStudentsModule1.students,
    // data used inside the Graph
    studentsByDay: state.registeredStudentsModule1.students.map(item => item.registrationDate),
    error: state.registeredStudentsModule1?.error
  }))
  const { allData, error } = getDataFromStore

  // get the selected Table Data from Store and pass it to <DownloadCSV /> component prop
  const tableDataForExport = useSelector(state => state.tableDataForExport.selectedTableRows)

  const handleSwitchChartOrTable = () => {
    tableOrChartBtn.table ? setTableOrChartBtn({
      table: false,
      chart: true,
      text: 'DU-MĂ LA TABEL'
    }) : 
    setTableOrChartBtn({
      table: true,
      chart: false,
      text: 'DU-MĂ LA GRAFIC'
    })
  }

  const handleSearchNewData = () => {
    if (searchingDate === "" || searchingDate === undefined) {
      setSnackBar({
        ...snackBar,
        background: '#e43d6f', 
        open: true, 
        text: "Nicio dată selectată."
      })
      return
    }
    dispatch(fetchStudentsByDate({date: searchingDate}))
  }

  const displaySnackBar = () => {
    if (allData.length === 0) {
      if (error) {
        setSnackBar({
          background: '#e53c5d',
          open: true,
          text: error,
          upDuration: 4000
        })
      } else {
        setSnackBar({
          background: '#e53c5d',
          open: true,
          text: 'No Student Data for the selected search criteria',
          upDuration: 4000
        })
      }
    } else {
      setSnackBar({
        background: '#28cc95',
        open: true,
        text: 'Data Loaded',
        upDuration: 400
      })
    }
  }

  useEffect(() => {
    displaySnackBar()
  }, [allData])

  return (
    <>
      { userHasPermission ?
        <div className="administrare-cursanti d-flex flex-column align-items-center justify-content-between">
          <div className="p-3 pb-5 chart-table-btn align-self-start">
            <Button
              className={localStyles.button}
              onClick={handleSwitchChartOrTable}
              variant="contained"
              startIcon={tableOrChartBtn.table ? <ShowChartRoundedIcon /> : <TableChartRoundedIcon />}
              >
            {tableOrChartBtn.text}
            </Button>
          </div>

          { tableOrChartBtn.table &&
            <>
              <div className='action-buttons-section mb-3'>
                <h5> Total cursanți înscriși Cursuri MODUL 1 </h5>
                <div className='action-buttons'>
                  <input
                    type="month" 
                    defaultValue={searchingDate} 
                    onChange={e => setSearchingDate(e.target.value)} 
                    className="me-2"
                  />
                  <Button 
                    className={localStyles.button}
                    variant="contained"
                    onClick={handleSearchNewData} 
                    >
                  Schimbă Datele
                  </Button>
                  <DownloadCSV data={tableDataForExport} tableTitle='TotalCursantiInscrisi' /> 
                </div>
              </div>
              <div className="px-3 pb-5" style={{width: '100%'}}>
                <Table
                  tableTitle={chartTableTitles.cursanti_inscrisi_total} 
                  tableColumns={tableColumns} 
                  tableData={setupDataForTableAllStudents(getDataFromStore)} />
              </div>
            </>
          }

          { tableOrChartBtn.chart &&
            <LineChart 
              chartData={setupDataForChart(getDataFromStore)} 
              chartTitle={chartTableTitles.cursanti_inscrisi_total}
            />
          }

          { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }

        </div>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default TotalCursantiInscrisi;
