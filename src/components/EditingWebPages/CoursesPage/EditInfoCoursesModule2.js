import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addWordsWithLinkOnCoursesPageData,
  removeWordsWithLinkOnCoursesPageData } from '../../../redux/actions/webPagesDataActions/coursesPageDataActions';
import AddLinkOnWordsDialog from '../../ReusableComponents/WebpagesManipulation/AddLinkOnWordsDialog';
import ShowWordsWithLink from '../../ReusableComponents/WebpagesManipulation/ShowWordsWithLink';

const EditInfoCoursesModule2 = ({localStyles, FormikProps, editPermission}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { infoCoursesModule2: { title, paragraph, linkWords } } = values

  const [addWordsWithLink, setAddWordsWithLink] = useState(false)

  return (
    <div className='section-content mb-4'>
      <p className='section-title m-0'>Info Cursuri Modul 2</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu Cursuri Modul 2"
        id="infoCoursesModule2.title"
        name="infoCoursesModule2.title"
        value={title}
        onChange={handleChange}
        error={Boolean(errors.infoCoursesModule2?.title && touched.infoCoursesModule2?.title)}
        helperText={errors.infoCoursesModule2?.title}
        disabled={editPermission}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Paragraf"
        id="infoCoursesModule2.paragraph"
        name="infoCoursesModule2.paragraph"
        value={paragraph}
        multiline={true}
        maxRows={5}
        minRows={5}
        onChange={handleChange}
        error={Boolean(errors.infoCoursesModule2?.paragraph && touched.infoCoursesModule2?.paragraph)}
        helperText={errors.infoCoursesModule2?.paragraph}
        disabled={editPermission}
      />

      <div className={linkWords.paragraph.length !== 0 && 'add-and-show-words-with-links'}>
        <Button
          onClick={() => setAddWordsWithLink(!addWordsWithLink)}
          variant="contained"
          className='mb-2'
          disabled={editPermission}>
          <span className='text-capitalize me-1'>
            Adaugă
          </span>
          <span className='text-lowercase'>
            link pe cuvânt
          </span>
        </Button>
        <AddLinkOnWordsDialog
          openDialog={addWordsWithLink}
          closeDialog={setAddWordsWithLink}
          storeDataAction={addWordsWithLinkOnCoursesPageData}
          objectKeyLocation="infoCoursesModule2"
          paragraphNumber="paragraph"
        />

        <ShowWordsWithLink
          editPermission={editPermission}
          data={linkWords.paragraph}
          removeWordAction={removeWordsWithLinkOnCoursesPageData}
          objectKeyLocation="infoCoursesModule2"
          paragraphNumber="paragraph"
          localStyles={localStyles}
        />
      </div>
    </div>
  )
}

export default EditInfoCoursesModule2
