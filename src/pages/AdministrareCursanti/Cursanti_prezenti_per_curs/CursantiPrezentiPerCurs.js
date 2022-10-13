import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { makeStyles } from '@material-ui/styles';
import { chartTableTitles } from '../../../constants/chartTableTitlesConstants';
import { appPagesConstants } from '../../../constants/userPermissions';
import { doesUserHaveViewPermission, doesUserHaveEditPermission,
  doesUserHaveCSVExportPermission, checkUserAccessOnPastDataLimit,
  createTableColumnsAccordingToPermission, createCSVheadersAccordingToPermission,
  extractUserTablePermissions } from '../../../utils/helperFunctions';
import { fetchStudentsPresenceByCourseName,
  clearCourseModule1Presence } from '../../../redux/actions/coursesActions/coursesPresenceModule1';
import { clearCoursesModule1 } from '../../../redux/actions/coursesActions/coursesModule1';
import { setupDataForTableCoursePresence, setupDataForBarChartCoursePresence, 
  setupDataForPieChartCoursePresence } from '../helperMethods';
import dayjs from 'dayjs';
import Button from '@material-ui/core/Button';
import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';
import TableChartRoundedIcon from '@material-ui/icons/TableChartRounded';
import GetNewPresenceDataDialog from './GetNewPresenceDataDialog';
import NoAccessPage from '../../../components/NoAccessPage';
import NoPermissionBanner from '../../../components/ReusableComponents/Banners/NoPermissionBanner';
import DownloadCSV from "../../../components/ReusableComponents/Table/DownloadCSV";
import Table from '../../../components/ReusableComponents/Table/Table';
import BarChart from '../../../components/ReusableComponents/Charts/barChart';
import RoundChart from '../../../components/ReusableComponents/Charts/pieChart';
import SnackBar from '../../../components/ReusableComponents/SnackBar';

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

const CursantiPrezentiPerCurs = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()
  const today_ro_format = dayjs().locale('ro').format('LL').substring(3)

  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)
  const tableColumns = createTableColumnsAccordingToPermission(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)
  const CSVheaders = createCSVheadersAccordingToPermission(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)
  const hasEditPermission = doesUserHaveEditPermission(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)
  const hasExportCSVPermission = doesUserHaveCSVExportPermission(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)
  const permissions = {edit: hasEditPermission, export: hasExportCSVPermission}
  const viewPastDataLimit = checkUserAccessOnPastDataLimit(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)
  const userTablePermissions = extractUserTablePermissions(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)

  const [tableOrChartBtn, setTableOrChartBtn] = useState({
    table: true,
    chart: false,
    text: 'DU-MĂ LA GRAFIC'
  })
  const [openChangeSearchDataDialog, setOpenChangeSearchDataDialog] = useState(false)
  const [selectedSearchData, setSelectedSearchData] = useState({ date: null, course: null })
  const [snackBar, setSnackBar] = useState({})

  // fetch All Courses MODULE 1
  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      dispatch(fetchStudentsPresenceByCourseName())
    }

    return () => {
      dispatch(clearCoursesModule1())
      dispatch(clearCourseModule1Presence())
    }
  }, [])

  // get the Courses MODULE 1 from Store
  const coursesList = useSelector(state => {
    let list = state.coursesModule1.courses
    list = list.map(course => ({id: nanoid(5), courseName: course.courseTitle}))
    return list
  })

  // get the Course MODULE 1 Presence Data from Store
  const coursePresence = useSelector(state => ({
    presenceData: state.coursePresence.presence,
    error: state.coursePresence?.error
  }))
  const { presenceData, error } = coursePresence

  // get the selected Table Data from Store and pass it to <DownloadCSV /> component prop
  const tableDataForExport = useSelector(state => state.tableDataForExport.selectedTableRows)

  const handleSwitchChartOrTable = () => {
    tableOrChartBtn.table ? 
    setTableOrChartBtn({
      table: false,
      chart: true,
      text: 'DU-MĂ LA TABEL'
    })
    : 
    setTableOrChartBtn({
      table: true,
      chart: false,
      text: 'DU-MĂ LA GRAFIC'
    })
  }
  
  const displaySnackBar = () => {
    if (presenceData.length === 0) {
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
          text: 'No Presence Data for the selected search criteria',
          upDuration: 4000
        })
      }
    } else {
      setSnackBar({
        background: '#28cc95',
        open: true,
        text: 'Data Loaded',
        upDuration: 500
      })
    }
  }

  useEffect(() => {
    displaySnackBar()
  }, [presenceData])

  return (
    <>
      { hasViewPermission ?
        <div className="administrare-cursanti d-flex flex-column align-items-center justify-content-between">

          <NoPermissionBanner permissions={permissions} />

          <div className="p-3 chart-table-btn align-self-start">
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
              <div className='action-buttons-section'>
                <h5> Cursanți prezenți per curs </h5>
                <div className='action-buttons'>
                  <Button 
                    className={localStyles.button}
                    variant="contained"
                    onClick={() => setOpenChangeSearchDataDialog(!openChangeSearchDataDialog)}
                    disabled={!hasEditPermission}>
                  Schimbă Datele
                  </Button>
                  <DownloadCSV
                    data={tableDataForExport}
                    tableTitle='CursantiPrezentiPerCurs'
                    exportPermission={hasExportCSVPermission}
                    CSVheaders={CSVheaders}
                  /> 
                </div>
              </div>

              { coursesList.length !== 0 &&
                <div className='cursanti-prezenti-per-curs'>
                  <p> Date extrase pentru cursul:
                    <span className='mx-1 fw-bold'>
                      { selectedSearchData.course ? selectedSearchData.course : coursesList[0].courseName }
                    </span>
                  </p>
                  <p> aferente lunii,
                    <span className='mx-1 fw-bold'>
                      { selectedSearchData.date ? selectedSearchData.date : today_ro_format }
                    </span> 
                  </p>
                </div>
              }

              { openChangeSearchDataDialog &&
                <GetNewPresenceDataDialog 
                  openDialog={openChangeSearchDataDialog} 
                  closeDialog={setOpenChangeSearchDataDialog}
                  coursesListNames={coursesList}
                  selectedData={setSelectedSearchData}
                  limitedAccessOnPastData={viewPastDataLimit}
                  userTablePermissions={userTablePermissions}
                />
              }

              <div className="px-3 pb-5" style={{width: '100%'}}>
                <Table 
                  tableTitle={chartTableTitles.cursanti_prezenti}
                  courses={coursesList}
                  tableColumns={tableColumns} 
                  tableData={setupDataForTableCoursePresence(presenceData, tableColumns)} />
              </div>
            </>
          }

          { tableOrChartBtn.chart &&
            <div className="charts">
              <section className="bar-chart">
                <BarChart data={setupDataForBarChartCoursePresence(presenceData)} />
              </section>

              <section className="pie-chart">
                <RoundChart data={setupDataForPieChartCoursePresence(presenceData)} />
              </section>
            </div>
          }

          { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
        </div>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default CursantiPrezentiPerCurs
