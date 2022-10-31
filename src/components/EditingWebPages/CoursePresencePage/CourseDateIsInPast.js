import React, { useState } from 'react';
import { formDataCourseDateInPast } from './helperMethodsCoursePresence';
import { addWordsWithLinkOnCoursePresencePageData,
  removeWordsWithLinkOnCoursePresencePageData } from '../../../redux/actions/webPagesDataActions/coursePresencePageDataActions';
import AddLinkOnWordsDialog from '../../ReusableComponents/WebpagesManipulation/AddLinkOnWordsDialog';
import ShowWordsWithLink from '../../ReusableComponents/WebpagesManipulation/ShowWordsWithLink';
import TextFieldComponent from '../../ReusableComponents/TextFieldComponent';
import Button from '@material-ui/core/Button';

const CourseDateIsInPast = ({ hasEditPermission, FormikProps, localStyles }) => {
  const { values, handleChange, errors } = FormikProps

  const courseDatePassed = formDataCourseDateInPast(values, errors)
  const [addLinkOnWords, setAddLinkOnWords] = useState(courseDatePassed)

  const handleOpenAddWordsWithLinksDialog = (elementId, state) => {
    let allData = [...addLinkOnWords]
    allData = allData.map(element => ({...element, open: false}))
    const elementToUpdate = allData.findIndex(element => element.id === elementId)
    state === 'open' ? allData[elementToUpdate].open = true : allData[elementToUpdate].open = false
    setAddLinkOnWords(allData)
  }

  return (
    <div className='section-content mb-2'>
      <p className='section-title m-0'>Curs/sesiune a avut loc</p>
      { courseDatePassed.map(element => {
        const objectKeyLocation = 'courseDateIsInPast'
        const paragraphNumber = element.name
        const state = addLinkOnWords.find(dataSet => dataSet.id === element.id)
        const hasWordsWithLinks = element?.linkWords?.length !== 0
        return (
          <div key={element.id} className='mt-2'>
            <TextFieldComponent
              hasEditPermission={!hasEditPermission}
              handleChange={handleChange}
              label={element.label}
              name={element.name}
              value={element.value}
              error={element.error}
              touched={element.touched}
              localStyles={localStyles}
              multiline={element.multiline}
              maxRows={element.maxRows}
              minRows= {element.minRows}
            />
            { element.wordsWithLink &&
              <div className={`${hasWordsWithLinks && 'add-and-show-words-with-links'}`}>
                <Button
                  onClick={() => handleOpenAddWordsWithLinksDialog(element.id, 'open')}
                  variant="contained"
                  className='mb-2'
                  disabled={!hasEditPermission}>
                  <span className='text-capitalize me-1'>
                    Adaugă
                  </span>
                  <span className='text-lowercase'>
                    link pe cuvânt
                  </span>
                </Button>
  
                <AddLinkOnWordsDialog
                  openDialog={state.open}
                  closeDialog={() => handleOpenAddWordsWithLinksDialog(element.id, 'close')}
                  storeDataAction={addWordsWithLinkOnCoursePresencePageData}
                  objectKeyLocation={objectKeyLocation}
                  paragraphNumber={paragraphNumber}
                />

                <ShowWordsWithLink
                  editPermission={!hasEditPermission}
                  data={element.linkWords}
                  removeWordAction={removeWordsWithLinkOnCoursePresencePageData}
                  objectKeyLocation={objectKeyLocation}
                  paragraphNumber={paragraphNumber}
                  localStyles={localStyles}
                />
              </div>
            }
          </div>
        )
      })

      }
    </div>
  )
}

export default CourseDateIsInPast