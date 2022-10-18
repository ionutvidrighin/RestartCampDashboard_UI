import React from 'react';
import { useSelector } from "react-redux";
import dayjs from 'dayjs';
import 'dayjs/locale/ro';

const StudentInCoursesModule2 = () => {

  const studentData = useSelector(state => state.students.singleStudent.data)

  return (
    <div style={{width: '100%', marginTop: '1rem'}}>
      <h6 className='text-decoration-underline'>Date în Cursuri Modul 2:</h6>
      { studentData.studentInCoursesModule2.length !== 0 ?
        <div className='student-in-courses-module2'>
          { studentData.studentInCoursesModule2.map((element, index) => {
            const itemNo = index+1;
            const studentRegistrationDate = dayjs(element.registrationDate).locale('ro').format('LL')
            const courseDate = dayjs(element.course.date).locale('ro').format('LL')
            return (
              <div key={element.id}>
                <p className='mb-2 student-registration-details'>
                  {itemNo}. Înscris pe data de 
                  <span className='fw-bold' style={{color: '#16ab7e'}}> {studentRegistrationDate} </span> 
                  la cursul
                  <span className='fw-bold'> {element.course.title} </span>
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

export default StudentInCoursesModule2
