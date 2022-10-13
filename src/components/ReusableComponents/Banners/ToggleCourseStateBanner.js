import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  activateCourseDialog: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: '#28cc95',
      marginTop: '-1rem'
    },
    "& .MuiSnackbarContent-message": {
      color: 'black'
    }
  },
  deactivateCourseDialog: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: '#e43d6f',
      marginTop: '-1rem'
    }
  }
})

const ToggleCourseStateBanner = ({openBanner, closeBanner, courseState, updateCourseStateAction}) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  const {open, vertical, horizontal} = openBanner
  const handleClose = () => closeBanner({...openBanner, open: false })

  const handleUpdateCourseState = () => {
    const payload = {
      courseId: courseState.courseId,
      courseActive: courseState.state
    }
    dispatch(updateCourseStateAction(payload))
    closeBanner({...openBanner, open: false })
  }

  return (
    <Snackbar
      className={`${courseState.state ? localStyles.activateCourseDialog : localStyles.deactivateCourseDialog}`}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={courseState.message}
      key={vertical + horizontal}
      action={
        <>
          <Button 
            variant="contained" 
            onClick={handleUpdateCourseState}>
            DA
          </Button>
          <Button 
            variant="contained" 
            onClick={() => closeBanner({...openBanner, open: false }) }
            className="ms-2">
            NU
          </Button>
        </>
      }
    />
  )
}

export default ToggleCourseStateBanner