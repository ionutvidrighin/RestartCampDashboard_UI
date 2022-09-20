import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addWordsWithLinkOnCoursePresencePageData, 
  removeWordsWithLinkOnCoursePresencePageData } from '../../../redux/actions/webPagesDataActions/coursePresencePageDataActions';
import AddLinkOnWordsDialog from '../../ReusableComponents/WebpagesManipulation/AddLinkOnWordsDialog';
import ShowWordsWithLink from '../../ReusableComponents/WebpagesManipulation/ShowWordsWithLink';

const EditContentForLessThan30minBeforeCourseStart = ({FormikProps, formTitleMultipleRows, wordsWithLinks, localStyles}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { lessThan30Min: { formTitle, paragraph1, paragraph2 } } = values

  const [addWordsWithLinkParagraph2, setAddWordsWithLinkParagraph2] = useState(false)
  
  return (
    <div className='section-content mb-4'>
      <p className='section-title m-0'>Acces cu mai putin de 30min.</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu formular"
        id="lessThan30Min.formTitle"
        name="lessThan30Min.formTitle"
        onChange={handleChange}
        value={formTitle}
        error={Boolean(errors.lessThan30Min?.formTitle && touched.lessThan30Min?.formTitle)}
        helperText={errors.lessThan30Min?.formTitle}
        multiline={true}
        maxRows={2}
        minRows={2}
      />

      <div className='mb-4 d-flex align-items-center'>
        <input type="checkbox" 
          onChange={formTitleMultipleRows}
          style={{width: '15px', height: '15px', cursor: 'pointer'}}
        />
        <label className='ms-2' style={{color: '#fcba03', fontSize: '.9rem'}}>
          Titlu Formular pe mai multe rânduri ?
        </label>
      </div>

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Paragraf 1"
        id="lessThan30Min.paragraph1"
        name="lessThan30Min.paragraph1"
        onChange={handleChange}
        value={paragraph1}
        error={Boolean(errors.lessThan30Min?.paragraph1 && touched.lessThan30Min?.paragraph1)}
        helperText={errors.lessThan30Min?.paragraph1}
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
        label="Paragraf 2"
        id="lessThan30Min.paragraph2"
        name="lessThan30Min.paragraph2"
        onChange={handleChange}
        value={paragraph2}
        error={Boolean(errors.lessThan30Min?.paragraph2 && touched.lessThan30Min?.paragraph2)}
        helperText={errors.lessThan30Min?.paragraph2}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <div className='add-and-show-words-with-links'>
        <Button
          onClick={() => setAddWordsWithLinkParagraph2(!addWordsWithLinkParagraph2)}
          variant="contained"
          className='mb-2'>
          <span className='text-capitalize me-1'>
            Adaugă
          </span>
          <span className='text-lowercase'>
            link pe cuvânt
          </span>
        </Button>

        <AddLinkOnWordsDialog
          openDialog={addWordsWithLinkParagraph2}
          closeDialog={setAddWordsWithLinkParagraph2}
          storeDataAction={addWordsWithLinkOnCoursePresencePageData}
          objectKeyLocation="lessThan30Min"
          paragraphNumber="paragraph2"
        />

        <ShowWordsWithLink 
          data={wordsWithLinks?.paragraph2}
          removeWordAction={removeWordsWithLinkOnCoursePresencePageData}
          objectKeyLocation="lessThan30Min"
          paragraphNumber="paragraph2"
          localStyles={localStyles}
        />
      </div>
      
    </div>
  )
}

export default EditContentForLessThan30minBeforeCourseStart
