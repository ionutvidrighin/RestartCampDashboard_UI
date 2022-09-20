import React from 'react';
import noAccessPageImage from "../assets/no-access.png"
import speakingImage from "../assets/speaking.png"

const NoAccessPage = () => {
  return (
    <div className='no-access-page'>
      <img src={noAccessPageImage} alt="sorry" />
      <img src={speakingImage} alt="speaking" className='speaking' />
      <div className='no-access-info'>
        <h4>Sorry....</h4>
        <h4>nu ai access la</h4>
        <h4>această secțiune</h4>
      </div>
    </div>
  )
}

export default NoAccessPage