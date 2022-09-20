import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

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
        label="Titlu 1"
        id="sectionCenter.title1"
        name="sectionCenter.title1"
        value={sectionCenter.title1}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.title1 && touched.sectionCenter?.title1)}
        helperText={errors.sectionCenter?.title1}
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
        error={Boolean(errors.sectionCenter?.paragraph1 && touched.sectionCenter?.paragraph1)}
        helperText={errors.sectionCenter?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <Divider style={{background: 'white'}} />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu 2"
        id="sectionCenter.title2"
        name="sectionCenter.title2"
        value={sectionCenter.title2}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.title2 && touched.sectionCenter?.title2)}
        helperText={errors.sectionCenter?.title2}
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
        error={Boolean(errors.sectionCenter?.paragraph2 && touched.sectionCenter?.paragraph2)}
        helperText={errors.sectionCenter?.paragraph2}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <Divider style={{background: 'white'}} />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu 3"
        id="sectionCenter.title3"
        name="sectionCenter.title3"
        value={sectionCenter.title3}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.title3 && touched.sectionCenter?.title3)}
        helperText={errors.sectionCenter?.title3}
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
        error={Boolean(errors.sectionCenter?.paragraph3 && touched.sectionCenter?.paragraph3)}
        helperText={errors.sectionCenter?.paragraph3}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <Divider style={{background: 'white'}} />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu 4"
        id="sectionCenter.title4"
        name="sectionCenter.title4"
        value={sectionCenter.title4}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.title4 && touched.sectionCenter?.title4)}
        helperText={errors.sectionCenter?.title4}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Paragraf 4"
        id="sectionCenter.paragraph4"
        name="sectionCenter.paragraph4"
        value={sectionCenter.paragraph4}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.paragraph4 && touched.sectionCenter?.paragraph4)}
        helperText={errors.sectionCenter?.paragraph4}
        multiline={true}
        maxRows={5}
        minRows={5}
      />
    </div>
  )
}

export default SectionCenter
