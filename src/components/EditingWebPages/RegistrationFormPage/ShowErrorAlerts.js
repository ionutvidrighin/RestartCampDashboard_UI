import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CloseIcon from '@material-ui/icons/Close';

const warningColor = '#ed6c02';
const errorColor = '#d32f2f';
const successColor = '#2e7d32';

const ShowErrorAlerts = ({ data }) => {
  return (
    <div className='text-center'>
      <h6 className='mb-4'>CONȚINUT ALERTE ALE FORMULARULUI DE ÎNREGISTRARE LA CURS: </h6>

      { data.length !== 0 &&
        data.map((element, i) => (
          <div key={i} className='error-message-container'>
            <p className='title'>{element.title}:</p>
            <div
              className='error-dialog' 
              style={{ backgroundColor: 
                  (element.validation === 'submitForm_success') ? successColor
                : (element.validation === 'submitForm_warning') ? warningColor
                : errorColor
              }}>

              { (element.validation === 'submitForm_success') ? 
                <CheckCircleOutlineIcon className='me-2' /> 
                :
                (element.validation === 'submitForm_warning') ?
                <ReportProblemOutlinedIcon className='me-2' /> 
                : 
                <ErrorOutlineIcon className='me-2' /> 
              }
              <p> {element.message} </p>
              <CloseIcon className='ms-2' />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ShowErrorAlerts
