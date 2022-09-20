import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import successTone from '../../assets/ringtones/successTone.mp3';
import errorTone from '../../assets/ringtones/errorTone.mp3';

const useStyles = makeStyles({
  snackbar: {
    "& .MuiSnackbarContent-root": {
      minWidth: '210px !important',
      backgroundColor: ({background}) => background
    },
    "& .MuiSnackbarContent-message": {
      width: '100%',
      textAlign: 'center'
    },
    "& .MuiPaper-elevation6": {
      boxShadow: 'none'
    }
  }
})


const SnackBar = ({ snackbarData, setSnackBar }) => {
  const successToneRef = useRef(null)
  const errorToneRef = useRef(null)

  const localStyles = useStyles({background: snackbarData.background})

  const snackbarPosition = {
    vertical: snackbarData.position === undefined ? 'bottom' : snackbarData.position,
    horizontal: 'center'
  }

  const { open, text } = snackbarData
  const { vertical, horizontal } = snackbarPosition;
  const handleClose = () => {
    setSnackBar({...snackbarData, open: false})
  }

  useEffect(() => {
    if (snackbarData.hasOwnProperty('success')) {
      if (snackbarData.success) {
        successToneRef.current.play()
      } else {
        errorToneRef.current.play()
      }
    }
  }, [])

  return (
    <>
      <Snackbar
        className={localStyles.snackbar}
        anchorOrigin={{vertical, horizontal}}
        open={open}
        onClose={handleClose}
        message={text}
        key={vertical + horizontal}
        autoHideDuration={snackbarData.upDuration ? snackbarData.upDuration : 180000 }
      />
      
      <audio ref={successToneRef}>
        <source src={successTone} type="audio/mp3" />
      </audio>
      
      <audio ref={errorToneRef}>
        <source src={errorTone} type="audio/mp3" />
      </audio>
    </>
  )
}

export default SnackBar
