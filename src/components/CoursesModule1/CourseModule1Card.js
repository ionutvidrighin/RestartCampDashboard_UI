import React from 'react';
import ShowCourseRecurrenceDays from '../ReusableComponents/ShowCourseRecurrenceDays';
import { RRule } from 'rrule';
import dayjs from 'dayjs';
import localizedFormat  from 'dayjs/plugin/localizedFormat'
import localeData from "dayjs/plugin/localeData";
import 'dayjs/locale/ro';

dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.locale("ro");

//*** styling for inactive Mask applied when course is DEACTIVATED
const cardStyle = {
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

const CourseModule1Card = ({
  className, // classname to override the default styling currently set to *free-course-card* class (see the scss file for it)
  courseLogoClass, // classname to override the default styling to course logo (ex. different width/hight of the img)
  courseLogo, // Link address to an image. String as: "https://image.com"
  coursePriceLogo, // Link address to an image. String as: "https://image.com"
  courseTitle, // String. Mentioning Course title.
  courseDate, // String, as "2022-03-02T18:30"
  courseRecurrence, // String, as "2", "4", "6", "8"
  courseActive, // Boolean. Reveals if course is active or inactive (when inactive, is hidden from the webpage)
  showCourseRecurrence // Boolean state passed from parent. Shows all days when the course will take place
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


  const rule = new RRule({
    freq: courseFrequency,
    dtstart: new Date(courseDate),
    count: 100,
    interval: courseInterval
  })

  let allRecurrence = rule.all()
  let copiedRecurrence = [...allRecurrence] // needs to be copied to work with it down the logic

  // remove all past days (as compared to TODAY) from the recurrence list
  copiedRecurrence = copiedRecurrence.filter(item => {
    return !dayjs(item).isBefore(dayjs())
  })

  const courseLocaleDate = dayjs(copiedRecurrence[0]).locale('ro').format('LL')
  const courseHour = dayjs(copiedRecurrence[0]).hour()
  const courseMinute = dayjs(copiedRecurrence[0]).minute()

  const weekdayName = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"]
  const dayOfWeek = dayjs(courseDate).weekday()

  return (
    <>
    { showCourseRecurrence &&
      <ShowCourseRecurrenceDays data={allRecurrence} />
    }

    { !showCourseRecurrence &&
      <div className={`free-course-card d-flex flex-column ${className}`}>
        { !courseActive && 
          <div style={cardStyle.inactiveMask}>
            <p className="m-0" style={cardStyle.inactiveMask.inactiveCourseFlag}> CURS INACTIV </p>
          </div>
        }
        <section className={`free-course-card-logo ${courseLogoClass}`}>
          <img src={courseLogo} alt="freecourse-logo" />
          <img src={coursePriceLogo} alt="course-price" />
        </section>

        <section className="p-1 free-course-description">
          <div className="d-flex flex-column align-items-center justify-content-evenly">
            <button className="course-link"> 
              inscriere & detalii
            </button>
            <span className='fw-bold mb-1'> CÂND POȚI PARTICIPA LA: </span>
            <span className="course-title m-0">{courseTitle}</span>
            <br />
          </div>
        </section>

        <div className='course--date text-center'>
          <p className="m-0 mt-2 text-uppercase"> {weekdayName[dayOfWeek]} </p>
          <p className="m-0 course-date"> {courseLocaleDate} </p>
          <p className='m-0'> ora: {courseHour}:{`${courseMinute}` < 10 ? `0${courseMinute}` : `${courseMinute}`}</p>
        </div>
      </div>
    }
    </>
  );
};

export default CourseModule1Card;
