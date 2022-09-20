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

const SectionCenter = ({ FormikProps }) => {
  const localStyles = useStyles()

  const { values, handleChange, errors, touched } = FormikProps
  const { sectionCenter } = values

  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>SECTIUNE CENTRU</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Link Logo"
        id="sectionCenter.LogoLink"
        name="sectionCenter.LogoLink"
        value={sectionCenter.LogoLink}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />
    
      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Paragraf 1"
        id="sectionCenter.paragraph1"
        name="sectionCenter.paragraph1"
        value={sectionCenter.paragraph1}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.subsectionOne?.paragraph1 && touched.sectionCenter?.subsectionOne?.paragraph1)}
        helperText={errors.sectionCenter?.subsectionOne?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Paragraf 2"
        id="sectionCenter.paragraph2"
        name="sectionCenter.paragraph2"
        value={sectionCenter.paragraph2}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.subsectionOne?.paragraph1 && touched.sectionCenter?.subsectionOne?.paragraph1)}
        helperText={errors.sectionCenter?.subsectionOne?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Paragraf 3"
        id="sectionCenter.paragraph3"
        name="sectionCenter.paragraph3"
        value={sectionCenter.paragraph3}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.subsectionOne?.paragraph1 && touched.sectionCenter?.subsectionOne?.paragraph1)}
        helperText={errors.sectionCenter?.subsectionOne?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
      />
    </div>
  )
}

export default SectionCenter
