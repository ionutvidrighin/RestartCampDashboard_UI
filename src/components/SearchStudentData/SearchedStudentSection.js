import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { extractStudentNameAndEmail } from '../../utils/helperFunctions';
import { clearSingleStudentData } from '../../redux/actions/studentsActions';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import StudentInCoursesModule1 from './StudentInCoursesModule1';
import StudentInCoursesModule2 from './StudentInCoursesModule2';
import StudentPresenceInCoursesModule1 from './StudentPresenceInCoursesModule1';
import SnackBar from '../ReusableComponents/SnackBar';

const SearchedStudentSection = () => {
  const dispatch = useDispatch()

  const studentData = useSelector(state => ({
    data: state.students.singleStudent.data,
    success: state.students.singleStudent?.success,
    error: state.students.singleStudent?.error
  }))
  const { data, success, error } = studentData
  const studentName = extractStudentNameAndEmail(data)

  const [snackBar, setSnackBar] = useState({})
  useEffect(() => {
    if (error) {
      setSnackBar({
        background: '#e53c5d',
        open: true,
        text: error,
        upDuration: 12000
      })
      dispatch(clearSingleStudentData())
    }
  }, [error])

  return (
    <div className='searched-student-data ms-2'>
      <div className='d-flex flex-column'>
        { data ?
          <>
            { (data && success) &&
              <div className='all-student-data' style={{backgroundColor: '#fafafa'}}>
                <div className='d-flex align-items-center mt-2 mb-4'>
                  <AssignmentIndIcon className='me-2' />
                  <span> { studentName } </span>
                </div>

                <StudentInCoursesModule1 />
                <Divider style={{background: 'white'}} className='mt-3' />
                <StudentInCoursesModule2 />
                <Divider style={{background: 'white'}} className='mt-3' />
                <StudentPresenceInCoursesModule1 />
              </div>
            }
          </>
          :
          <div className='mt-5 d-flex flex-column'>
            <CircularProgress disableShrink style={{color: 'white'}} className='align-self-center'/>
            <h6 className='text-center mt-3'>Căutare cursant în așteptare...</h6>
          </div>
        }

        { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }  
      </div>
    </div>
  )
}

export default SearchedStudentSection
