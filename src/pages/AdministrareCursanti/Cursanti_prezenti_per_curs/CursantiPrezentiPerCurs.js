import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesModule1 } from "../../../redux/actions/coursesActions/coursesModule1";
import { fetchStudentsPresenceByCourseName } from '../../../redux/actions/coursesActions/coursesPresenceModule1';
import { nanoid } from 'nanoid';
import { makeStyles } from '@material-ui/styles';
import { chartTableTitles } from '../../../constants/chartTableTitlesConstants';
import { doesUserHavePermission } from '../../../utils/helperFunctions';
import { setupDataForTableCoursePresence, setupDataForBarChartCoursePresence, 
  setupDataForPieChartCoursePresence } from '../helperMethods';
import GetNewPresenceDataDialog from './GetNewPresenceDataDialog';
import Button from '@material-ui/core/Button';
import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';
import TableChartRoundedIcon from '@material-ui/icons/TableChartRounded';
import tableColumns from './columns';
import DownloadCSV from "../../../components/ReusableComponents/Table/DownloadCSV";
import Table from '../../../components/ReusableComponents/Table/Table';
import BarChart from '../../../components/ReusableComponents/barChart';
import RoundChart from '../../../components/ReusableComponents/pieChart';
import dayjs from 'dayjs';
import NoAccessPage from '../../../components/NoAccessPage';

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
  const route = useLocation()
  const { pathname } = route
  const today = dayjs().format().substring(0, 7)
  const today_ro_format = dayjs().locale('ro').format('LL').substring(3)

  const getUserPagesAccessFromStore = useSelector(state => state.authReducer.pagesPermission)
  const userHasPermission = doesUserHavePermission(pathname, getUserPagesAccessFromStore)

  const [tableOrChartBtn, setTableOrChartBtn] = useState({
    table: true,
    chart: false,
    text: 'DU-MĂ LA GRAFIC'
  })
  const [openChangeSearchDataDialog, setOpenChangeSearchDataDialog] = useState(false)
  const [selectedSearchData, setSelectedSearchData] = useState({ date: null, course: null })

  // fetch All Courses MODULE 1
  useEffect(() => {
    setShowPlaceholder(false)
    if (userHasPermission) {
      dispatch(fetchCoursesModule1())
    }
  }, [])

  // get the Courses MODULE 1 from Store
  let coursesFromStore;
  coursesFromStore = useSelector(state => state.coursesModule1.courses)
  coursesFromStore = coursesFromStore.map(course => ({id: nanoid(5), courseName: course.courseTitle}))

  //populate Table with data for current month at component mount
  useEffect(() => {
    if (userHasPermission) {
      const payload = {}
      if (coursesFromStore.length !== 0) {
        Object.assign(payload, {
          courseName: coursesFromStore[0].courseName,
          registrationYearMonth: today
        }) 
        dispatch(fetchStudentsPresenceByCourseName(payload))
      }
    }
  }, [coursesFromStore.length !== 0])

  // get the Course MODULE 1 Presence Data from Store
  const coursePresenceData = useSelector(state => state.coursePresence.presence)

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

  return (
    <>
      { userHasPermission ?
        <div className="administrare-cursanti d-flex flex-column align-items-center justify-content-between">
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
                    >
                  Schimbă Datele
                  </Button>
                  <DownloadCSV data={tableDataForExport} tableTitle='CursantiPrezentiPerCurs' /> 
                </div>
              </div>

              { coursesFromStore.length !== 0 &&
                <div className='cursanti-prezenti-per-curs'>
                  <p> Date extrase pentru cursul:
                    <span className='mx-1 fw-bold'>
                      { selectedSearchData.course ? selectedSearchData.course : coursesFromStore[0].courseName }
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
                  coursesListNames={coursesFromStore}
                  selectedData={setSelectedSearchData}
                />
              }

              <div className="px-3 pb-5" style={{width: '100%'}}>
                <Table 
                  tableTitle={chartTableTitles.cursanti_prezenti}
                  courses={coursesFromStore}
                  tableColumns={tableColumns} 
                  tableData={setupDataForTableCoursePresence(coursePresenceData)} />
              </div>
            </>
          }

          { tableOrChartBtn.chart &&
            <div className="charts">
              <section className="bar-chart">
                <BarChart data={setupDataForBarChartCoursePresence(coursePresenceData)} />
              </section>

              <section className="pie-chart">
                <RoundChart data={setupDataForPieChartCoursePresence(coursePresenceData)} />
              </section>
            </div>
          }
        </div>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default CursantiPrezentiPerCurs
