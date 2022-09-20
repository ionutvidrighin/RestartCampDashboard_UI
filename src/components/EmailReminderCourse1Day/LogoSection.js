import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  textField: {
    width: '280px',
    marginBottom: '1rem !important',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(10px, 5px) scale(0.75)'
    },
    "& .MuiFormLabel-root": {
      color: 'white'
    },
    "& .MuiInputBase-root": {
      color: 'white'
    }
  }
})

const LogoSection = ({ FormikProps }) => {
  const localStyles = useStyles()

  const { values, handleChange, errors, touched } = FormikProps
  const { logoSection } = values

  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>SECTIUNE LOGO</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Link logo"
        id="logoSection"
        name="logoSection"
        value={logoSection}
        onChange={handleChange}
        error={Boolean(errors.logoSection && touched.logoSection)}
        helperText={errors.logoSection}
      />
    </div>
  )
}

export default LogoSection
