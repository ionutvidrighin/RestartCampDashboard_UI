import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  textField: {
    width: '280px',
    marginBottom: '.5rem',
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

const TextFieldComp = ({hasEditPermission, label, name, value, handleChange, error, touched, multiline, maxRows, minRows}) => {
  const localStyles = useStyles()

  return (
    <TextField
      autoComplete="off"
      variant='filled'
      type="text"
      className={localStyles.textField}
      size="small" 
      label={label}
      id={name}
      name={name}
      onChange={handleChange}
      value={value}
      error={Boolean(error && touched)}
      helperText={error}
      multiline={multiline}
      maxRows={maxRows}
      minRows={minRows}
      disabled={hasEditPermission}
    />
  )
}

export default TextFieldComp