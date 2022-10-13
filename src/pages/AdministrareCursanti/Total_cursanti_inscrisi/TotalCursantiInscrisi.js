import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { appPagesConstants } from '../../../constants/userPermissions';
import { doesUserHaveViewPermission, doesUserHaveEditPermission,
  doesUserHaveCSVExportPermission, checkUserAccessOnPastDataLimit,
  createTableColumnsAccordingToPermission, createCSVheadersAccordingToPermission, 
  extractUserTablePermissions } from '../../../utils/helperFunctions';
import { calculateMonthsDifference } from '../../../utils/helperFunctions';
import { fetchStudentsByDate, clearStudentsInCoursesMod1State } from '../../../redux/actions/studentsActions/getRegisteredStudents';
import { chartTableTitles } from '../../../constants/chartTableTitlesConstants';
import { setupDataForTableAllStudents, setupDataForChart } from '../helperMethods';
import { makeStyles } from '@material-ui/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Button from '@material-ui/core/Button';
import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';
import TableChartRoundedIcon from '@material-ui/icons/TableChartRounded';
import NoAccessPage from '../../../components/NoAccessPage';
import NoPermissionBanner from '../../../components/ReusableComponents/Banners/NoPermissionBanner';
import SnackBar from '../../../components/ReusableComponents/SnackBar';
import DownloadCSV from "../../../components/ReusableComponents/Table/DownloadCSV";
import Table from '../../../components/ReusableComponents/Table/Table';
import LineChart from '../../../components/ReusableComponents/Charts/LineChart';
dayjs.extend(relativeTime)

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
  const currentMonthYear = dayjs().format().substring(0, 7)

  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const tableColumns = createTableColumnsAccordingToPermission(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const CSVheaders = createCSVheadersAccordingToPermission(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const hasEditPermission = doesUserHaveEditPermission(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const hasExportCSVPermission = doesUserHaveCSVExportPermission(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const permissions = {edit: hasEditPermission, export: hasExportCSVPermission}
  const viewPastDataLimit = checkUserAccessOnPastDataLimit(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const userTablePermissions = extractUserTablePermissions(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)

  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      dispatch(fetchStudentsByDate({date: currentMonthYear, userTablePermissions }))
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
  const [searchingDate, setSearchingDate] = useState(currentMonthYear)

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

    const selectedDateIsInFuture = dayjs(searchingDate).isAfter(dayjs())
    if (selectedDateIsInFuture) {
      setSnackBar({
        ...snackBar,
        background: '#e43d6f', 
        open: true, 
        text: "Data selectată nu poate fi in viitor."
      })
      return
    }

      const selectedDate = new Date(searchingDate)
      const currentDate = new Date()
      const dateDifference = calculateMonthsDifference(selectedDate, currentDate)
      if (viewPastDataLimit !== "unlimited") {
        if (dateDifference >= viewPastDataLimit) {
          setSnackBar({
            background: '#e43d6f', 
            open: true,
            success: false,
            upDuration: 12000,
            text: `Datele mai vechi de ${viewPastDataLimit} luni nu pot fi generate. 
                  Te rog contactează administratorul pentru mai multe detalii.`
          })
          return
        }
      }

    dispatch(fetchStudentsByDate({date: searchingDate, userTablePermissions}))
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
      { hasViewPermission ?
        <div className="administrare-cursanti d-flex flex-column align-items-center justify-content-between">

          <NoPermissionBanner permissions={permissions} />

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
                    disabled={!hasEditPermission}
                  />
                  <Button 
                    className={localStyles.button}
                    variant="contained"
                    onClick={handleSearchNewData}
                    disabled={!hasEditPermission}>
                  Schimbă Datele
                  </Button>
                  <DownloadCSV
                    data={tableDataForExport}
                    tableTitle='TotalCursantiInscrisi'
                    exportPermission={hasExportCSVPermission}
                    CSVheaders={CSVheaders}
                  /> 
                </div>
              </div>
              <div className="px-3 pb-5" style={{width: '100%'}}>
                <Table
                  tableTitle={chartTableTitles.cursanti_inscrisi_total} 
                  tableColumns={tableColumns} 
                  tableData={setupDataForTableAllStudents(getDataFromStore, tableColumns)} />
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
