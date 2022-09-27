import React from 'react';

const ShowEmailTemplateContent = ({content}) => {

  return (
    <div className='static-html-page'>
      { content && <div dangerouslySetInnerHTML={content} />}
    </div>
  )
}

export default ShowEmailTemplateContent