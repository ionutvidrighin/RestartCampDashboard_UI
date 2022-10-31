import React, { useState } from 'react';
import { formDataCourseZoomAccess } from './helperMethodsCoursePresence';
import { addWordsWithLinkOnCoursePresencePageData,
  removeWordsWithLinkOnCoursePresencePageData } from '../../../redux/actions/webPagesDataActions/coursePresencePageDataActions';
import { coursePageDataScenarios } from '../../../constants/coursePresencePageDataConstants';
import AddLinkOnWordsDialog from '../../ReusableComponents/WebpagesManipulation/AddLinkOnWordsDialog';
import ShowWordsWithLink from '../../ReusableComponents/WebpagesManipulation/ShowWordsWithLink';
import TextFieldComponent from '../../ReusableComponents/TextFieldComponent';
import Button from '@material-ui/core/Button';

const CourseZoomAccess = ({ hasEditPermission, FormikProps, localStyles }) => {
  const { values, handleChange, errors } = FormikProps

  const scenario = coursePageDataScenarios.access_course_on_zoom
  const courseZoomAccess = formDataCourseZoomAccess(values, errors)
  const [addLinkOnWords, setAddLinkOnWords] = useState(courseZoomAccess)

  const handleOpenAddWordsWithLinksDialog = (elementId, state) => {
    let allData = [...addLinkOnWords]
    allData = allData.map(element => ({...element, open: false}))
    const elementToUpdate = allData.findIndex(element => element.id === elementId)
    state === 'open' ? allData[elementToUpdate].open = true : allData[elementToUpdate].open = false
    setAddLinkOnWords(allData)
  }

  return (
    <div className='section-content mb-2'>
      <p className='section-title m-0'>Acces Curs/Sesiune Zoom</p>
      { courseZoomAccess.map(element => {
        const objectKeyLocation = scenario
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
              <div className={`${hasWordsWithLinks && 'add-and-show-words-with-links'} mb-5`}>
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

export default CourseZoomAccess