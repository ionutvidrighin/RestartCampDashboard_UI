import React, { useState } from 'react'
import { useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { addWordsWithLinkOnHeaderFooter,
  removeWordsWithLinkOnHeaderFooter } from '../../../redux/actions/webPagesDataActions/headerFooterDataActions';
import AddLinkOnWordsDialog from '../../ReusableComponents/WebpagesManipulation/AddLinkOnWordsDialog';
import ShowWordsWithLink from '../../ReusableComponents/WebpagesManipulation/ShowWordsWithLink';

const EditContactInformation = ({localStyles, FormikProps, editPermission}) => {
  const { values, handleChange, errors, touched } = FormikProps
  const { contactInformation } = values

  const [addWordsWithLinkTitle, setAddWordsWithLinkTitle] = useState(false)
  const [addWordsWithLinkParagraph, setAddWordsWithLinkParagraph] = useState(false)
  const wordsWithLink = useSelector(state => {
    const title = state.headerFooterReducer.data.contactInformation.linkWords.title
    const paragraph = state.headerFooterReducer.data.contactInformation.linkWords.paragraph
    return { title, paragraph }
  })

  return (
    <div className='section-content mb-4'>
      <p className='section-title m-0'>Informații de contact</p>
      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Titlu"
        id="contactInformation.title"
        name="contactInformation.title"
        value={contactInformation.title}
        onChange={handleChange}
        error={Boolean(errors.contactInformation?.title && touched.contactInformation?.title)}
        helperText={errors.contactInformation?.title}
        disabled={editPermission}
      />

      {/* <div className='add-and-show-words-with-links'>
        <Button
          onClick={() => setAddWordsWithLinkTitle(!addWordsWithLinkTitle)}
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
          openDialog={addWordsWithLinkParagraph}
          closeDialog={setAddWordsWithLinkParagraph}
          storeDataAction={addWordsWithLinkOnHeaderFooter}
          objectKeyLocation="contactInformation"
          childObjectKey="title"
        />

        <ShowWordsWithLink 
          data={wordsWithLink.title}
          removeWordAction={removeWordsWithLinkOnHeaderFooter}
          objectKeyLocation="contactInformation"
          childObjectKey="title"
          localStyles={localStyles}
        />
      </div>

      <Divider style={{background: 'white'}} className='mb-2 mt-3' /> */}

      <TextField
        autoComplete="off"
        variant='filled'
        type="text"
        className={`${localStyles.textField} mt-2`}
        size="small" 
        label="Paragraf Informații de contact"
        id="contactInformation.paragraph"
        name="contactInformation.paragraph"
        multiline={true}
        maxRows={5}
        minRows={5}
        value={contactInformation.paragraph}
        onChange={handleChange}
        error={Boolean(errors.contactInformation?.paragraph && touched.contactInformation?.paragraph)}
        helperText={errors.contactInformation?.paragraph}
        disabled={editPermission}
      />

      <div className='add-and-show-words-with-links'>
        <Button
          onClick={() => setAddWordsWithLinkParagraph(!addWordsWithLinkParagraph)}
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
          openDialog={addWordsWithLinkParagraph}
          closeDialog={setAddWordsWithLinkParagraph}
          storeDataAction={addWordsWithLinkOnHeaderFooter}
          objectKeyLocation="contactInformation"
          childObjectKey="paragraph"
        />

        <ShowWordsWithLink
          editPermission={editPermission}
          data={wordsWithLink.paragraph}
          removeWordAction={removeWordsWithLinkOnHeaderFooter}
          objectKeyLocation="contactInformation"
          childObjectKey="paragraph"
          localStyles={localStyles}
        />
      </div>  
    </div>
  )
}

export default EditContactInformation
