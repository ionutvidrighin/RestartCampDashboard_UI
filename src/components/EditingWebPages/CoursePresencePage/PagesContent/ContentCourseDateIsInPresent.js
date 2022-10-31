import React from 'react';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';
import ConstructSentenceWithLinks from '../../../ReusableComponents/WebpagesManipulation/ConstructSentenceWithLinks';
import { constructSentenceOn2rows } from '../helperMethodsCoursePresence';

const ContentCourseDateIsInPresent = ({ pageData }) => {
  let today = new Date()
  const todayROformat = dayjs(today).locale('ro').format('LL')
  const { moreThan30min, lessThan30min } = pageData

  const formTitle = constructSentenceOn2rows(lessThan30min.formTitle)
  
  return (
    <div className='right-section'>
      <h6>Acces cu mai mult de 30min. </h6>
      <section className='more-than-30min text-center mt-5 fw-bold'>
        <p> { moreThan30min.paragraph1 } </p>
        <p> Sesiunea "[nume_curs]" va incepe azi, {todayROformat}, la ora 00:00</p>
        <p> { moreThan30min.paragraph2 } </p>
        <br />
        <Countdown daysInHours={true} date={today} className="countdown" />
        <br />
        <br />
        <br />
        <p> { moreThan30min.paragraph3 } </p>
      </section>

      <h6 className='mt-5'>Acces cu mai putin de 30min.</h6>
      <section className='less-than-30min mt-4 d-flex flex-column align-items-center justify-content-center'>
        <div className='d-flex flex-column align-items-center justify-content-center col-10'>
          {formTitle.map((element, i) => (
            <h5 key={i} style={i === 0 ? {color: '#fd5c4a', fontWeight: 'bold'} : {}}>
              {element}
            </h5>
          ))}
          <br/>
          <br/>
          <ConstructSentenceWithLinks
            sentence={lessThan30min.paragraph1}
            words={lessThan30min.linkWords.paragraph1}
          />
          <div className='red-squared-paragraph'>
            <ConstructSentenceWithLinks
              sentence={lessThan30min.paragraph2}
              words={lessThan30min.linkWords.paragraph2}
            />
          </div>

          <div className='form-input'> {lessThan30min.textFieldLabel1} </div>
          <div className='form-input'> {lessThan30min.textFieldLabel2} </div>
          <div className='form-submit-btn'> {lessThan30min.submitButtonLabel} </div>
        </div>
        
        <div className='col-10'>
          <p className='text-left'>Alerte afișate după completare formular:</p>
          <div className='success-banner'> {lessThan30min.successAlertMessage} </div>
          <div className='error-banner mb-5'> {lessThan30min.errorAlertMessage} </div>
        </div>
      </section>
    </div>
  )
}

export default ContentCourseDateIsInPresent