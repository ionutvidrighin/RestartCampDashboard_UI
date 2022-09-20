import React from 'react';
import ShowCourseRecurrenceDays from '../ReusableComponents/ShowCourseRecurrenceDays';
import { RRule } from 'rrule';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/ro';
dayjs.extend(weekday)


//*** styling for inactive Mask applied when course is DEACTIVATED
const cardStyles = {
  inactiveMask: {
    zIndex: '5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: '5px',
    inactiveCourseFlag: {
      transform: 'rotate(50deg)',
      padding: '3px 5px',
      width: '100%',
      height: 'fit-content',
      color: '#d1d1d1',
      fontSize: '.85rem',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'rgba(222, 38, 108, 0.5)',
      borderRadius: '5px'
    }
  }
}

const CourseModule2Card = ({
  className, // classname to override the default styling currently set to *free-course-card* class (see the scss file for it)
  courseLogoClass, // classname to override the default styling to course logo (ex. different width/hight of the image) 
  courseLogo, // Link address to an image. String as "https://image.com"
  coursePriceLogo, // Link address to an image. String as "https://image.com"
  courseLink, // Link address to a page with course details expanded. String as "https://course.com"
  courseTitle, // String. Mentioning Course title.
  courseDate, // Date String, as "2022-03-02T18:30"
  courseWeekDays, // Array of Objects, as [{day: 0, name: Monday}]
  courseRecurrence, // String, as "2", "4", "6", "8" - defines course repetitive interval ("2" - repeats once every 2 weeks; "4" - repeats once every 4 weeks and so on). 
  courseActive, // Boolean. Reveals if course is active or inactive (when inactive, is hidden from the webpage)
  showCourseRecurrence // Boolean state passed from parent. Reveals <ShowCourseRecurrenceDays/> component, showing all days when the course will take place
}) => {

  let courseFrequency;
  let courseInterval;
  switch(courseRecurrence) {
    case '2':
      courseFrequency = RRule.WEEKLY
      courseInterval = 2;
      break;
    case '4':
      courseFrequency = RRule.WEEKLY
      courseInterval = 4;
      break;
    case '6':
      courseFrequency = RRule.WEEKLY
      courseInterval = 6;
      break;
    case '8':
      courseFrequency = RRule.WEEKLY
      courseInterval = 8;
      break;
    default:
      courseFrequency = RRule.WEEKLY
      courseInterval = 1;
  }

  let rawRecurrenceDaysCopy = [] // this is populated and passed to <ShowCourseRecurrenceDays/> component as data
  let copiedRecurrenceArray = [] // this is populated to be used and manipulated throught the code logic
  let integerCourseWeekDays = [] // populating this array by extracting the "day" property (number) from each entry of *courseWeekDays* 

  if (courseWeekDays !== undefined) {
  
    // this will be an array, like: [0, 1]; where 0 is Monday, 1 is Tuesday and so on
    // it will be passed to the Recurrence rule, to repeat the course in several days of the same week
    integerCourseWeekDays = courseWeekDays.map(element => element.day)
    
    const rule = new RRule({
      freq: courseFrequency,
      dtstart: new Date(courseDate),
      count: 100,
      interval: courseInterval,
      byweekday: integerCourseWeekDays
    })

    let allRecurrence = rule.all()
    rawRecurrenceDaysCopy = [...allRecurrence] // needed to be passed to <ShowCourseRecurrenceDays /> component
    copiedRecurrenceArray = [...allRecurrence] // needed to be manipulated and used down the logic
  }
  
  // remove all past days (as compared to TODAY) from the recurrence list
  copiedRecurrenceArray = copiedRecurrenceArray.filter(entry => {
    return !dayjs(entry).isBefore(dayjs())
  })

  // course Year and Month
  const COURSE_YEAR = dayjs(copiedRecurrenceArray[0]).locale('ro').format('LL').split(' ')[2]
  const COURSE_MONTH = dayjs(copiedRecurrenceArray[0]).locale('ro').format('LL').split(' ')[1]

  // course Weekday Names
  const COURSE_WEEKDAYS = courseWeekDays.map(day => day.name).join(', ')

  // course Hour
  const COURSE_HOUR = dayjs(copiedRecurrenceArray[0]).locale('ro').format('LLL').slice(-5)

  return (
    <>
    { showCourseRecurrence &&
      <ShowCourseRecurrenceDays data={rawRecurrenceDaysCopy} />
    }

    { !showCourseRecurrence &&
      <div className={`paid-course-card d-flex flex-column ${className}`}>
        { !courseActive && 
          <div style={cardStyles.inactiveMask}>
            <p className="m-0" style={cardStyles.inactiveMask.inactiveCourseFlag}> 
              CURS INACTIV 
            </p>
          </div>
        }

        <section className={`paid-course-card-logo ${courseLogoClass}`}>
          <img src={courseLogo} alt="paidcourse-logo" />
          <img src={coursePriceLogo} alt="course-price" />
        </section>

        <section className="course-link d-flex justify-content-center">
          <a href={courseLink} target="_blank" rel="noreferrer">
            <button>
              inscriere & detalii
            </button>  
          </a>
        </section>

        <div className='course-title mt-2'>
          <p className="m-0 fw-bold mb-1"> POȚI PARTICIPA LA: </p>
          <p className="m-0"> {courseTitle} </p>
        </div>

        <section className='course--date text-center'>
          <p className='m-0 text-uppercase'> 
            {/* Course weekday names here */}
            { COURSE_WEEKDAYS }
          </p>
          <p className='m-0'>
            {/* Course days here (as Number/Integer) */}
            { integerCourseWeekDays.map((day, index) => (
              <span key={index}> { `${dayjs(copiedRecurrenceArray[index]).date()} - ` } </span>
              )
            )}
            <span> {` ${COURSE_MONTH}` } </span>
            <span> {` ${COURSE_YEAR}` } </span>
          </p>
          <p className='m-0'>ora: {COURSE_HOUR}-21:30</p>

        </section>
      </div>
    }
    </>
  )
}

export default CourseModule2Card;
