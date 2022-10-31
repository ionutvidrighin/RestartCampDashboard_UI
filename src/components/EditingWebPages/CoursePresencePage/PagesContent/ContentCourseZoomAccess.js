import React from 'react';
import ConstructSentenceWithLinks from '../../../ReusableComponents/WebpagesManipulation/ConstructSentenceWithLinks';

const ContentCourseZoomAccess = ({pageData}) => {
  const { paragraph, submitButtonLabel, linkWords } = pageData
  return (
    <div className='right-section' style={{height: 500}}>
      <h6>Conținut afisat după completare formular prezență</h6>
      <div className='d-flex justify-content-center mt-5'>
        <div className='ps-3 pt-3'>
          <p className='fw-bold'> Nume Curs/Sesiune </p>

          <ConstructSentenceWithLinks
            sentence={paragraph}
            words={linkWords.paragraph}
          />
          <p className='text-center fw-bold mt-2'>Începem la [data_curs]</p>

          <div className='d-flex justify-content-center'>
            <button className='course-zoom-access-btn'> {submitButtonLabel} </button>
          </div>
        </div>
        <div className='course-logo'>
          <img src="https://res.cloudinary.com/drr6nvfqj/image/upload/v1667197705/restartcamp/transparent_ruapkc.webp" alt="course-logo" style={{width: 250}} />
        </div>
      </div>
    </div>
  )
}

export default ContentCourseZoomAccess