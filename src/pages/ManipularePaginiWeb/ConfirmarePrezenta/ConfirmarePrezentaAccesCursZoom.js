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
import { formValuesForCourseZoomAccess, formValidation } from './formValuesAndValidation';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import NoAccessPage from '../../../components/NoAccessPage';
import NoPermissionBanner from '../../../components/ReusableComponents/Banners/NoPermissionBanner';
import CourseZoomAccess from '../../../components/EditingWebPages/CoursePresencePage/CourseZoomAccess';
import ContentCourseZoomAccess from '../../../components/EditingWebPages/CoursePresencePage/PagesContent/ContentCourseZoomAccess';
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

const ConfirmarePrezentaAccesCursZoom = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.PAGINA_CONFIRMARE_PREZENTA, userPagesAccessFromStore)
  const hasEditPermission = doesUserHaveEditPermission(appPagesConstants.PAGINA_CONFIRMARE_PREZENTA, userPagesAccessFromStore)
  const permissions = {edit: hasEditPermission}
  
  const scenario = coursePageDataScenarios.access_course_on_zoom

  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      dispatch(fetchCoursePresencePageData({scenario: [scenario]}))
    }

    // clear Store at component destroy
    return () => {
      dispatch(clearCoursePresencePageDataState())
    }
  }, [])

  const [loadingData, setLoadingData] = useState({ showCircle: false, circlePosition: 'center' })
  const [snackBar, setSnackBar] = useState({upDuration: 3000})

  // get Page data object from Redux
  const reduxData = useSelector(state => {
    const pageData = state.coursePresencePageReducer?.[scenario]?.pageData
    const pastDataCollectionId = state.coursePresencePageReducer?.[scenario]?.collectionId
    const serverResponseSuccess = state.coursePresencePageReducer?.success
    const serverResponseError = state.coursePresencePageReducer?.error
    const serverMessage = state.coursePresencePageReducer?.serverMessage
    return { pageData, pastDataCollectionId, serverResponseSuccess, serverResponseError, serverMessage }
  })
  const { pageData, pastDataCollectionId, serverResponseSuccess, serverResponseError, serverMessage } = reduxData

  const formValues = formValuesForCourseZoomAccess(pageData)
  const formValidations = formValidation.zoomAccess

  const handleShowLoadingPageData = () => {
    if (pageData || serverResponseSuccess) {
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
  }, [pageData])

  const displayErrorBanner = () => {
    setSnackBar({
      ...snackBar,
      background: '#e53c5d', 
      open: true,
      success: false,
      text: `Eroare! Ai adăugat cuvânt/cuvinte cu link în *Paragraf*. Fiecare cuvânt (din interiorul frazei) ce conține link, trebuie încadrat între paranteze pătrate, exemplu: [link]. Ulterior, cuvântul și link-ul acestuia, trebuie adăugate prin click pe butonul 'Adaugă link pe cuvânt'.`,
      upDuration: 40000
    })
  }

  const handleFormSubmitForCourseDateInThePast = (values) => {
    const wordsWithLinkInParagraph = (values.paragraph.match(/\[/g) || []).length
    if (values.linkWords.paragraph.length !== wordsWithLinkInParagraph) {
      displayErrorBanner()
      return
    }

    const payload = {
      [scenario]: {
        collectionId: pastDataCollectionId,
        [scenario]: values
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
            { pageData && 
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
                    initialValues={formValues}
                    validationSchema={formValidations}
                    onSubmit={values => handleFormSubmitForCourseDateInThePast(values)}>
                  {(props) => (
                    <Form style={{marginTop: '4rem'}}>
                      <CourseZoomAccess 
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
                <ContentCourseZoomAccess pageData={pageData} />
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

export default ConfirmarePrezentaAccesCursZoom
