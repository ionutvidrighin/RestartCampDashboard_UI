import React from 'react';
import { useSelector } from "react-redux";
import dayjs from 'dayjs';
import 'dayjs/locale/ro';

const StudentPresenceInCoursesModule1 = () => {

  const studentData = useSelector(state => state.students?.singleStudent?.data?.studentPresenceInCoursesModule1)

  return (
    <div style={{width: '100%', marginTop: '1rem'}}>
      <h6 className='text-decoration-underline'>Date în Prezență Cursuri Modul 1:</h6>
      { studentData ?
        <div>
          { studentData.map((element, index) => {
            const itemNo = index+1;
            const studentRegistrationDate = dayjs(element.registrationDate).locale('ro').format('LL')
            const courseDate = dayjs(element.courseName.date).locale('ro').format('LL')
            return (
              <div key={element.id}>
                <p className='mb-2 student-registration-details'>
                  {itemNo}. Înscris pentru confirmare prezență la data de 
                  <span className='fw-bold' style={{color: '#16ab7e'}}> {studentRegistrationDate} </span> 
                  pentru cursul
                  <span className='fw-bold'> {element.courseName.title} </span>
                  din data de
                  <span className='fw-bold' style={{color: '#16ab7e'}}> {courseDate}</span>.
                </p>
                <p className='m-0'> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>
              </div>
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
