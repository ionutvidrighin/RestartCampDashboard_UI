import React from 'react';
import { useSelector } from "react-redux";
import { getStudentNameAndEmail } from './helperMethods';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import StudentInCoursesModule1 from './StudentInCoursesModule1';
import StudentInCoursesModule2 from './StudentInCoursesModule2';
import StudentPresenceInCoursesModule1 from './StudentPresenceInCoursesModule1';

const SearchedStudentSection = () => {

  const studentData = useSelector(state => state.unsubscribeOrRemoveStudentReducer.studentData)
  const studentName = getStudentNameAndEmail(studentData)

  return (
    <div className='searched-student-data ms-2'>
      <div className='d-flex'>
        <DataUsageIcon />
        <h6 className='ms-3'>DATE CURSANT</h6>
      </div>
      <div className='d-flex flex-column'>
        { Object.keys(studentData).length !== 0 ?
          <>
            { studentData.hasOwnProperty('error') &&
              <>
                <h5 className='mt-3' style={{color: '#ff564a'}}>{studentData.error}</h5>
              </>
            }
            { !studentData.hasOwnProperty('error') && !studentData.hasOwnProperty('message') &&
              <>
                <div className='d-flex align-items-center mt-2'>
                  <AssignmentIndIcon className='me-2' />
                  <span> { studentName } </span>
                </div>

                <StudentInCoursesModule1 />
                <Divider style={{background: 'white'}} className='mt-3' />
                <StudentInCoursesModule2 />
                <Divider style={{background: 'white'}} className='mt-3' />
                <StudentPresenceInCoursesModule1 />
              </>
            }

            { studentData.hasOwnProperty('message') &&
              <>
                <h5 className='mt-3' style={{color: '#ff564a'}}>{studentData.message}</h5>
              </>
            }
          </>
          :
          <>
            <CircularProgress disableShrink style={{color: 'white'}} className='align-self-center'/>
            <h6 className='text-center mt-3'>Căutare cursant în așteptare...</h6>
          </>
        }       
      </div>
    </div>
  )
}

export default SearchedStudentSection
