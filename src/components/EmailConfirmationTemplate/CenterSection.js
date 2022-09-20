import React from 'react';
import TextField from '@material-ui/core/TextField';


const CenterSection = ({FormikProps, localStyles}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { centerSection: { row1, row2 } } = values

  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>CENTER SECTION</p>

      <div className='row-1 row'>
        <p className='row-title'>ROW 1</p>
        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={`${localStyles.textField} mt-2`}
          size="small" 
          label="Link logo curs"
          id="centerSection.row1.courseLogoLink"
          name="centerSection.row1.courseLogoLink"
          value={row1.courseLogoLink}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row1?.courseLogoLink && touched.centerSection?.row1?.courseLogoLink)}
          helperText={errors.centerSection?.row1?.courseLogoLink}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={`${localStyles.textField} mt-2`}
          size="small" 
          label="Titlu 1"
          id="centerSection.row1.title1"
          name="centerSection.row1.title1"
          value={row1.title1}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row1?.title1 && touched.centerSection?.row1?.title1)}
          helperText={errors.centerSection?.row1?.title1}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={localStyles.textField}
          size="small" 
          label="Paragraf 1"
          id="centerSection.row1.paragraph1"
          name="centerSection.row1.paragraph1"
          value={row1.paragraph1}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row1?.paragraph1 && touched.centerSection?.row1?.paragraph1)}
          helperText={errors.centerSection?.row1?.paragraph1}
          multiline={true}
          maxRows={5}
          minRows={5}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={`${localStyles.textField} mt-2`}
          size="small"
          label="Titlu 2"
          id="centerSection.row1.title2"
          name="centerSection.row1.title2"
          value={row1.title2}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row1?.title2 && touched.centerSection?.row1?.title2)}
          helperText={errors.centerSection?.row1?.title2}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={localStyles.textField}
          size="small" 
          label="Paragraf 2"
          id="centerSection.row1.paragraph2"
          name="centerSection.row1.paragraph2"
          value={row2.paragraph2}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row1?.paragraph2 && touched.centerSection?.row1?.paragraph2)}
          helperText={errors.centerSection?.row1?.paragraph2}
          multiline={true}
          maxRows={5}
          minRows={5}
        />
      </div>
      
      <br />

      <div className='row-2 row'>
        <p className='row-title'> ROW 2 </p>
        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={`${localStyles.textField} mt-2`}
          size="small" 
          label="Titlu 1"
          id="centerSection.row2.title1"
          name="centerSection.row2.title1"
          value={row2.title1}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row2?.title1 && touched.centerSection?.row2?.title1)}
          helperText={errors.centerSection?.row2?.title1}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={localStyles.textField}
          size="small" 
          label="Paragraf 1"
          id="centerSection.row2.paragraph1"
          name="centerSection.row2.paragraph1"
          value={row2.paragraph1}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row2?.paragraph1 && touched.centerSection?.row2?.paragraph1)}
          helperText={errors.centerSection?.row2?.paragraph1}
          multiline={true}
          maxRows={5}
          minRows={5}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={`${localStyles.textField} mt-2`}
          size="small" 
          label="Titlu 2"
          id="centerSection.row2.title2"
          name="centerSection.row2.title2"
          value={row2.title2}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row2?.title2 && touched.centerSection?.row2?.title2)}
          helperText={errors.centerSection?.row2?.title2}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={localStyles.textField}
          size="small" 
          label="Paragraf 2"
          id="centerSection.row2.paragraph2"
          name="centerSection.row2.paragraph2"
          value={row2.paragraph2}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row2?.paragraph2 && touched.centerSection?.row2?.paragraph2)}
          helperText={errors.centerSection?.row2?.paragraph2}
          multiline={true}
          maxRows={5}
          minRows={5}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={`${localStyles.textField} mt-2`}
          size="small" 
          label="Titlu 3"
          id="centerSection.row2.title3"
          name="centerSection.row2.title3"
          value={row2.title3}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row2?.title3 && touched.centerSection?.row2?.title3)}
          helperText={errors.centerSection?.row2?.title3}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={localStyles.textField}
          size="small" 
          label="Paragraf 3"
          id="centerSection.row2.paragraph3"
          name="centerSection.row2.paragraph3"
          value={row2.paragraph3}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row2?.paragraph3 && touched.centerSection?.row2?.paragraph3)}
          helperText={errors.centerSection?.row2?.paragraph3}
          multiline={true}
          maxRows={5}
          minRows={5}
        />

        
        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={`${localStyles.textField} mt-2`}
          size="small" 
          label="Titlu 4"
          id="centerSection.row2.title4"
          name="centerSection.row2.title4"
          value={row2.title4}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row2?.title4 && touched.centerSection?.row2?.title4)}
          helperText={errors.centerSection?.row2?.title4}
        />

        <TextField
          autoComplete="off"
          variant='filled'
          type="input"
          className={localStyles.textField}
          size="small" 
          label="Paragraf 4"
          id="centerSection.row2.paragraph4"
          name="centerSection.row2.paragraph4"
          value={row2.paragraph4}
          onChange={handleChange}
          error={Boolean(errors.centerSection?.row2?.paragraph4 && touched.centerSection?.row2?.paragraph4)}
          helperText={errors.centerSection?.row2?.paragraph4}
          multiline={true}
          maxRows={5}
          minRows={5}
        />
      </div>
    </div>
  )
}

export default CenterSection
