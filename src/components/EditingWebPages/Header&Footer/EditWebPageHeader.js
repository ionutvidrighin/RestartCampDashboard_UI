import React from 'react'
import TextField from '@material-ui/core/TextField';


const EditWebPageHeader = ({localStyles, FormikProps, editPermission}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { pageHeader } = values

  return (
    <div className='section-content mb-4'>
      <p className='section-title m-0'>Header Pagina Cursuri</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Link buton înapoi la site"
        id="pageHeader.backButtonLink"
        name="pageHeader.backButtonLink"
        value={pageHeader.backButtonLink}
        onChange={handleChange}
        error={Boolean(errors.pageHeader?.backButtonLink && touched.pageHeader?.backButtonLink)}
        helperText={errors.pageHeader?.backButtonLink}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Link Logo site"
        id="pageHeader.companyLogoLink"
        name="pageHeader.companyLogoLink"
        onChange={handleChange}
        value={pageHeader.companyLogoLink}
        error={Boolean(errors.pageHeader?.companyLogoLink && touched.pageHeader?.companyLogoLink)}
        helperText={errors.pageHeader?.companyLogoLink}
        disabled={editPermission}
      />
    </div>
  )
}

export default EditWebPageHeader
