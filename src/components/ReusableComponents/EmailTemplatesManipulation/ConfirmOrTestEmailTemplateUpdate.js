import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const ConfirmOrTestEmailTemplateUpdate = ({ action, displayButton, collectEmailAddressValue, testEmailAddressValue, localStyles }) => {

  return (
    <div className='d-flex flex-column aling-items-center mt-3 mb-5'>

      { displayButton.confirmChanges &&
        <>
          <div className='d-flex justify-content-center mb-2'>
            <Button variant="contained"
              type='submit'
              className={localStyles.submitButton} 
              onClick={action}>
              Confirma schimbările 
            </Button>
          </div>
          <p className='m-0 text-center' style={{color: 'white'}}> sau </p>
        </>
      }

      <div className='d-flex justify-content-center mt-2'>
        <Button variant="contained"
          className={localStyles.submitButton}
          onClick={action}
          disabled={displayButton.testChanges}>
          Testeaza schimbările 
        </Button>
      </div>

      { displayButton.testChanges &&
        <div className='send-test-email-template d-flex flex-column align-items-center mt-2'>
          <TextField
            autoComplete="off"
            variant='filled'
            type="input"
            className={`${localStyles.textField} mb-3`}
            size="small" 
            label="Adresa e-mail test"
            value={testEmailAddressValue}
            onChange={collectEmailAddressValue}
          />
          <Button variant="contained" type='submit' className={localStyles.submitButton}>
            Trimite Test E-mail
          </Button>
          <CancelRoundedIcon style={{color: 'white', cursor: 'pointer'}} className="mt-2" onClick={action} />
        </div>
      }

    </div>
  )
}

export default ConfirmOrTestEmailTemplateUpdate