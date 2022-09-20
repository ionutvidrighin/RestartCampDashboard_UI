import React from 'react';
import TextField from '@material-ui/core/TextField';


const CenterSection = ({ FormikProps, localStyles }) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { centerSection: { logoLink, title, paragraph, title2 } } = values

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
        id="centerSection.logoLink"
        name="centerSection.logoLink"
        value={logoLink}
        onChange={handleChange}
        error={Boolean(errors.centerSection?.logoLink && touched.centerSection?.logoLink)}
        helperText={errors.centerSection?.logoLink}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Subtitlu"
        id="centerSection.title"
        name="centerSection.title"
        value={title}
        onChange={handleChange}
        error={Boolean(errors.centerSection?.title && touched.centerSection?.title)}
        helperText={errors.centerSection?.title}
      />     

      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Paragraf"
        id="centerSection.paragraph"
        name="centerSection.paragraph"
        value={paragraph}
        onChange={handleChange}
        error={Boolean(errors.centerSection?.paragraph && touched.centerSection?.paragraph)}
        helperText={errors.centerSection?.paragraph}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu"
        id="centerSection.title2"
        name="centerSection.title2"
        value={title2}
        onChange={handleChange}
        error={Boolean(errors.centerSection?.title2 && touched.centerSection?.title2)}
        helperText={errors.centerSection?.title2}
      />
    </div>
  )
}

export default CenterSection
