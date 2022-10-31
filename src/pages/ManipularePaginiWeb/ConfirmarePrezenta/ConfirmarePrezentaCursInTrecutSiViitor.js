import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursePresencePageData, 
  updateCoursePresencePageData,
  clearCoursePresencePageDataState } from '../../../redux/actions/webPagesDataActions/coursePresencePageDataActions';
import { clearServerResponse } from '../../../redux/actions/clearServerResponseAction';
import { doesUserHaveViewPermission, doesUserHaveEditPermission } from "../../../utils/helperFunctions";
import { appPagesConstants } from '../../../constants/userPermissions';
import { coursePageDataScenarios } from '../../../constants/coursePresencePageDataConstants';
import { makeStyles } from '@material-ui/styles';
import { Formik, Form } from "formik";
import { formValuesCourseDateInPast, formValuesCourseDateInFuture, formValidation } from './formValuesAndValidation';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import NoAccessPage from '../../../components/NoAccessPage';
import NoPermissionBanner from '../../../components/ReusableComponents/Banners/NoPermissionBanner';
import CourseDateIsInPast from '../../../components/EditingWebPages/CoursePresencePage/CourseDateIsInPast';
import CourseDateIsInFuture from '../../../components/EditingWebPages/CoursePresencePage/CourseDateIsInFuture';
import ContentCoureDateIsInPast from '../../../components/EditingWebPages/CoursePresencePage/PagesContent/ContentCoureDateIsInPast';
import ContentCourseDateIsInFuture from '../../../components/EditingWebPages/CoursePresencePage/PagesContent/ContentCourseDateIsInFuture';
import RingBellAndPageInstructionsBanner from '../../../components/ReusableComponents/Banners/RingBellAndPageInstructionsBanner';
import OverlayProgressCircle from '../../../components/ReusableComponents/OverlayProgressCircle/OverlayProgressCircle';
import SnackBar from '../../../components/ReusableComponents/SnackBar';

const useStyles = makeStyles({
  submitButton: {
    margin: 'auto 0',
    backgroundColor: '#509ecc', 
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    transition: '.5s ease all',
    "&:hover": {
      backgroundColor: '#c23a6a',
      transition: '.5s ease all'
    }
  },
})

