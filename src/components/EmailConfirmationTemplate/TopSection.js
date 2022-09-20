import React from 'react';
import TextField from '@material-ui/core/TextField';

const TopSection = ({FormikProps, localStyles, emailTitleMultipleRows}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { topSection: {  emailTitle, subtitle, paragraph } } = values
 
  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>TOP SECTION</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-1`}
        size="small" 
        label="Titlu E-mail"
        id="topSection.emailTitle"
        name="topSection.emailTitle"
        value={emailTitle}
        onChange={handleChange}
        error={Boolean(errors.topSection?.emailTitle && touched.topSection?.emailTitle)}
        helperText={errors.topSection?.emailTitle}
        multiline={true}
        maxRows={4}
        minRows={4}
      />
      
      <div className='mb-3 d-flex align-items-center'>
        <input type="checkbox" 
          onChange={emailTitleMultipleRows}
          style={{width: '15px', height: '15px', cursor: 'pointer'}}
        />
        <label className='ms-2' style={{color: '#fcba03'}}>
          Titlu E-mail pe mai multe rânduri ?
        </label>
      </div>

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Subtitlu"
        id="topSection.subtitle"
        name="topSection.subtitle"
        value={subtitle}
        onChange={handleChange}
        error={Boolean(errors.topSection?.subtitle && touched.topSection?.subtitle)}
        helperText={errors.topSection?.subtitle}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={localStyles.textField}
        size="small" 
        label="Paragraf"
        id="topSection.paragraph"
        name="topSection.paragraph"
        value={paragraph}
        onChange={handleChange}
        error={Boolean(errors.topSection?.paragraph && touched.topSection?.paragraph)}
        helperText={errors.topSection?.paragraph}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

    </div>
  )
}

export default TopSection
