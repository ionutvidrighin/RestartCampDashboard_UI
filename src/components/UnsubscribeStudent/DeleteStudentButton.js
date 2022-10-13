import React, { useState, useEffect } from 'react';
import { deleteStudent } from '../../redux/actions/studentsActions/studentEmailSubscription';
import DeleteStudentDialog from './DeleteStudentDialog'
import Button from '@material-ui/core/Button';
import SnackBar from '../ReusableComponents/SnackBar';

const DeleteStudentButton = ({ localStyles, studentEmail }) => {

  const [snackBar, setSnackBar] = useState({})
  const [openDeleteStudentDialog, setOpenDeleteStudentDialog] = useState(false)
  const [confirmDeleteStudent, setConfirmDeleteStudent] = useState(false)
  const [studentWasDeleted, setStudentWasDeleted] = useState(false)

  useEffect(() => {
    if (confirmDeleteStudent) {
      handleDeleteStudent()
    }
  }, [confirmDeleteStudent])

  const handleDeleteStudent = async () => {
    const serverResponse = await deleteStudent(studentEmail)
    if (serverResponse.status === 200) {
      setStudentWasDeleted(true)
      setSnackBar({
        background: '#28cc95',
        open: true,
        success: true,
        text: serverResponse.data.message,
        upDuration: 12000
      })
    } else {
      setSnackBar({
        background: '#e53c5d',
        open: true,
        success: false,
        text: serverResponse.response.data.message,
        upDuration: 12000
      })
    }
  }

  const handleOpenDeleteStudentDialog = () => {
    setOpenDeleteStudentDialog(true)
  }

  return (
    <>
      <Button
        variant='contained'
        className={`${localStyles.submitButton} mt-3`}
        onClick={handleOpenDeleteStudentDialog}
        disabled={studentWasDeleted}>
        Șterge cursant
      </Button>

      { openDeleteStudentDialog &&
        <DeleteStudentDialog
          openDialog={openDeleteStudentDialog}
          closeDialog={setOpenDeleteStudentDialog}
          deleteStudent={setConfirmDeleteStudent}
          studentEmail={studentEmail}
        />
      }

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }  
    </>
  )
}

export default DeleteStudentButton