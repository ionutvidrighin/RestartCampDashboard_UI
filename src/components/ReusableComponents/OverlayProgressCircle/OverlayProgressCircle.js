import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const OverlayProgressCircle = ({overlaySetup}) => {

  const {showCircle, circlePosition} = overlaySetup
  const position = circlePosition ? circlePosition : 'align-items-center'

  const progressCircleStyle = {
    color: '#fc5173', 
    height: '80px', 
    width: '80px',
  }

  return (
    <>
    { showCircle ?
      <div className='overlay-progress-circle'>
        <div className='d-flex justify-content-center' style={{width: '100%', height: '100%', alignItems: position}}>
          <CircularProgress className='mb-5 mt-5' style={progressCircleStyle} />
        </div>
      </div>
      :
      <>
      </>
    }
    </>
  )
}

export default OverlayProgressCircle
