import React from 'react';
import dayjs from 'dayjs';
import localizedFormat  from 'dayjs/plugin/localizedFormat'
import localeData from "dayjs/plugin/localeData";
import 'dayjs/locale/ro';

dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.locale("ro");

const ShowCourseRecurrenceDays = ({data}) => {

  return (
    <div className="show-course-recurrence-days">
      { data.map((entry, index) => {
        const courseLocaleDate = dayjs(entry).locale('ro').format('LL')
        const courseHour = dayjs(entry).hour()
        const courseMinute = dayjs(entry).minute()

        return (
          <div key={index} style={{display: 'grid', borderBottom: '1px solid #999999'}}>
            <span className='mt-3'>
              <span style={{color: '#a3a3a3'}}>
                {`${index + 1}. `} 
              </span> 
              {`${courseLocaleDate} => ${courseHour}:${courseMinute < 10 ? '0' + courseMinute : courseMinute}`} 
            </span>
          </div>
        )}
      )}
    </div>
  )
}

export default ShowCourseRecurrenceDays
