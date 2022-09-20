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

const SectionReferral = ({ FormikProps }) => {
  const localStyles = useStyles()

  const { values, handleChange, errors, touched } = FormikProps
  const { sectionReferral } = values

  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>SECTIUNE REFERRAL</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Buton 1"
        id="sectionReferral.button1"
        name="sectionReferral.button1"
        value={sectionReferral.button1}
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
        label="Buton 2"
        id="sectionReferral.button2"
        name="sectionReferral.button2"
        value={sectionReferral.button2}
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
        label="Logo"
        id="sectionReferral.logo"
        name="sectionReferral.logo"
        value={sectionReferral.logo}
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
        label="Text"
        id="sectionReferral.text"
        name="sectionReferral.text"
        value={sectionReferral.text}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
        multiline={true}
        maxRows={3}
        minRows={3}
      />
    </div>
  )
}

export default SectionReferral
