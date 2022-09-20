import React from 'react';
import TextField from '@material-ui/core/TextField';

const ContestLogoSection = ({ FormikProps, localStyles }) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { contestLogoSection } = values

  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>CONTEST LOGO SECTION</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Link logo concurs"
        id="contestLogoSection"
        name="contestLogoSection"
        value={contestLogoSection}
        onChange={handleChange}
        error={Boolean(errors.contestLogoSection && touched.contestLogoSection)}
        helperText={errors.contestLogoSection}
      />
    </div>
  )
}

export default ContestLogoSection
