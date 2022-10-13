import React from 'react'
import TextField from '@material-ui/core/TextField';

const EditWebPageFooter = ({localStyles, FormikProps, editPermission}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { pageFooter } = values

  return (
    <div className='section-content mb-4'>
      <p className='section-title m-0'>Footer Pagina Cursuri</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Link pagina Facebook"
        id="pageFooter.facebookPageLink"
        name="pageFooter.facebookPageLink"
        value={pageFooter.facebookPageLink}
        onChange={handleChange}
        error={Boolean(errors.pageFooter?.facebookPageLink && touched.pageFooter?.facebookPageLink)}
        helperText={errors.pageFooter?.facebookPageLink}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={localStyles.textField}
        size="small" 
        label="Link pagina LinkedIn"
        id="pageFooter.linkedinPageLink"
        name="pageFooter.linkedinPageLink"
        value={pageFooter.linkedinPageLink}
        onChange={handleChange}
        error={Boolean(errors.pageFooter?.linkedinPageLink && touched.pageFooter?.linkedinPageLink)}
        helperText={errors.pageFooter?.linkedinPageLink}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={localStyles.textField}
        size="small" 
        label="Link pagina Instagram"
        id="pageFooter.instagramPageLink"
        name="pageFooter.instagramPageLink"
        value={pageFooter.instagramPageLink}
        onChange={handleChange}
        error={Boolean(errors.pageFooter?.instagramPageLink && touched.pageFooter?.instagramPageLink)}
        helperText={errors.pageFooter?.instagramPageLink}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={localStyles.textField}
        size="small" 
        label="Telefon contact"
        id="pageFooter.whatsappNumber"
        name="pageFooter.whatsappNumber"
        value={pageFooter.whatsappNumber}
        onChange={handleChange}
        error={Boolean(errors.pageFooter?.whatsappNumber && touched.pageFooter?.whatsappNumber)}
        helperText={errors.pageFooter?.whatsappNumber}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={localStyles.textField}
        size="small" 
        label="E-mail contact"
        id="pageFooter.emailAddress"
        name="pageFooter.emailAddress"
        value={pageFooter.emailAddress}
        onChange={handleChange}
        error={Boolean(errors.pageFooter?.emailAddress && touched.pageFooter?.emailAddress)}
        helperText={errors.pageFooter?.emailAddress}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={localStyles.textField}
        size="small" 
        label="Link Abonare NewsLetter"
        id="pageFooter.newsLetterLink"
        name="pageFooter.newsLetterLink"
        value={pageFooter.newsLetterLink}
        onChange={handleChange}
        error={Boolean(errors.pageFooter?.newsLetterLink && touched.pageFooter?.newsLetterLink)}
        helperText={errors.pageFooter?.newsLetterLink}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={localStyles.textField}
        size="small" 
        label="Link pagina T&C"
        id="pageFooter.termsConditionsLink"
        name="pageFooter.termsConditionsLink"
        value={pageFooter.termsConditionsLink}
        onChange={handleChange}
        error={Boolean(errors.pageFooter?.termsConditionsLink && touched.pageFooter?.termsConditionsLink)}
        helperText={errors.pageFooter?.termsConditionsLink}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={localStyles.textField}
        size="small" 
        label="Link pagina GDPR"
        id="pageFooter.gdprLink"
        name="pageFooter.gdprLink"
        value={pageFooter.gdprLink}
        onChange={handleChange}
        error={Boolean(errors.pageFooter?.gdprLink && touched.pageFooter?.gdprLink)}
        helperText={errors.pageFooter?.gdprLink}
        disabled={editPermission}
      />
    </div>
  )
}

export default EditWebPageFooter
