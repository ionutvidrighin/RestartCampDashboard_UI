import React from 'react';
import ConstructSentenceWithLinks from '../../../ReusableComponents/WebpagesManipulation/ConstructSentenceWithLinks';

const ContentCoureDateIsInPast = ({ pageData }) => {
  const {paragraph, linkWords} = pageData

  return (
    <div className='right-section'>
      <h6>Continut afisat cand cursul/sesiunea a trecut</h6>
      <div className='d-flex justify-content-center align-items-center' style={{height: '60%', width: '100%'}}>
        <ConstructSentenceWithLinks
          sentence={paragraph}
          words={linkWords.paragraph}
        />
      </div>
    </div>
  )
}

export default ContentCoureDateIsInPast