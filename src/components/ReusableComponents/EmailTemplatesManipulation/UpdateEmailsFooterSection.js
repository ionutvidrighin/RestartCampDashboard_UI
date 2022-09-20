import React from 'react';
import TextField from '@material-ui/core/TextField';

const UpdateEmailsFooterSection = ({ FormikProps, localStyles }) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { contactSection: { title, phone, email, paragraph, aboutRestartCamp: { text, link } } } = values

  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>CONTACT SECTION</p>

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu"
        id="contactSection.title"
        name="contactSection.title"
        value={title}
        onChange={handleChange}
        error={Boolean(errors.contactSection?.title && touched.contactSection?.title)}
        helperText={errors.contactSection?.title}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Telefon"
        id="contactSection.phone"
        name="contactSection.phone"
        value={phone}
        onChange={handleChange}
        error={Boolean(errors.contactSection?.phone && touched.contactSection?.phone)}
        helperText={errors.contactSection?.phone}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="E-mail"
        id="contactSection.email"
        name="contactSection.email"
        value={email}
        onChange={handleChange}
        error={Boolean(errors.contactSection?.email && touched.contactSection?.email)}
        helperText={errors.contactSection?.email}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Paragraf"
        id="contactSection.paragraph"
        name="contactSection.paragraph"
        value={paragraph}
        onChange={handleChange}
        error={Boolean(errors.contactSection?.paragraph && touched.contactSection?.paragraph)}
        helperText={errors.contactSection?.paragraph}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <div className='about-restartcamp'>
        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={localStyles.narrowTextField}
          size="small" 
          label="Despre R.C."
          id="contactSection.aboutRestartCamp.text"
          name="contactSection.aboutRestartCamp.text"
          value={text}
          onChange={handleChange}
          error={Boolean(errors.contactSection?.aboutRestartCamp?.text && touched.contactSection?.aboutRestartCamp?.text)}
          helperText={errors.contactSection?.aboutRestartCamp?.text}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={`${localStyles.narrowTextField} ms-4`}
          size="small" 
          label="Link despre R.C."
          id="contactSection.aboutRestartCamp.link"
          name="contactSection.aboutRestartCamp.link"
          value={link}
          onChange={handleChange}
          error={Boolean(errors.contactSection?.aboutRestartCamp?.link && touched.contactSection?.aboutRestartCamp?.link)}
          helperText={errors.contactSection?.aboutRestartCamp?.link}
        />
      </div>
    </div>
  )
}

export default UpdateEmailsFooterSection