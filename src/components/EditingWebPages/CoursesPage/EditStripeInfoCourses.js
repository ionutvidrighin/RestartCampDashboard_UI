import React from 'react'
import TextField from '@material-ui/core/TextField';

const EditStripeInfoCourses = ({localStyles, FormikProps, editPermission}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { stripeInfoCoursesLink } = values

  return (
    <div className='section-content mb-4'>
      <p className='section-title m-0'>Stripe Info Cursuri</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Link stripe info cursuri"
        id="stripeInfoCoursesLink"
        name="stripeInfoCoursesLink"
        value={stripeInfoCoursesLink}
        onChange={handleChange}
        error={Boolean(errors.stripeInfoCoursesLink && touched.stripeInfoCoursesLink)}
        helperText={errors.stripeInfoCoursesLink}
        disabled={editPermission}
      />
    </div>
  )
}

export default EditStripeInfoCourses
