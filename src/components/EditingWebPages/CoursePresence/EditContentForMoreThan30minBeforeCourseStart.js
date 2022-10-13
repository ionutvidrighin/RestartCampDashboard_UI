import React from 'react';
import TextField from '@material-ui/core/TextField';

const EditContentForMoreThan30minBeforeCourseStart = ({FormikProps, localStyles, editPermission}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { moreThan30Min } = values
  
  return (
    <div className='section-content mb-4'>
      <p className='section-title m-0'>Acces cu mai mult de 30min.</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Paragraf 1"
        id="moreThan30Min.paragraph1"
        name="moreThan30Min.paragraph1"
        onChange={handleChange}
        value={moreThan30Min.paragraph1}
        error={Boolean(errors.moreThan30Min?.paragraph1 && touched.moreThan30Min?.paragraph1)}
        helperText={errors.moreThan30Min?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Paragraf 2"
        id="moreThan30Min.paragraph2"
        name="moreThan30Min.paragraph2"
        onChange={handleChange}
        value={moreThan30Min.paragraph2}
        error={Boolean(errors.moreThan30Min?.paragraph2 && touched.moreThan30Min?.paragraph2)}
        helperText={errors.moreThan30Min?.paragraph2}
        multiline={true}
        maxRows={5}
        minRows={5}
        disabled={editPermission}
      />
    </div>
  )
}

export default EditContentForMoreThan30minBeforeCourseStart
