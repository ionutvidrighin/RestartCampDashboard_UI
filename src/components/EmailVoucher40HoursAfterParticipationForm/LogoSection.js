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
        label="Link Logo"
        id="logoSection.logoLink"
        name="logoSection.logoLink"
        value={logoSection.logoLink}
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
        label="Titlu"
        id="logoSection.title"
        name="logoSection.title"
        value={logoSection.title}
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
        label="Paragraf"
        id="logoSection.paragraph.text"
        name="logoSection.paragraph.text"
        value={logoSection.paragraph.text}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.subsectionOne?.paragraph1 && touched.sectionCenter?.subsectionOne?.paragraph1)}
        helperText={errors.sectionCenter?.subsectionOne?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <div className='d-flex flex-column link-on-words mb-3'>
        <h6 className='subsection ps-2 pe-2 mb-0'>Link cuvinte paragraf</h6>
        <p className='mb-0 ms-2'> 
          -&gt; "<span style={{color: '#4287f5', textDecoration: 'underline'}}>magazinul online Restart Camp</span>"
        </p>
      </div>

      <div className='d-flex justify-content-between' style={{width: '280px'}}>
        <TextField
          autoComplete="off"
          variant='filled'
          type="text"
          style={{width: '80px'}}
          className={localStyles.textField}
          size="small" 
          label="Text"
          id="logoSection.paragraph.word"
          name="logoSection.paragraph.word"
          value={logoSection.paragraph.word}
          onChange={handleChange}
          error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
          helperText={errors.subtitleSection?.subtitle?.title}
        />
        <TextField
          autoComplete="off"
          variant='filled'
          type="text"
          style={{width: '180px'}}
          className={localStyles.textField}
          size="small" 
          label="Link"
          id="logoSection.paragraph.wordLink"
          name="logoSection.paragraph.wordLink"
          value={logoSection.paragraph.wordLink}
          onChange={handleChange}
          error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
          helperText={errors.subtitleSection?.subtitle?.title}
        />
      </div>

      <Divider style={{background: 'white'}} />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-3`}
        size="small" 
        label="Buton 1"
        id="logoSection.button1"
        name="logoSection.button1"
        value={logoSection.button1}
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
        id="logoSection.button2"
        name="logoSection.button2"
        value={logoSection.button2}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />
      
    </div>
  )
}

export default LogoSection
