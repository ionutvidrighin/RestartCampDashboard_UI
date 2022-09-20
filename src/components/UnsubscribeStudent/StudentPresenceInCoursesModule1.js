import React from 'react';
import { useSelector } from "react-redux";
import dayjs from 'dayjs';
import 'dayjs/locale/ro';

const StudentPresenceInCoursesModule1 = () => {

  const studentData = useSelector(state => state.unsubscribeOrRemoveStudentReducer.studentData.studentPresenceInCoursesModule1)

  return (
    
    <div style={{width: '100%', marginTop: '1rem'}}>
      <h6 className='text-decoration-underline'>Date în Prezență Cursuri Modul 1:</h6>
      { studentData.length !== 0 ?
        <div>
          { studentData.map((element, index) => {
            const itemNo = index+1;
            const studentRegistrationDate = dayjs(element.registrationDate).locale('ro').format('LL')
            const courseDate = dayjs(element.course.date).locale('ro').format('LL')
            return (
              <p key={element.id} className='mb-2 student-registration-details'>
                {itemNo}. Înscris pentru confirmare prezență la data de 
                <span className='fw-bold' style={{color: '#f5aa42'}}> {studentRegistrationDate} </span> 
                pentru cursul
                <span className='fw-bold' style={{color: '#f5aa42'}}> {element.course.title} </span>
                din data de
                <span className='fw-bold' style={{color: '#f5aa42'}}> {courseDate}</span>.
              </p>
            )
          })}
        </div>
        :
        <>
          <h6 style={{color: '#ff564a'}}>Nu există date</h6>
        </>
      }
    </div>
  )
}

export default StudentPresenceInCoursesModule1
