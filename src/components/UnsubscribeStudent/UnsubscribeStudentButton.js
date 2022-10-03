import React from 'react';
import Button from '@material-ui/core/Button';

const UnsubscribeStudentButton = ({ localStyles }) => {
  return (
    <Button variant='contained' className={localStyles.submitButton}>
      Dezabonează cursant
    </Button>
  )
}

export default UnsubscribeStudentButton