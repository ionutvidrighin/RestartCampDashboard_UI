import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { fetchStudentsByCourseNameAndCareer } from '../../../redux/actions/registeredStudentsActions';
import Dialog from '@material-ui/core/Dialog';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Button from '@material-ui/core/Button';
import SnackBar from '../../../components/ReusableComponents/SnackBar';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';


const GetNewStudentDataDialog = ({openDialog, closeDialog, coursesListNames, selectedSearchData}) => {
  const dispatch = useDispatch()
  const today = dayjs().format().substring(0, 7)

  const handleCloseDialog = () => {
    closeDialog(false)
  }

  const [snackBar, setSnackBar] = useState({})
  const [studentCareer, setStudentCareer] = useState([
    { 
      id: nanoid(4),
      label: 'Angajat',
      type: 'angajat',
      selected: false
    },
    {
      id: nanoid(4),
      label: 'Antreprenor',
      type: 'antreprenor',
      selected: false
    }
  ])
  const [coursesNames, setCoursesNames] = useState(coursesListNames)
  const [registrationDate, setRegistrationDate] = useState(today)

  const handleStudentCareerSelect = (selectedCareer) => {
    let careerList = [...studentCareer]
    careerList = careerList.map(element => ({...element, selected: false}))
    const careerToUpdate = careerList.findIndex(career => career.id === selectedCareer.id)
    careerList[careerToUpdate].selected = true
    setStudentCareer(careerList)
  }

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
    const selectedCareer = studentCareer.find(career => career.selected)
    const selectedCourse = coursesNames.find(course => course.selected)
    const selectedDate = registrationDate

    if (selectedCareer === undefined || selectedCourse === undefined || registrationDate === null || registrationDate === "") {
      setSnackBar({
        ...snackBar,
        background: '#e43d6f', 
        open: true, 
        text: "Carieră Cursant, Nume Curs sau Dată înscriere neselectate."
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

    const payload = {
      career: selectedCareer.type,
      courseName: selectedCourse.courseName,
      registrationYearMonth: selectedDate
    }

    dispatch(fetchStudentsByCourseNameAndCareer(payload))

    selectedSearchData({
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
            <p className='criteria-name'>Carieră cursant :</p>
            <div className='search-criteria'>
              { studentCareer.map(student => (
                <p key={student.id}
                  className={`${student.selected && 'selected'}`}
                  onClick={() => handleStudentCareerSelect(student)}>
                  {student.label}
                </p>
              ))}
            </div>

            <p className='criteria-name'>Nume curs :</p>
            <div className='search-criteria courses-list'>
              { coursesListNames.length !== 0 && coursesNames.map(course => (
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

export default GetNewStudentDataDialog
