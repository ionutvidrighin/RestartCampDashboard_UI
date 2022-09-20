import React from 'react'
import TextField from '@material-ui/core/TextField'

const ButtonsSection = ({FormikProps, localStyles}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { buttonsSection: { button1, button2 }  } = values

  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>BUTTONS SECTION</p>

      <div className='button-1 d-flex align-items-center mt-2'>
        <TextField
            autoComplete="off"
            variant='filled'
            type="input"
            className={localStyles.narrowTextField}
            size="small" 
            label="Text buton 1"
            id="buttonsSection.button1.text"
            name="buttonsSection.button1.text"
            value={button1.text}
            onChange={handleChange}
            error={Boolean(errors.buttonsSection?.button1?.text && touched.buttonsSection?.button1?.text)}
            helperText={errors.buttonsSection?.button1?.text}
          />

          <TextField
            autoComplete="off"
            variant='filled'
            type="input"
            className={`${localStyles.narrowTextField} ms-4`}
            size="small" 
            label="Link buton 1"
            id="buttonsSection.button1.link"
            name="buttonsSection.button1.link"
            value={button1.link}
            onChange={handleChange}
            error={Boolean(errors.buttonsSection?.button1?.link && touched.buttonsSection?.button1?.link)}
            helperText={errors.buttonsSection?.button1?.link}
          />
      </div>

      <div className='button-2 d-flex align-items-center mt-2'>
        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={localStyles.narrowTextField}
          size="small" 
          label="Text buton 2"
          id="buttonsSection.button2.text"
          name="buttonsSection.button2.text"
          value={button2.text}
          onChange={handleChange}
          error={Boolean(errors.buttonsSection?.button2?.text && touched.buttonsSection?.button2?.text)}
          helperText={errors.buttonsSection?.button2?.text}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={`${localStyles.narrowTextField} ms-4`}
          size="small" 
          label="Link buton 2"
          id="buttonsSection.button2.link"
          name="buttonsSection.button2.link"
          value={button2.link}
          onChange={handleChange}
          error={Boolean(errors.buttonsSection?.button2?.link && touched.buttonsSection?.button2?.link)}
          helperText={errors.buttonsSection?.button2?.link}
        />
      </div>

    </div>
  )
}

export default ButtonsSection