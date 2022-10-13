import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const UnsubscribeStudentDialog = ({openDialog, closeDialog, unsubscribeStudent, studentEmail}) => {

  const handleUnsubscribeStudent = () => {
    unsubscribeStudent(true)
    closeDialog(false)
  }

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={openDialog}>
        <div style={{width: '350px', height: '180px', padding: '1rem'}}>
          <h6 className='text-center'> Confirm dezabonarea de la newsletter pentru </h6>
          <p style={{fontStyle: 'italic', fontWeight: 600, margin: 0, color: '#e53c5d', textAlign: 'center'}}> 
            {studentEmail}
          </p>
          <div className='d-flex justify-content-evenly mt-4'>
            <Button
              className='fw-bold'
              variant='contained'
              onClick={handleUnsubscribeStudent}>
              DA
            </Button>

            <Button
              className='fw-bold'
              variant='contained'
              onClick={() => closeDialog(false)}>
              NU
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default UnsubscribeStudentDialog
