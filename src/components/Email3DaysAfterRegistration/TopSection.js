import React from 'react';
import TextField from '@material-ui/core/TextField';

const TopSection = ({ FormikProps, localStyles, emailTitleMultipleRows }) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { topSection: { templateLogo, emailTitle, paragraph } } = values

  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>SECTIUNE LOGO</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Email Template Logo"
        id="topSection.templateLogo"
        name="topSection.templateLogo"
        value={templateLogo}
        onChange={handleChange}
        error={Boolean(errors.topSection?.templateLogo && touched.topSection?.templateLogo)}
        helperText={errors.topSection?.templateLogo}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={localStyles.textField}
        size="small" 
        label="Titlu"
        id="topSection.emailTitle"
        name="topSection.emailTitle"
        value={emailTitle}
        onChange={handleChange}
        error={Boolean(errors.topSection?.emailTitle && touched.topSection?.emailTitle)}
        helperText={errors.topSection?.emailTitle}
      />

      <div className='mb-4 d-flex align-items-center'>
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
        type="input"
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
