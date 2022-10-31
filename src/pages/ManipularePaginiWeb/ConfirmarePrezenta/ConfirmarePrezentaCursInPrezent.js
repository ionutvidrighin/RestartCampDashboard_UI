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
import { formValuesCourseDateInPresent, formValidation } from './formValuesAndValidation';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import NoAccessPage from '../../../components/NoAccessPage';
import NoPermissionBanner from '../../../components/ReusableComponents/Banners/NoPermissionBanner';
import CourseDateIsInPresent from '../../../components/EditingWebPages/CoursePresencePage/CourseDateIsInPresent';
import ContentCourseDateIsInPresent from '../../../components/EditingWebPages/CoursePresencePage/PagesContent/ContentCourseDateIsInPresent';
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

const ConfirmarePrezentaCursInPrezent = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.PAGINA_CONFIRMARE_PREZENTA, userPagesAccessFromStore)
  const hasEditPermission = doesUserHaveEditPermission(appPagesConstants.PAGINA_CONFIRMARE_PREZENTA, userPagesAccessFromStore)
  const permissions = {edit: hasEditPermission}
  
  const scenario = coursePageDataScenarios.course_date_is_in_present
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
  const pageData = useSelector(state => {
    const dataObject = state.coursePresencePageReducer?.[scenario]?.pageData
    const collectionId = state.coursePresencePageReducer?.[scenario]?.collectionId
    const severSuccess = state.coursePresencePageReducer?.success
    const serverMessage = state.coursePresencePageReducer?.message
    return { dataObject, collectionId, severSuccess, serverMessage }
  })
  const { dataObject, collectionId, severSuccess, serverMessage } = pageData

  const formInitialValues = formValuesCourseDateInPresent(dataObject)
  const FORM_VALIDATION = formValidation.courseInPresent

  const handleShowLoadingPageData = () => {
    if (dataObject || severSuccess) {
      setLoadingData({...loadingData, showCircle: false})
      setSnackBar({
        background: '#28cc95', 
        open: true,
        upDuration: 500,
        text: 'Data Loaded Successfully'
      })
    } else {
      setLoadingData({...loadingData, showCircle: true})
      setSnackBar({
        background: '#e53c5d', 
        open: true,
        text: serverMessage
      })
    }
  }

  useEffect( () => {
    handleShowLoadingPageData()
  }, [dataObject])

  const displayErrorBanner = (paragraphNumber, section) => {
    setSnackBar({
      ...snackBar,
      background: '#e53c5d', 
      open: true,
      success: false,
      text: `Eroare! Ai adăugat cuvânt/cuvinte cu link în *Paragraful ${paragraphNumber}*, secțiunea '${section}'. Fiecare cuvânt (din interiorul frazei) ce conține link, trebuie încadrat între paranteze pătrate, exemplu: [link]. Ulterior, cuvântul și link-ul acestuia, trebuie adăugate prin click pe butonul 'Adaugă link pe cuvânt'.`,
      upDuration: 40000
    })
  }

  const handleFormSubmit = (values) => {
    // Below checks are needed to ensure user fulfils the requirement related to adding links on words
    // every word with link needs to be encapsulated within square brackets, as -> [link] , inside the TextField
    // and then added to the dedicated section for each Paragraph, clicking on "Adaugă link pe cuvânt" button.
    const linksInMoreThan30minParagraph1 = (values.moreThan30min.paragraph1.match(/\[/g) || []).length
    const linksInMoreThan30minParagraph2 = (values.moreThan30min.paragraph2.match(/\[/g) || []).length
    const linksInMoreThan30minParagraph3 = (values.moreThan30min.paragraph3.match(/\[/g) || []).length
    const linksInLessThan30minParagraph1 = (values.lessThan30min.paragraph1.match(/\[/g) || []).length
    const linksInLessThan30minParagraph2 = (values.lessThan30min.paragraph2.match(/\[/g) || []).length
    const MORE_THAN_30MIN_SECTION_NAME = 'Acces cu mai mult de 30min.'
    const LESS_THAN_30MIN_SECTION_NAME = 'Acces cu mai putin de 30min.'

    if (values.moreThan30min.linkWords.paragraph1.length !== linksInMoreThan30minParagraph1) {
      displayErrorBanner(1, MORE_THAN_30MIN_SECTION_NAME)
      return
    }
    if (values.moreThan30min.linkWords.paragraph2.length !== linksInMoreThan30minParagraph2) {
      displayErrorBanner(2, MORE_THAN_30MIN_SECTION_NAME)
      return
    }
    if (values.moreThan30min.linkWords.paragraph3.length !== linksInMoreThan30minParagraph3) {
      displayErrorBanner(3, MORE_THAN_30MIN_SECTION_NAME)
      return
    }
    if (values.lessThan30min.linkWords.paragraph1.length !== linksInLessThan30minParagraph1) {
      displayErrorBanner(1, LESS_THAN_30MIN_SECTION_NAME)
      return
    }
    if (values.lessThan30min.linkWords.paragraph2.length !== linksInLessThan30minParagraph2) {
      displayErrorBanner(2, LESS_THAN_30MIN_SECTION_NAME)
      return
    }
 
    const payload = {
      [scenario]: {
        collectionId,
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
    } else if (serverMessage === 'Page Data Could Not Be Updated') {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        upDuration: 12000,
        text: serverMessage
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
            { dataObject && 
              <>
                { hasEditPermission ?
                  <RingBellAndPageInstructionsBanner position={'60px'} />
                  :
                  <NoPermissionBanner permissions={permissions} />
                }

                <section className='left-section me-2'>
                  <h6> EDITARE PAGINA CONFIRMARE PREZENȚĂ </h6>
                  <Divider style={{background: 'white'}} className="mb-5" />

                  <Formik
                    enableReinitialize={true}
                    initialValues={formInitialValues}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={values => handleFormSubmit(values)}>
                  {(props) => (
                    <Form>
                      <CourseDateIsInPresent 
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
                <ContentCourseDateIsInPresent pageData={dataObject} />
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

export default ConfirmarePrezentaCursInPrezent
