import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { fetchStudentsPresenceByCourseName } from '../../../redux/actions/studentsActions';
import { calculateMonthsDifference } from '../../../utils/helperFunctions';
import Dialog from '@material-ui/core/Dialog';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Button from '@material-ui/core/Button';
import SnackBar from '../../../components/ReusableComponents/SnackBar';
import dayjs from 'dayjs';

const GetNewPresenceDataDialog = ({openDialog, closeDialog , coursesListNames, selectedData, limitedAccessOnPastData, userTablePermissions}) => {
  const dispatch = useDispatch()
  const today = dayjs().format().substring(0, 7)

  const handleCloseDialog = () => {
    closeDialog(false)
  }

  const [snackBar, setSnackBar] = useState({})
  const [coursesNames, setCoursesNames] = useState(coursesListNames)
  const [registrationDate, setRegistrationDate] = useState(today)

  const handleCourseSelect = (selectedCourse) => {
    let coursesList = [...coursesNames]
    coursesList = coursesList.map(element => ({...element, selected: false}))
    const courseToUpdate = coursesList.findIndex(course => course.id === selectedCourse.id)
    coursesList[courseToUpdate].selected = true
    setCoursesNames(coursesList)
  }

  const handleDateSelect = (date) => {
    setRegistrationDate(date)
  }

  const handleGenerateNewData = () => {
    const selectedCourse = coursesNames.find(course => course.selected)
    const selectedDate = registrationDate

    if (selectedCourse === undefined || registrationDate === null || registrationDate === "" ) {
      setSnackBar({
        ...snackBar,
        background: '#e43d6f', 
        open: true, 
        text: "Nume Curs sau Dată Curs neselectate."
      })
      return
    }

    if ( dayjs(registrationDate).isAfter(dayjs()) ) {
      setSnackBar({
        ...snackBar,
        background: '#e43d6f', 
        open: true, 
        text: "Data nu poate fi in viitor."
      })
      return
    }

    const dateSelected = new Date(selectedDate)
    const currentDate = new Date()
    const dateDifference = calculateMonthsDifference(dateSelected, currentDate)
    if (limitedAccessOnPastData !== "unlimited") {
      if (dateDifference >= limitedAccessOnPastData) {
        setSnackBar({
          background: '#e43d6f', 
          open: true,
          success: false,
          upDuration: 12000,
          text: `Datele mai vechi de ${limitedAccessOnPastData} luni nu pot fi generate. 
                Te rog contactează administratorul pentru mai multe detalii.`
        })
        return
      }
    }

    const payload = {
      courseName: selectedCourse.courseName,
      registrationYearMonth: selectedDate,
      userTablePermissions
    }

    dispatch(fetchStudentsPresenceByCourseName(payload))

    selectedData({
      course: selectedCourse.courseName,
      date: selectedDate
    })

    handleCloseDialog()
  }

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={openDialog}>
        <div className='d-flex justify-content-between p-3'>
          <h6 className='text-uppercase mb-3'>Criterii generare date</h6>
          <CancelRoundedIcon onClick={handleCloseDialog} style={{cursor: 'pointer'}} />
        </div>
        <div className='get-student-data-by-course-name-dialog'>
          <div>
            <p className='criteria-name'>Nume curs :</p>
            <div className='search-criteria courses-list'>
              { coursesNames.length !== 0 && coursesNames.map(course => (
                <p key={course.id} 
                  className={`${course.selected && 'selected'}`}
                  onClick={() => handleCourseSelect(course)}>
                  {course.courseName}
                </p>
              ))}
            </div>

            <p className='criteria-name'>Lună și An înscriere :</p>
            <div className='search-criteria'>
              <input
                type="month" 
                defaultValue={today} 
                onChange={e => handleDateSelect(e.target.value)} 
                className="me-2"
              />
            </div>
          </div>

          <div className='d-flex flex-column'>
            <Button autoFocus onClick={handleGenerateNewData} className='mt-2 fw-bold submit-btn'>
              Generează noile date
            </Button>
          </div>
        </div>
      </Dialog>

      { snackBar.open &&
        <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} />
      }
    </div>
  )
}

export default GetNewPresenceDataDialog
