import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { appPagesConstants } from '../../../constants/userPermissions';
import { isAdmin, doesUserHaveViewPermission, doesUserHaveEditPermission,
  doesUserHaveMonthlyCSVExportPermission, doesUserHaveWhatsappCSVExportPermission, 
  checkUserAccessOnPastDataLimit, createTableColumnsAccordingToPermission,
  createAllStudentsDataCSVheaders, createMonthlyCSVheadersAccordingToPermission,
  createWhatsappNumbersCSVheaders, extractUserTablePermissions } from '../../../utils/helperFunctions';
import { calculateMonthsDifference } from '../../../utils/helperFunctions';
import { fetchAllStudentsData, fetchStudentsByDate, fetchStudentsWhatsappNumbers, 
  clearStudentsInCoursesMod1 } from '../../../redux/actions/studentsActions';
import { storeAllStudentsExportData, storeStudentsWhatsappNumbersExportData, 
  clearAllStudentsExportData, clearMonthlyStudentsExportData,
  clearStudentsWhatsappNumbersExportData } from '../../../redux/actions/cvsExportActions';
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
import CSVExport from "../../../components/ReusableComponents/CSVExport/CSVExport";
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

  const currentUserRole = useSelector(state => state.authReducer.role)
  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const tableColumns = createTableColumnsAccordingToPermission(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const allDataCSVheaders = createAllStudentsDataCSVheaders()
  const monthlyCSVheaders = createMonthlyCSVheadersAccordingToPermission(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const whatsappCSVheaders = createWhatsappNumbersCSVheaders()
  const hasEditPermission = doesUserHaveEditPermission(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const hasMonthlyExportCSVPermission = doesUserHaveMonthlyCSVExportPermission(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const hasWhatsappExportCSVPermission = doesUserHaveWhatsappCSVExportPermission(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const permissions = {edit: hasEditPermission, export: hasMonthlyExportCSVPermission}
  const viewPastDataLimit = checkUserAccessOnPastDataLimit(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)
  const userTablePermissions = extractUserTablePermissions(appPagesConstants.TOTAL_CURSANTI_INSCRISI, userPagesAccessFromStore)

  const [searchingDate, setSearchingDate] = useState(currentMonthYear)
  const [snackBar, setSnackBar] = useState({})
  const [tableOrChartBtn, setTableOrChartBtn] = useState({
    table: true,
    chart: false,
    text: 'DU-MĂ LA GRAFIC'
  })

  const callAllStudentsData = async () => {
    const response = await dispatch(fetchAllStudentsData())
    dispatch(storeAllStudentsExportData(response))
  }
  const callStudentsByDate = () => dispatch(fetchStudentsByDate({date: currentMonthYear, userTablePermissions}))
  const callStudentsWhatsappNumbers = async () => {
    const response = await dispatch(fetchStudentsWhatsappNumbers({date: searchingDate}))
    dispatch(storeStudentsWhatsappNumbersExportData(response))
  }

  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      callStudentsByDate()
    }
    if (hasWhatsappExportCSVPermission) {
      callStudentsWhatsappNumbers()
    }
    if (isAdmin(currentUserRole)) {
      callAllStudentsData()
    }

    return () => clearReduxStateAtComponentDestroy()
  }, [])

  const clearReduxStateAtComponentDestroy = () => {
    dispatch(clearStudentsInCoursesMod1())
    dispatch(clearAllStudentsExportData())
    dispatch(clearMonthlyStudentsExportData())
    dispatch(clearStudentsWhatsappNumbersExportData())
  }

  const getTableDataFromStore = useSelector(state => ({
    // data used inside the Table
    allData: state.students.registeredForCourseMod1.data,
    // data used inside the Graph
    studentsByDay: state.students.registeredForCourseMod1.data.map(item => item.registrationDate),
    error: state.students.registeredForCourseMod1?.error
  }))
  const { allData, error } = getTableDataFromStore

  const handleSelectNewDate = event => setSearchingDate(event.target.value)

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

  const handleSearchNewData = async () => {
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

        if (hasWhatsappExportCSVPermission) {
          callStudentsWhatsappNumbers()
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
                    onChange={(event) => handleSelectNewDate(event)} 
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
                  <CSVExport
                    dataType="monthly"
                    buttonLabel='Export CSV - monthly'
                    CSVfileName='TotalCursantiInscrisi'
                    exportPermission={hasMonthlyExportCSVPermission}
                    CSVheaders={monthlyCSVheaders}
                  />

                  { isAdmin(currentUserRole) &&  
                    <CSVExport
                      dataType="all"
                      buttonLabel='Export CSV - all data'
                      CSVfileName='TotalCursantiInscrisi'
                      exportPermission={true}
                      CSVheaders={allDataCSVheaders}
                    />                 
                  }

                  <CSVExport
                    dataType="whatsapp"
                    buttonLabel='Export CSV - Whatsapp'
                    CSVfileName='NrTelCursantiFormatWhatsapp'
                    exportPermission={hasWhatsappExportCSVPermission}
                    CSVheaders={whatsappCSVheaders}
                  />
                </div>
              </div>
              <div className="px-3 pb-5" style={{width: '100%'}}>
                <Table
                  tableTitle={chartTableTitles.cursanti_inscrisi_total} 
                  tableColumns={tableColumns} 
                  tableData={setupDataForTableAllStudents(getTableDataFromStore, tableColumns)} />
              </div>
            </>
          }

          { tableOrChartBtn.chart &&
            <LineChart 
              chartData={setupDataForChart(getTableDataFromStore)} 
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
