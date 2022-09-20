import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  textField: {
    width: '280px',
    marginBottom: '1rem !important',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(10px, 5px) scale(0.75)'
    },
    "& .MuiFormLabel-root": {
      color: 'white'
    },
    "& .MuiInputBase-root": {
      color: 'white'
    }
  }
})

const SectionCenter = ({ FormikProps }) => {
  const localStyles = useStyles()

  const { values, handleChange, errors, touched } = FormikProps
  const { sectionCenter } = values

  return (
    <div className='continut-sectiune mb-4'>
      <p className='titlu-sectiune m-0'>SECTIUNE CENTRU</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu"
        id="sectionCenter.title"
        name="sectionCenter.title"
        value={sectionCenter.title}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />
    
      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Paragraf 1"
        id="sectionCenter.paragraph1"
        name="sectionCenter.paragraph1"
        value={sectionCenter.paragraph1}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.subsectionOne?.paragraph1 && touched.sectionCenter?.subsectionOne?.paragraph1)}
        helperText={errors.sectionCenter?.subsectionOne?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu 2"
        id="sectionCenter.title2"
        name="sectionCenter.title2"
        value={sectionCenter.title2}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Paragraf 2"
        id="sectionCenter.paragraph2"
        name="sectionCenter.paragraph2"
        value={sectionCenter.paragraph2}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.subsectionOne?.paragraph1 && touched.sectionCenter?.subsectionOne?.paragraph1)}
        helperText={errors.sectionCenter?.subsectionOne?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
      />
      
      <TextField
        autoComplete="off"
        variant='filled'
        type="input"
        className={localStyles.textField}
        size="small" 
        label="Paragraf 3"
        id="sectionCenter.paragraph3.text"
        name="sectionCenter.paragraph3.text"
        value={sectionCenter.paragraph3.text}
        onChange={handleChange}
        error={Boolean(errors.sectionCenter?.subsectionOne?.paragraph1 && touched.sectionCenter?.subsectionOne?.paragraph1)}
        helperText={errors.sectionCenter?.subsectionOne?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <div className='d-flex flex-column link-on-words mb-3'>
        <h6 className='subsection ps-2 pe-2 mb-0'>Link cuvinte paragraful 3</h6>
        <p className='mb-0 ms-2'> 
          -&gt; șir 1: "<span style={{color: '#4287f5', textDecoration: 'underline'}}>modulul 2 al acestui curs</span>"
        </p>
        <p className='mb-0 ms-2'> 
          -&gt; șir 2: "<span style={{color: '#4287f5', textDecoration: 'underline'}}>un alt curs modul 1</span>"
        </p>
        <p className='mb-0 ms-2'> 
          -&gt; șir 3: "<span style={{color: '#4287f5', textDecoration: 'underline'}}>consultanță și mentorat 1-la-1</span>"
        </p>
      </div>

      <div style={{width: '280px'}}>
        <div className='d-flex justify-content-between'>
          <TextField
            autoComplete="off"
            variant='filled'
            type="text"
            style={{width: '80px'}}
            className={localStyles.textField}
            size="small" 
            label="Șirul 1"
            id="sectionCenter.paragraph3.word1"
            name="sectionCenter.paragraph3.word1"
            value={sectionCenter.paragraph3.word1}
            onChange={handleChange}
            error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
            helperText={errors.subtitleSection?.subtitle?.title}
          />
          <TextField
            autoComplete="off"
            variant='filled'
            type="text"
            style={{width: '180px'}}
            className={localStyles.textField}
            size="small" 
            label="Link"
            id="sectionCenter.paragraph3.wordLink1"
            name="sectionCenter.paragraph3.wordLink1"
            value={sectionCenter.paragraph3.wordLink1}
            onChange={handleChange}
            error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
            helperText={errors.subtitleSection?.subtitle?.title}
          />
        </div>
        <div className='d-flex justify-content-between'>
          <TextField
            autoComplete="off"
            variant='filled'
            type="text"
            style={{width: '80px'}}
            className={localStyles.textField}
            size="small" 
            label="Șirul 2"
            id="sectionCenter.paragraph3.word2"
            name="sectionCenter.paragraph3.word2"
            value={sectionCenter.paragraph3.word2}
            onChange={handleChange}
            error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
            helperText={errors.subtitleSection?.subtitle?.title}
          />
          <TextField
            autoComplete="off"
            variant='filled'
            type="text"
            style={{width: '180px'}}
            className={localStyles.textField}
            size="small" 
            label="Link"
            id="sectionCenter.paragraph3.wordLink2"
            name="sectionCenter.paragraph3.wordLink2"
            value={sectionCenter.paragraph3.wordLink2}
            onChange={handleChange}
            error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
            helperText={errors.subtitleSection?.subtitle?.title}
          />
        </div>
        <div className='d-flex justify-content-between'>
          <TextField
            autoComplete="off"
            variant='filled'
            type="text"
            style={{width: '80px'}}
            className={localStyles.textField}
            size="small" 
            label="Șirul 3"
            id="sectionCenter.paragraph3.word3"
            name="sectionCenter.paragraph3.word3"
            value={sectionCenter.paragraph3.word3}
            onChange={handleChange}
            error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
            helperText={errors.subtitleSection?.subtitle?.title}
          />
          <TextField
            autoComplete="off"
            variant='filled'
            type="text"
            style={{width: '180px'}}
            className={localStyles.textField}
            size="small" 
            label="Link"
            id="sectionCenter.paragraph3.wordLink3"
            name="sectionCenter.paragraph3.wordLink3"
            value={sectionCenter.paragraph3.wordLink3}
            onChange={handleChange}
            error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
            helperText={errors.subtitleSection?.subtitle?.title}
          />
        </div>
      </div>

      <Divider style={{background: 'white'}} />
      {/* Buttons section */}
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Buton 1"
        id="sectionCenter.button1"
        name="sectionCenter.button1"
        value={sectionCenter.button1}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Buton 2"
        id="sectionCenter.button2"
        name="sectionCenter.button2"
        value={sectionCenter.button2}
        onChange={handleChange}
        error={Boolean(errors.subtitleSection?.subtitle?.title && touched.subtitleSection?.subtitle?.title)}
        helperText={errors.subtitleSection?.subtitle?.title}
      />
    </div>
  )
}

export default SectionCenter
