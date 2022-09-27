import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { doesUserHavePermission } from '../../../utils/helperFunctions';
import { fetchStudentsByCourseNameAndCareer,
  clearStudentsInCoursesMod1State } from '../../../redux/actions/registeredStudentsActions';
import { fetchCoursesModule1 } from '../../../redux/actions/coursesActions/coursesModule1';
import { makeStyles } from '@material-ui/styles';
import { chartTableTitles } from '../../../constants/chartTableTitlesConstants';
import { setupDataForTableStudentPerCourse, setupDataForChart } from '../helperMethods';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import Button from '@material-ui/core/Button';
import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';
import TableChartRoundedIcon from '@material-ui/icons/TableChartRounded';
import GetNewStudentDataDialog from './GetNewStudentDataDialog';
import tableColumns from './columns';
import NoAccessPage from '../../../components/NoAccessPage';
import SnackBar from '../../../components/ReusableComponents/SnackBar';
import DownloadCSV from "../../../components/ReusableComponents/Table/DownloadCSV";
import Table from '../../../components/ReusableComponents/Table/Table';
import LineChart from '../../../components/ReusableComponents/LineChart';

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

const CursantiPerCurs = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()
  const today = dayjs().format().substring(0, 7)
  const today_ro_format = dayjs().locale('ro').format('LL').substring(3)
  const route = useLocation()
  const { pathname } = route

  const getUserPagesAccessFromStore = useSelector(state => state.authReducer.pagesPermission)
  const userHasPermission = doesUserHavePermission(pathname, getUserPagesAccessFromStore)

  useEffect( () => {
    setShowPlaceholder(false)
    if (userHasPermission) {
      dispatch(fetchCoursesModule1())
    }
  }, [])

  const [tableOrChartBtn, setTableOrChartBtn] = useState({
    table: true,
    chart: false,
    text: 'DU-MĂ LA GRAFIC'
  })
  const [openChangeSearchDataDialog, setOpenChangeSearchDataDialog] = useState(false)
  const [selectedSearchData, setSelectedSearchData] = useState({ date: null, course: null })
  const [snackBar, setSnackBar] = useState({})

  // get Courses MODULE 1 from Store
  const coursesList = useSelector(state => {
    let list = state.coursesModule1.courses
    list = list.map(course => ({id: nanoid(5), courseName: course.courseTitle}))
    return list
  })

  /* populate Table with data for current month at component mount
   * data used for the api call: studentCareer, courseName, registrationYearMonth
   */
  useEffect(() => {
    if (userHasPermission) {
      const payload = {}
      if (coursesList.length !== 0) {
        Object.assign(payload, {
          career: 'angajat',
          courseName: coursesList[0].courseName,
          registrationYearMonth: today
        })      
      }
      dispatch(fetchStudentsByCourseNameAndCareer(payload))
    }
  }, [])

  // get Students registered at Courses MODULE 1 from Store
  const getDataFromStore = useSelector(state => ({
    allData: state.registeredStudentsModule1.students,
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
                <h5> Cursanți înscriși per curs </h5>
                <div className='action-buttons'>
                  <Button 
                    className={localStyles.button}
                    variant="contained"
                    onClick={() => setOpenChangeSearchDataDialog(!openChangeSearchDataDialog)} >
                  Schimbă Datele
                  </Button>
                  <DownloadCSV data={tableDataForExport} tableTitle='CursantiInscrisiPerCurs' /> 
                </div>
              </div>

              { coursesList.length !== 0 &&
                <div className='cursanti-inscrisi-per-curs'>
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
                <GetNewStudentDataDialog 
                  openDialog={openChangeSearchDataDialog} 
                  closeDialog={setOpenChangeSearchDataDialog}
                  coursesListNames={coursesList}
                  selectedSearchData={setSelectedSearchData}
                />
              }
        
              <div className="px-3 pb-5" style={{width: '100%'}}>
                <Table 
                  tableTitle={chartTableTitles.cursanti_inscrisi_curs} 
                  tableColumns={tableColumns} 
                  tableData={setupDataForTableStudentPerCourse(getDataFromStore)} />
              </div>
            </>
          }

          { tableOrChartBtn.chart &&
            <LineChart 
              chartTitle={chartTableTitles.cursanti_inscrisi_curs}
              chartData={setupDataForChart(getDataFromStore)}
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

export default CursantiPerCurs
