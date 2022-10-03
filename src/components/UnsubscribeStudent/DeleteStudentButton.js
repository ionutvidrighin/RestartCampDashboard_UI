import React from 'react';
import Button from '@material-ui/core/Button';

const DeleteStudentButton = ({ localStyles }) => {
  return (
    <Button variant='contained' className={`${localStyles.submitButton} mt-3`}>
      Șterge cursant
    </Button>
  )
}

export default DeleteStudentButton