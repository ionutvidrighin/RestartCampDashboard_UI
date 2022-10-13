import React from 'react';
import TextField from '@material-ui/core/TextField';

const EditErrorAlerts = ({FormikProps, localStyles, editPermission}) => {
  const { values, handleChange, errors, touched } = FormikProps

  return (
    <div className='section-content mb-4'>
      <p className='section-title m-0'> Alerte Formular Înscriere </p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Eroare Nume și Prenume"
        id="fullName_error"
        name="fullName_error"
        multiline={true}
        maxRows={2}
        minRows={2}
        onChange={handleChange}
        value={values.fullName_error}
        error={Boolean(errors.fullName_error && touched.fullName_error)}
        helperText={errors.fullName_error}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Eroare Adresă e-mail"
        id="emailAddress_error"
        name="emailAddress_error"
        onChange={handleChange}
        value={values.emailAddress_error}
        error={Boolean(errors.emailAddress_error && touched.emailAddress_error)}
        helperText={errors.emailAddress_error}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Eroare Prefix(tel.) țară"
        id="countryPhoneCode_error"
        name="countryPhoneCode_error"
        onChange={handleChange}
        value={values.countryPhoneCode_error}
        error={Boolean(errors.countryPhoneCode_error && touched.countryPhoneCode_error)}
        helperText={errors.countryPhoneCode_error}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Eroare Număr telefon"
        id="phoneNumber_error"
        name="phoneNumber_error"
        onChange={handleChange}
        value={values.phoneNumber_error}
        error={Boolean(errors.phoneNumber_error && touched.phoneNumber_error)}
        helperText={errors.phoneNumber_error}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Eroare Reședință"
        id="address_error"
        name="address_error"
        onChange={handleChange}
        value={values.address_error}
        error={Boolean(errors.address_error && touched.address_error)}
        helperText={errors.address_error}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Eroare Județ"
        id="county_error"
        name="county_error"
        onChange={handleChange}
        value={values.county_error}
        error={Boolean(errors.county_error && touched.county_error)}
        helperText={errors.county_error}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Eroare lipsă alegere curs"
        id="noCourseSelected_error"
        name="noCourseSelected_error"
        onChange={handleChange}
        value={values.noCourseSelected_error}
        error={Boolean(errors.noCourseSelected_error && touched.noCourseSelected_error)}
        helperText={errors.noCourseSelected_error}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />
      
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Eroare alegere cursuri multiple"
        id="multipleCoursesSelected_error"
        name="multipleCoursesSelected_error"
        onChange={handleChange}
        value={values.multipleCoursesSelected_error}
        error={Boolean(errors.multipleCoursesSelected_error && touched.multipleCoursesSelected_error)}
        helperText={errors.multipleCoursesSelected_error}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Eroare activitate profesională"
        id="profession_error"
        name="profession_error"
        onChange={handleChange}
        value={values.profession_error}
        error={Boolean(errors.profession_error && touched.profession_error)}
        helperText={errors.profession_error}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Eroare nivel carieră - despre program - industrie "
        id="careerAboutProgramIndustry_error"
        name="careerAboutProgramIndustry_error"
        onChange={handleChange}
        value={values.careerAboutProgramIndustry_error}
        error={Boolean(errors.careerAboutProgramIndustry_error && touched.careerAboutProgramIndustry_error)}
        helperText={errors.careerAboutProgramIndustry_error}
        multiline={true}
        maxRows={3}
        minRows={2}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Eroare GDPR"
        id="gdpr_error"
        name="gdpr_error"
        onChange={handleChange}
        value={values.gdpr_error}
        error={Boolean(errors.gdpr_error && touched.gdpr_error)}
        helperText={errors.gdpr_error}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />
      
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Eroare finalizare înregistrare"
        id="submitForm_error"
        name="submitForm_error"
        onChange={handleChange}
        value={values.submitForm_error}
        error={Boolean(errors.submitForm_error && touched.submitForm_error)}
        helperText={errors.submitForm_error}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Avertizare finalizare înregistrare"
        id="submitForm_warning"
        name="submitForm_warning"
        onChange={handleChange}
        value={values.submitForm_warning}
        error={Boolean(errors.submitForm_warning && touched.submitForm_warning)}
        helperText={errors.submitForm_warning}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small"
        label="Succes finalizare înregistrare"
        id="submitForm_success"
        name="submitForm_success"
        onChange={handleChange}
        value={values.submitForm_success}
        error={Boolean(errors.submitForm_success && touched.submitForm_success)}
        helperText={errors.submitForm_success}
        multiline={true}
        maxRows={2}
        minRows={2}
        disabled={editPermission}
      />    
  </div>
  )
}

export default EditErrorAlerts
