import React, { useState } from 'react'
import { useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { addWordsWithLinkOnCoursesPageData,
  removeWordsWithLinkOnCoursesPageData } from '../../../redux/actions/webPagesDataActions/coursesPageDataActions';
import AddLinkOnWordsDialog from '../../ReusableComponents/WebpagesManipulation/AddLinkOnWordsDialog';
import ShowWordsWithLink from '../../ReusableComponents/WebpagesManipulation/ShowWordsWithLink';


const EditInfoCoursesModule1 = ({localStyles, FormikProps}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { infoCoursesModule1 } = values

  const [ addWordsWithLinkParagraph1, setAddWordsWithLinkParagraph1 ] = useState(false)
  const [ addWordsWithLinkParagraph2, setAddWordsWithLinkParagraph2 ] = useState(false)
  const wordsWithLink = useSelector(state => {
    const paragraph1 = state.coursesPageReducer.data.infoCoursesModule1.linkWords.paragraph1
    const paragraph2 = state.coursesPageReducer.data.infoCoursesModule1.linkWords.paragraph2
    return { paragraph1, paragraph2 }
  })

  return (
    <div className='section-content mb-4'>
      <p className='section-title m-0'>Info Cursuri Modul 1</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu Cursuri Modul 1"
        id="infoCoursesModule1.title"
        name="infoCoursesModule1.title"
        onChange={handleChange}
        value={infoCoursesModule1.title}
        error={Boolean(errors.infoCoursesModule1?.title && touched.infoCoursesModule1?.title)}
        helperText={errors.infoCoursesModule1?.title}
      />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Paragraf 1"
        id="infoCoursesModule1.paragraph1"
        name="infoCoursesModule1.paragraph1"
        onChange={handleChange}
        value={infoCoursesModule1.paragraph1}
        error={Boolean(errors.infoCoursesModule1?.paragraph1 && touched.infoCoursesModule1?.paragraph1)}
        helperText={errors.infoCoursesModule1?.paragraph1}
        multiline={true}
        maxRows={5}
        minRows={5}
      />

      <div className='add-and-show-words-with-links'>
        <Button
          onClick={() => setAddWordsWithLinkParagraph1(!addWordsWithLinkParagraph1)}
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
          openDialog={addWordsWithLinkParagraph1}
          closeDialog={setAddWordsWithLinkParagraph1}
          storeDataAction={addWordsWithLinkOnCoursesPageData}
          objectKeyLocation="infoCoursesModule1"
          childObjectKey="paragraph1"
        />

        <ShowWordsWithLink 
          data={wordsWithLink.paragraph1}
          removeWordAction={removeWordsWithLinkOnCoursesPageData}
          objectKeyLocation="infoCoursesModule1"
          childObjectKey="paragraph1"
          localStyles={localStyles}
        />
      </div>

      <Divider style={{background: 'white'}} className='mb-2 mt-3' />

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Paragraf 2"
        id="infoCoursesModule1.paragraph2"
        name="infoCoursesModule1.paragraph2"
        onChange={handleChange}
        value={infoCoursesModule1.paragraph2}
        error={Boolean(errors.infoCoursesModule1?.paragraph2 && touched.infoCoursesModule1?.paragraph2)}
        helperText={errors.infoCoursesModule1?.paragraph2}
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
          storeDataAction={addWordsWithLinkOnCoursesPageData}
          objectKeyLocation="infoCoursesModule1"
          childObjectKey="paragraph2"
        />

        <ShowWordsWithLink 
          data={wordsWithLink.paragraph2}
          removeWordAction={removeWordsWithLinkOnCoursesPageData}
          objectKeyLocation="infoCoursesModule1"
          childObjectKey="paragraph2"
          localStyles={localStyles}
        />
      </div>

    </div>
  )
}

export default EditInfoCoursesModule1
