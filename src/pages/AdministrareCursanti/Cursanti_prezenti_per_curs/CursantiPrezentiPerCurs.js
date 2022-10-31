import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { makeStyles } from '@material-ui/styles';
import { chartTableTitles } from '../../../constants/chartTableTitlesConstants';
import { appPagesConstants } from '../../../constants/userPermissions';
import { doesUserHaveViewPermission, doesUserHaveEditPermission,
  doesUserHaveMonthlyCSVExportPermission, doesUserHaveWhatsappCSVExportPermission, 
  checkUserAccessOnPastDataLimit, createTableColumnsAccordingToPermission,
  createMonthlyCSVheadersAccordingToPermission, extractUserTablePermissions,
  createWhatsappExportCSVheaders } from '../../../utils/helperFunctions';
import { fetchStudentsPresenceByCourseName,clearStudentsPresence,
  fetchStudentsWhatsappNumbers } from '../../../redux/actions/studentsActions';
import { storeStudentsWhatsappNumbersExportData } from '../../../redux/actions/cvsExportActions';
import { clearCoursesModule1 } from '../../../redux/actions/coursesActions';
import { setupDataForTableCoursePresence, setupDataForBarChartCoursePresence, 
  setupDataForPieChartCoursePresence } from '../helperMethods';
import dayjs from 'dayjs';
import Button from '@material-ui/core/Button';
import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';
import TableChartRoundedIcon from '@material-ui/icons/TableChartRounded';
import GetNewPresenceDataDialog from './GetNewPresenceDataDialog';
import NoAccessPage from '../../../components/NoAccessPage';
import NoPermissionBanner from '../../../components/ReusableComponents/Banners/NoPermissionBanner';
import CSVExport from "../../../components/ReusableComponents/CSVExport/CSVExport";
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
  const monthlyCSVheaders = createMonthlyCSVheadersAccordingToPermission(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)
  const hasEditPermission = doesUserHaveEditPermission(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)
  const hasMonthlyExportCSVPermission = doesUserHaveMonthlyCSVExportPermission(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)
  const hasWhatsappExportCSVPermission = doesUserHaveWhatsappCSVExportPermission(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)
  const whatsappCSVheaders = createWhatsappExportCSVheaders()
  const permissions = {edit: hasEditPermission, export: hasMonthlyExportCSVPermission}
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

  const callStudentsWhatsappNumbers = async (body) => {
    const response = await dispatch(fetchStudentsWhatsappNumbers(body))
    console.log('response', response)
    dispatch(storeStudentsWhatsappNumbersExportData(response))
  }

  // fetch All Courses MODULE 1
  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      dispatch(fetchStudentsPresenceByCourseName())
    }
    if (hasWhatsappExportCSVPermission) {
      callStudentsWhatsappNumbers()
    }

    return () => {
      dispatch(clearCoursesModule1())
      dispatch(clearStudentsPresence())
    }
  }, [])

  // get the Courses MODULE 1 from Store
  const coursesList = useSelector(state => {
    let list = state.courses.module1.data
    list = list.map(course => ({id: nanoid(5), courseName: course.courseTitle}))
    return list
  })

  // get students presence data at Courses Module 1 from store
  const studentsPresenceAtCourse = useSelector(state => ({
    presenceData: state.students.presenceAtCourseMod1.data,
    error: state.students.presenceAtCourseMod1?.error
  }))
  const { presenceData, error } = studentsPresenceAtCourse

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
                  <CSVExport
                    dataType="monthly"
                    buttonLabel='Export CSV - Monthly'
                    CSVfileName='CursantiPrezentiPerCurs'
                    exportPermission={hasMonthlyExportCSVPermission}
                    CSVheaders={monthlyCSVheaders}
                  />
                  <CSVExport
                    dataType="whatsapp-present"
                    buttonLabel='Export CSV - Whatsapp (Prezenți)'
                    CSVfileName='NrTelWhatsapp-Prezenti'
                    exportPermission={hasWhatsappExportCSVPermission}
                    CSVheaders={whatsappCSVheaders}
                  />
                  <CSVExport
                    dataType="whatsapp-absent"
                    buttonLabel='Export CSV - Whatsapp (Absenți)'
                    CSVfileName='NrTelWhatsapp-Absenti'
                    exportPermission={hasWhatsappExportCSVPermission}
                    CSVheaders={whatsappCSVheaders}
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
                  callStudentsWhatsappNumbers={callStudentsWhatsappNumbers}
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
