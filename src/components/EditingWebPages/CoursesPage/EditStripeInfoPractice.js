import React from 'react'
import TextField from '@material-ui/core/TextField';

const EditStripeInfoPractice = ({localStyles, FormikProps}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { stripeInfoPracticeLink } = values
  return (
    <div className='section-content mb-4'>
      <p className='section-title m-0'>Stripe Info Practică</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Link stripe info practică"
        id="stripeInfoPracticeLink"
        name="stripeInfoPracticeLink"
        value={stripeInfoPracticeLink}
        onChange={handleChange}
        error={Boolean(errors.stripeInfoPracticeLink && touched.stripeInfoPracticeLink)}
        helperText={errors.stripeInfoPracticeLink}
      />
    </div>
  )
}

export default EditStripeInfoPractice