const ConfirmarePrezentaCursInTrecutSiViitor = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.PAGINA_CONFIRMARE_PREZENTA, userPagesAccessFromStore)
  const hasEditPermission = doesUserHaveEditPermission(appPagesConstants.PAGINA_CONFIRMARE_PREZENTA, userPagesAccessFromStore)
  const permissions = {edit: hasEditPermission}
  
  const past_scenario = coursePageDataScenarios.course_date_is_in_past
  const future_scenario = coursePageDataScenarios.course_date_is_in_future
  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      dispatch(fetchCoursePresencePageData({scenario: [past_scenario, future_scenario] }))
    }

    // clear Store at component destroy
    return () => {
      dispatch(clearCoursePresencePageDataState())
    }
  }, [])

  const [loadingData, setLoadingData] = useState({ showCircle: false, circlePosition: 'center' })
  const [snackBar, setSnackBar] = useState({upDuration: 3000})

  // get Page data object from Redux
  const pageData = useSelector(state => {
    const pastData = state.coursePresencePageReducer?.[past_scenario]?.pageData
    const pastDataCollectionId = state.coursePresencePageReducer?.[past_scenario]?.collectionId

    const futureData = state.coursePresencePageReducer?.[future_scenario]?.pageData
    const futureDataCollectionId = state.coursePresencePageReducer?.[future_scenario]?.collectionId

    const serverResponseSuccess = state.coursePresencePageReducer?.success
    const serverResponseError = state.coursePresencePageReducer?.error
    const serverMessage = state.coursePresencePageReducer?.serverMessage
    return { pastData, pastDataCollectionId, futureData, futureDataCollectionId, serverResponseSuccess, serverResponseError, serverMessage }
  })
  const { pastData, pastDataCollectionId, futureData, futureDataCollectionId, serverResponseSuccess, serverResponseError, serverMessage } = pageData

  const formValuesPastCourse = formValuesCourseDateInPast(pastData)
  const formValuesFutureCourse = formValuesCourseDateInFuture(futureData)
  const formValidationPastCourse = formValidation.courseInPast
  const formValidationFutureCourse = formValidation.courseInFuture

  const handleShowLoadingPageData = () => {
    if ((pastData, futureData) || serverResponseSuccess) {
      setLoadingData({...loadingData, showCircle: false})
      setSnackBar({
        background: '#28cc95', 
        open: true,
        upDuration: 1000,
        text: 'Data Loaded Successfully'
      })
    } else {
      setLoadingData({...loadingData, showCircle: true})
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        text: serverResponseError
      })
    }
  }

  useEffect( () => {
    handleShowLoadingPageData()
  }, [pastData, futureData])

  const displayErrorBanner = (section) => {
    setSnackBar({
      ...snackBar,
      background: '#e53c5d', 
      open: true,
      success: false,
      text: `Eroare! Ai adăugat cuvânt/cuvinte cu link în *Paragraf*, in sectiunea "${section}". Fiecare cuvânt (din interiorul frazei) ce conține link, trebuie încadrat între paranteze pătrate, exemplu: [link]. Ulterior, cuvântul și link-ul acestuia, trebuie adăugate prin click pe butonul 'Adaugă link pe cuvânt'.`,
      upDuration: 40000
    })
  }

  const handleFormSubmitForCourseDateInThePast = (values) => {
    const wordsWithLinkInParagraph = (values.paragraph.match(/\[/g) || []).length
    if (values.linkWords.paragraph.length !== wordsWithLinkInParagraph) {
      displayErrorBanner('Curs/sesiune a avut loc')
      return
    }

    const payload = {
      [past_scenario]: {
        collectionId: pastDataCollectionId,
        [past_scenario]: values
      }
    }
    setLoadingData({...loadingData, showCircle: true})
    dispatch(updateCoursePresencePageData(payload))
  }

  const handleFormSubmitForCourseDateInTheFuture = (values) => {
    const wordsWithLinkInParagraph = (values.paragraph.match(/\[/g) || []).length
    if (values.linkWords.paragraph.length !== wordsWithLinkInParagraph) {
      displayErrorBanner('Curs/sesiune va avea loc in viitor')
      return
    }
    
    const payload = {
      [future_scenario]: {
        collectionId: futureDataCollectionId,
        [future_scenario]: values
      }
    }
    setLoadingData({...loadingData, showCircle: true})
    dispatch(updateCoursePresencePageData(payload))
  }

  const displaySnackBar = () => {
    if (serverMessage === 'Page Data Updated Successfully') {
      setSnackBar({
        ...snackBar,
        background: '#28cc95',
        open: true,
        success: true,
        upDuration: 12000,
        text: serverMessage
      })
      dispatch(clearServerResponse())
      setLoadingData({...loadingData, showCircle: false})
    }

    if (serverMessage === 'Page Data could not be updated') {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        upDuration: 12000,
        text: serverResponseError
      })
      dispatch(clearServerResponse())
      setLoadingData({...loadingData, showCircle: false})
    }
  }

  // watch Redux updates for back-end response
  // on updating the page data information
  useEffect(() => {
    displaySnackBar()
  }, [serverMessage])
 

  return (
    <> 
      { hasViewPermission ?
        <>
          <OverlayProgressCircle overlaySetup={loadingData} />
          <div className='confirmare-prezenta d-flex' style={{pointerEvents: loadingData.showCircle ? 'none': 'auto'}}>

            {/* show page when data is fully loaded */}
            { (pastData || futureData) && 
              <>
                { hasEditPermission ?
                  <RingBellAndPageInstructionsBanner position={'70px'} />
                  :
                  <NoPermissionBanner permissions={permissions} />
                }

                <section className='left-section me-2'>
                  <h6> EDITARE PAGINA CONFIRMARE PREZENȚĂ </h6>
                  <Divider style={{background: 'white'}} className="mb-5" />

                  <Formik
                    enableReinitialize={true}
                    initialValues={formValuesPastCourse}
                    validationSchema={formValidationPastCourse}
                    onSubmit={values => handleFormSubmitForCourseDateInThePast(values)}>
                  {(props) => (
                    <Form style={{marginTop: '4rem'}}>
                      <CourseDateIsInPast 
                        FormikProps={props}
                        hasEditPermission={hasEditPermission}
                      />
                      <div className='d-flex justify-content-center'>
                        <Button variant='contained'
                          type="submit"
                          className={localStyles.submitButton}
                          disabled={!hasEditPermission}> 
                          Confirmă modificările
                        </Button>
                      </div>
                    </Form>
                  )}
                  </Formik>

                  <br />
                  <br />
                  <br />

                  <Formik
                    enableReinitialize={true}
                    initialValues={formValuesFutureCourse}
                    validationSchema={formValidationFutureCourse}
                    onSubmit={values => handleFormSubmitForCourseDateInTheFuture(values)}>
                  {(props) => (
                    <Form>
                      <CourseDateIsInFuture 
                        FormikProps={props}
                        hasEditPermission={hasEditPermission}
                      />
                      <div className='d-flex justify-content-center'>
                        <Button variant='contained'
                          type="submit"
                          className={localStyles.submitButton}
                          disabled={!hasEditPermission}> 
                          Confirmă modificările
                        </Button>
                      </div>
                    </Form>
                  )}
                  </Formik>
                </section>

                {/* Showing Edited PageData Content */}
                <div className='pages-content d-flex flex-column' style={{flex: 1}}>
                  <ContentCoureDateIsInPast pageData={pastData} />
                  <ContentCourseDateIsInFuture pageData={futureData} />
                </div>
              </>
            }

            { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
          </div>
        </>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default ConfirmarePrezentaCursInTrecutSiViitor
