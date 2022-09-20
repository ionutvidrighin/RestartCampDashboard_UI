import React, { useState } from 'react'
import { useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addWordsWithLinkOnCoursesPageData,
  removeWordsWithLinkOnCoursesPageData } from '../../../redux/actions/webPagesDataActions/coursesPageDataActions';
import AddLinkOnWordsDialog from '../../ReusableComponents/WebpagesManipulation/AddLinkOnWordsDialog';
import ShowWordsWithLink from '../../ReusableComponents/WebpagesManipulation/ShowWordsWithLink';

const EditInfoCoursesModule2 = ({localStyles, FormikProps}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { infoCoursesModule2: { title, paragraph } } = values

  const [addWordsWithLink, setAddWordsWithLink] = useState(false)
  const wordsWithLink = useSelector(state => state.coursesPageReducer.data.infoCoursesModule2.linkWords.paragraph)

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
      />

      <div className='add-and-show-words-with-links'>
        <Button
          onClick={() => setAddWordsWithLink(!addWordsWithLink)}
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
          openDialog={addWordsWithLink}
          closeDialog={setAddWordsWithLink}
          storeDataAction={addWordsWithLinkOnCoursesPageData}
          objectKeyLocation="infoCoursesModule2"
          childObjectKey="paragraph"
        />

        <ShowWordsWithLink 
          data={wordsWithLink}
          removeWordAction={removeWordsWithLinkOnCoursesPageData}
          objectKeyLocation="infoCoursesModule2"
          childObjectKey="paragraph"
          localStyles={localStyles}
        />
      </div>
    </div>
  )
}

export default EditInfoCoursesModule2
