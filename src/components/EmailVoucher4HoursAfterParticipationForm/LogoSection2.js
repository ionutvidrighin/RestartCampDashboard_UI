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

const LogoSection2 = ({ FormikProps }) => {
  const localStyles = useStyles()

  const { values, handleChange, errors, touched } = FormikProps
  const { logoSection2 } = values

  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>SECTIUNE LOGO 2</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu"
        id="logoSection2.title"
        name="logoSection2.title"
        value={logoSection2.title}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Link logo"
        id="logoSection2.logoLink"
        name="logoSection2.logoLink"
        value={logoSection2.logoLink}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />
    </div>
  )
}

export default LogoSection2
