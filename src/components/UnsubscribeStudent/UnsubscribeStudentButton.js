import React, { useState, useEffect } from 'react';
import { unsubscribeStudentFromNewsLetter } from '../../redux/actions/studentsActions/studentEmailSubscription';
import UnsubscribeStudentDialog from './UnsubscribeStudentDialog';
import Button from '@material-ui/core/Button';
import SnackBar from '../ReusableComponents/SnackBar';

const UnsubscribeStudentButton = ({ localStyles, studentEmail }) => {

  const [snackBar, setSnackBar] = useState({})
  const [openUnsubscribeStudentDialog, setOpenUnsubscribeStudentDialog] = useState(false)
  const [unsubscribeStudent, setUnsubscribeStudent] = useState(false)
  const [studentWasUnsubscribed, setStudentWasUnsubscribed] = useState(false)

  useEffect(() => {
    if (unsubscribeStudent) {
      handleUnsubscribeStudent()
    }
  }, [unsubscribeStudent])

  const handleUnsubscribeStudent = async () => {
    const serverResponse = await unsubscribeStudentFromNewsLetter(studentEmail)
    if (serverResponse.status === 200) {
      setStudentWasUnsubscribed(true)
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

  const handleOpenConfirmUnsubscribeDialog = () => {
    setOpenUnsubscribeStudentDialog(true)
  }

  return (
    <>
      <Button variant='contained'
        className={localStyles.submitButton}
        onClick={handleOpenConfirmUnsubscribeDialog}
        disabled={studentWasUnsubscribed}>
        Dezabonează cursant
      </Button>

      { openUnsubscribeStudentDialog &&
        <UnsubscribeStudentDialog
          openDialog={openUnsubscribeStudentDialog}
          closeDialog={setOpenUnsubscribeStudentDialog}
          unsubscribeStudent={setUnsubscribeStudent}
          studentEmail={studentEmail}
        />
      }

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }  
    </>
  )
}

export default UnsubscribeStudentButton