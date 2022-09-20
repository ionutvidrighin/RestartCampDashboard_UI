import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  submitButton: {
    margin: 'auto 0',
    backgroundColor: '#509ecc', 
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    transition: '.5s ease all',
    "&:hover": {
      backgroundColor: '#c23a6a',
      transition: '.5s ease all'
    }
  },
  textFiled: {
    width: '280px',
    marginBottom: '1rem !important',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(10px, 5px) scale(0.75)'
    },
    "& .MuiInputLabel-animated, .MuiInputBase-root": {
      color: 'white !important'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
  }
})

const TestOrConfirmEmailTemplateUpdate = ({showConfirmChangesBtn, setShowConfirmChangesBtn, showProgressCircle, testEmailValue, setTestEmailValue}) => {
  const localStyles = useStyles()

  return (
    <div className='d-flex flex-column align-items-center mb-4' style={{width: '100%'}}>
    { showConfirmChangesBtn.chooseOption &&
      <>
        <Button 
          variant="contained" 
          className={localStyles.submitButton}
          onClick={() => setShowConfirmChangesBtn({
            chooseOption: false,
            realChanges: false,
            testChanges: true
          })}
          type="submit">
          Testează Modificările
        </Button>
        <p className='m-0' style={{color: 'white'}}>sau</p>
        <Button
          variant="contained" 
          className={localStyles.submitButton}
          onClick={() => setShowConfirmChangesBtn({
            chooseOption: false,
            realChanges: true,
            testChanges: false
          })}>
          Confirmă modificări finale
        </Button>
      </>
    }

    { showConfirmChangesBtn.realChanges &&
      <div className='d-flex'>
        <Button
          className={localStyles.submitButton}
          variant='contained' 
          type='submit'
        >
          Confirmă modificări finale
        </Button>
        <Button
          onClick={() => setShowConfirmChangesBtn({
            chooseOption: true,
            realChanges: false,
            testChanges: false
          })}
          className={`${localStyles.submitButton} ms-2`}
          style={{minWidth: '3px', width: '3px'}}
          variant='contained'
        >
          X
        </Button>
      </div>
    }

    { (showConfirmChangesBtn.testChanges && !showProgressCircle.show) &&
      <>
        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={`${localStyles.textFiled} mt-3`}
          size="small" 
          label="Adresa e-mail test"
          value={testEmailValue}
          onChange={(e) => setTestEmailValue(e.target.value)}
        />
        <div className='mb-5'>
          <Button
            className={localStyles.submitButton}
            variant='contained' 
            type='submit'
          >
            Testează modificările
          </Button>
          <Button
            onClick={() => setShowConfirmChangesBtn({
              chooseOption: true,
              realChanges: false,
              testChanges: false
            })}
            className={`${localStyles.submitButton} ms-2`}
            style={{minWidth: '3px', width: '3px'}}
            variant='contained'
          >
            X
          </Button>
        </div>
      </>
    }                
  </div>
  )
}

export default TestOrConfirmEmailTemplateUpdate
