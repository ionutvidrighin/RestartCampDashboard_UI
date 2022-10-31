import React, { useState } from 'react';
import { formDataForMoreThan30min, formDataForLessThan30min } from './helperMethodsCoursePresence';
import { addWordsWithLinkOnCoursePresencePageData,
  removeWordsWithLinkOnCoursePresencePageData } from '../../../redux/actions/webPagesDataActions/coursePresencePageDataActions';
import AddLinkOnWordsDialog from '../../ReusableComponents/WebpagesManipulation/AddLinkOnWordsDialog';
import ShowWordsWithLink from '../../ReusableComponents/WebpagesManipulation/ShowWordsWithLink';
import TextFieldComponent from '../../ReusableComponents/TextFieldComponent';
import Button from '@material-ui/core/Button';

const CourseDateIsInPresent = ({ hasEditPermission, FormikProps, localStyles }) => {
  const { values: {moreThan30min, lessThan30min}, handleChange, errors } = FormikProps

  const moreThan30Min = formDataForMoreThan30min(moreThan30min, errors)
  const lessThan30Min = formDataForLessThan30min(lessThan30min, errors)
  const [addLinkOnWords, setAddLinkOnWords] = useState(moreThan30Min.concat(lessThan30Min))

  const handleOpenAddWordsWithLinksDialog = (elementId, state) => {
    let allData = [...addLinkOnWords]
    allData = allData.map(element => ({...element, open: false}))
    const elementToUpdate = allData.findIndex(element => element.id === elementId)
    state === 'open' ? allData[elementToUpdate].open = true : allData[elementToUpdate].open = false
    setAddLinkOnWords(allData)
  }

  return (
    <>
      <div className='section-content mb-4'>
        <p className='section-title m-0'>Acces cu mai mult de 30min.</p>
        <p></p>

        { moreThan30Min.map((element, i) => {
          const objectKeyLocation = element.name.split('.')[0]
          const paragraphNumber = element.name.split('.')[1]
          const state = addLinkOnWords.find(dataSet => dataSet.id === element.id)
          const hasWordsWithLinks = element?.linkWords?.length !== 0
          const lastArrayElement = moreThan30Min[moreThan30Min.length - 1]

          return (
            <div key={element.id}>
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
                <div className={`${hasWordsWithLinks && 'add-and-show-words-with-links'} ${(lastArrayElement.id !== element.id) && 'mb-5'}`}>
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
                    objectKeyLocation={`courseDateIsInPresent-${objectKeyLocation}`}
                    paragraphNumber={paragraphNumber}
                  />
  
                  <ShowWordsWithLink
                    editPermission={!hasEditPermission}
                    data={element.linkWords}
                    removeWordAction={removeWordsWithLinkOnCoursePresencePageData}
                    objectKeyLocation={`courseDateIsInPresent-${objectKeyLocation}`}
                    paragraphNumber={paragraphNumber}
                    localStyles={localStyles}
                  />
                </div>
              }
            </div>
        )})}
      </div>

      <br />

      <div className='section-content mb-4'>
        <p className='section-title m-0'>Acces cu mai putin de 30min.</p>
        <p></p>
        { lessThan30Min.map((element, i) => {
          const objectKeyLocation = element.name.split('.')[0]
          const paragraphNumber = element.name.split('.')[1]
          const state = addLinkOnWords.find(dataSet => dataSet.id === element.id)
          const hasWordsWithLinks = element?.linkWords?.length !== 0
          return (
            <div key={i}>
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
                    objectKeyLocation={`courseDateIsInPresent-${objectKeyLocation}`}
                    paragraphNumber={paragraphNumber}
                  />
  
                  <ShowWordsWithLink
                    editPermission={!hasEditPermission}
                    data={element.linkWords}
                    removeWordAction={removeWordsWithLinkOnCoursePresencePageData}
                    objectKeyLocation={`courseDateIsInPresent-${objectKeyLocation}`}
                    paragraphNumber={paragraphNumber}
                  />
                </div>
              }
            </div>
        )})}
      </div>
    </>
  )
}

export default CourseDateIsInPresent