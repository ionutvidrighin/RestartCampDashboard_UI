import React, { useState, useEffect, useRef } from 'react';
import PageInstructionsDialog from './PageInstructionsDialog';
import ringBellIcon from "../../assets/bell.png";
import ringBellTone from "../../assets/ringtones/alert.mp3";

const DisplayRingBellAndBanner = ({position, Component}) => {

  const [openInstructionsDialog, setOpenInstructionsDialog] = useState(false)

  const ringBellIconRef = useRef()
  const ringBellToneRef = useRef()
  const bannerRef = useRef()

  useEffect(() => {
    ringBellIconRef.current.classList.add('animate-ring-bell')
    ringBellToneRef.current.play()
  }, [])

  const handleOpenDialog = () => {
    setOpenInstructionsDialog(true)
    ringBellToneRef.current.pause()
    ringBellIconRef.current.classList.remove('animate-ring-bell')
    bannerRef.current.classList.remove('animate-banner')
  }

  const verticalPosition = {
    top: position ? position : '42px'
  }

  return (
    <div className='instructions-bell' style={verticalPosition}>
      <img src={ringBellIcon}
        ref={ringBellIconRef}
        alt="instructions-bell" 
        className={`ring-bell-icon`}
        onClick={handleOpenDialog}
      />
      <audio ref={ringBellToneRef} loop>
        <source src={ringBellTone} type="audio/mp3" />
      </audio>

      <div className='instructions-banner animate-banner' ref={bannerRef}>
        <div className='arrow'></div>
        <p className='m-0'>Instrucțiunile Paginii</p>
      </div>

      { openInstructionsDialog &&
        <PageInstructionsDialog
          Component={Component}
          openDialog={openInstructionsDialog}
          closeDialog={setOpenInstructionsDialog}
        />
      }
    </div>
  )
}

export default DisplayRingBellAndBanner