import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appPagesConstants } from '../../constants/userPermissions';
import { doesUserHaveViewPermission, extractStudentNameAndEmail } from '../../utils/helperFunctions';
import { clearSingleStudentData } from '../../redux/actions/studentsActions';
import { makeStyles } from '@material-ui/styles';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SearchStudent from '../../components/UnsubscribeStudent/SearchStudent';
import StudentInCoursesModule1 from '../../components/SearchStudentData/StudentInCoursesModule1';
import StudentInCoursesModule2 from '../../components/SearchStudentData/StudentInCoursesModule2';
import StudentPresenceInCoursesModule1 from '../../components/SearchStudentData/StudentPresenceInCoursesModule1';
import UnsubscribeStudentButton from '../../components/UnsubscribeStudent/UnsubscribeStudentButton';
import DeleteStudentButton from '../../components/UnsubscribeStudent/DeleteStudentButton';
import NoAccessPage from '../../components/NoAccessPage';
import SnackBar from '../../components/ReusableComponents/SnackBar';
import Divider from '@material-ui/core/Divider';
import dayjs from 'dayjs'

console.log(dayjs().subtract(7, 'days').format())

const useStyles = makeStyles({
  textField: {
    width: '100%',
    marginBottom: '1rem !important',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(10px, 5px) scale(0.75)'
    },
    "& .MuiFormLabel-root": {
      color: 'white'
    },
    "& .MuiInputBase-root": {
      color: 'black'
    }
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#509ecc', 
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    transition: '.5s ease all',
    "&:hover": {
      backgroundColor: '#c23a6a',
      transition: '.5s ease all'
    }
  },
})

const DezabonareCursanti = ({setShowPlaceholder}) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.DEZABONARE_STERGERE_CURSANTI, userPagesAccessFromStore)

  const studentData = useSelector(state => ({
    data: state.students.singleStudent.data,
    success: state.students.singleStudent?.success,
    error: state.students.singleStudent?.error
  }))
  const { data, success, error } = studentData

  const studentNameAndEmail = extractStudentNameAndEmail(data)

  useEffect(() => {
    setShowPlaceholder(false)

    return () => dispatch(clearSingleStudentData())
  }, [])

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
    <> 
      { hasViewPermission ?
        <div className='dezabonare-stergere-cursant'>

          <div className='top-section'>
            <h6 className='fs-5 mb-0'>
              DEZABONARE  /  ȘTERGERE CURSANT
            </h6>
          </div>

          <Divider style={{background: 'black'}} />

          <div className='bottom-section mt-4'>
            <div className='search-student-section'>
              <SearchStudent localStyles={localStyles} />
              
              {/* Show Unsubscribe and Delete Student Buttons only if Student was found */}
              { (data && success) &&
                <div>
                  <UnsubscribeStudentButton
                    localStyles={localStyles}
                    studentEmail={studentNameAndEmail.split('-')[1].trim()}
                  />
          
                  <DeleteStudentButton
                    localStyles={localStyles}
                    studentEmail={studentNameAndEmail.split('-')[1].trim()}
                  />
                </div>
              }
            </div>

            { (data && success) &&
              <div className='searched-student-section'>
                <div className='student-name-and-email'>
                  <AssignmentIndIcon className='me-2' />
                  <h6 className='m-0'> { studentNameAndEmail } </h6>
                </div>
                <div className='ps-3 pe-3 show-student-data'>
                  <StudentInCoursesModule1 />
                  <Divider style={{background: 'white'}} className='mt-3' />
                  <StudentInCoursesModule2 />
                  <Divider style={{background: 'white'}} className='mt-3' />
                  <StudentPresenceInCoursesModule1 />
                </div>
              </div>
            }

            { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }  
          </div>
        </div>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default DezabonareCursanti
