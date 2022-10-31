import React from 'react';
import ConstructSentenceWithLinks from '../../../ReusableComponents/WebpagesManipulation/ConstructSentenceWithLinks';

const ContentCourseDateIsInFuture = ({ pageData }) => {
  const {paragraph, linkWords} = pageData

  return (
    <div className='right-section'>
      <h6>Continut afisat cand cursul/sesiunea este in viitor</h6>
      <div className='d-flex justify-content-center align-items-center' style={{height: '60%', width: '100%'}}>
        <ConstructSentenceWithLinks
          sentence={paragraph}
          words={linkWords.paragraph}
        />
      </div>
    </div>
  )
}

export default ContentCourseDateIsInFuture