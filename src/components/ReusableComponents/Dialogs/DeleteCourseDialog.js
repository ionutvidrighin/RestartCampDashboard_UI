import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearCoursesModule1ServerResponse } from '../../../redux/actions/coursesActions/coursesModule1';
//import { clearCoursesModule2ServerResponse } from '../../redux/actions/coursesActions/coursesModule2';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import SnackBar from '../SnackBar';

const useStyles = makeStyles({
  dialog: {
    "& .MuiBackdrop-root": {
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    "& .MuiPaper-elevation24": {
      boxShadow: 'none'
    }
  }
})


const DeleteCourseDialog = ({openDialog, closeDialog, hideChangeCourseSection, deleteCourseAction}) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  const { course: {courseTitle, courseId}, open } = openDialog
  const [snackBar, setSnackBar] = useState({})
  const serverMessageOnDeleteCourse = useSelector(state => ({
    error: state.coursesModule1?.error,
    success: state.coursesModule1?.success
  }))
  const {error, success} = serverMessageOnDeleteCourse
  const displaySnackbar = () => {
    dispatch(clearCoursesModule1ServerResponse()) 
    if (error) {
      setSnackBar({
        background: '#e53c5d', 
        open: true, 
        success: false,
        text: error
      })
    }
  
    if (success) {
      setSnackBar({
        background: '#28cc95', 
        open: true, 
        success: true,
        text: `Cursul - ${courseTitle} - a fost sters!` 
      })
      setTimeout(() => handleCloseDialog(), 4000)
    }
  }

  useEffect(() => {
    displaySnackbar()
    return () => dispatch(clearCoursesModule1ServerResponse()) 
  }, [error, success])

  const handleDeleteCourse = () => {
    hideChangeCourseSection(false)
    dispatch(deleteCourseAction({courseId}))
  }

  const handleCloseDialog = () => closeDialog({open: false})

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={open} className={localStyles.dialog}>
        <div style={{width: '300px', height: '200px', padding: '1rem'}}>
          <h6 className='text-center'> Confirm ștergerea cursului </h6>
          <p style={{fontStyle: 'italic', fontWeight: 600, margin: 0, color: '#e53c5d', textAlign: 'center'}}> 
            { courseTitle }
          </p>
          <div className='d-flex justify-content-evenly mt-5'>
            <Button
              className='fw-bold'
              variant='contained'
              onClick={handleDeleteCourse}>
              DA
            </Button>

            <Button
              className='fw-bold'
              variant='contained'
              onClick={handleCloseDialog}>
              NU
            </Button>
          </div>
        </div>
        { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
      </Dialog>
    </div>
  )
}

export default DeleteCourseDialog