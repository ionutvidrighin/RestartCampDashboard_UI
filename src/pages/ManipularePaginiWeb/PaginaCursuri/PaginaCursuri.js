import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/styles';
import { fetchCoursesPageData,
  updateCoursesPageData,
  clearCoursesPageDataState } from "../../../redux/actions/webPagesDataActions/coursesPageDataActions";
import { clearServerResponse } from '../../../redux/actions/clearServerResponseAction';
import { doesUserHaveViewPermission, doesUserHaveEditPermission } from "../../../utils/helperFunctions";
import { appPagesConstants } from '../../../constants/userPermissions';
import { formValues, formValidation } from './formValuesAndValidation';
import { Formik, Form } from "formik";
import isEqual from 'lodash.isequal';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import NoAccessPage from '../../../components/NoAccessPage';
import NoPermissionBanner from '../../../components/ReusableComponents/Banners/NoPermissionBanner';
import HowToOperateOnPage from '../../../components/EditingWebPages/CoursesPage/HowToOperateOnPage';
import EditStripeInfoCourses from '../../../components/EditingWebPages/CoursesPage/EditStripeInfoCourses';
import EditStripeInfoPractice from '../../../components/EditingWebPages/CoursesPage/EditStripeInfoPractice';
import EditInfoCoursesModule1 from '../../../components/EditingWebPages/CoursesPage/EditInfoCoursesModule1';
import EditInfoCoursesModule2 from '../../../components/EditingWebPages/CoursesPage/EditInfoCoursesModule2';
import ShowPageContent from '../../../components/EditingWebPages/CoursesPage/ShowPageContent';
import RingBellAndPageInstructionsBanner from '../../../components/ReusableComponents/Banners/RingBellAndPageInstructionsBanner';
import OverlayProgressCircle from '../../../components/ReusableComponents/OverlayProgressCircle/OverlayProgressCircle';
import SnackBar from '../../../components/ReusableComponents/SnackBar';
 
const useStyles = makeStyles({
  textField: {
    width: '280px',
    marginBottom: '1rem !important',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(10px, 5px) scale(0.75)'
    },
    "& .MuiFormLabel-root": {
      color: 'white'
    },
    "& .MuiInputBase-root": {
      color: 'white'
    }
  },
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

const PaginaCursuri = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.PAGINA_CURSURI, userPagesAccessFromStore)
  const hasEditPermission = doesUserHaveEditPermission(appPagesConstants.PAGINA_CURSURI, userPagesAccessFromStore)

  const permissions = { edit: hasEditPermission }

  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      dispatch(fetchCoursesPageData())
    }

    // clear Store at component destroy
    return () => {
      dispatch(clearCoursesPageDataState())
    }
  }, [])

  const [loadingData, setLoadingData] = useState({ showCircle: false, circlePosition: 'center' })
  const [snackBar, setSnackBar] = useState({upDuration: 3000})

  // grab the Page data object from Redux
  const coursesPageData = useSelector(state => {
    const dataObject = state.coursesPageReducer.data
    const serverResponse = state.coursesPageReducer.success
    const serverMessage = state.coursesPageReducer?.serverMessage
    const error = state.coursesPageReducer?.error
    const module1WordsWithLinks = state.coursesPageReducer.data?.infoCoursesModule1?.linkWords
    const module2WordsWithLinks = state.coursesPageReducer.data?.infoCoursesModule2?.linkWords
    return { dataObject, serverResponse, serverMessage, error, module1WordsWithLinks, module2WordsWithLinks }
  })
  const { dataObject, serverResponse, serverMessage, error, module1WordsWithLinks, module2WordsWithLinks } = coursesPageData

  const formInitialValues = formValues(dataObject)
  const FORM_VALIDATION = formValidation 

  const handleShowLoadingPageData = () => {
    if (dataObject || serverResponse) {
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
      text: `Eroare! Ai adăugat cuvânt/cuvinte cu link în Paragraful ${paragraphNumber}, secțiunea ${section}. Fiecare cuvânt (din interiorul frazei) ce conține link, trebuie încadrat între paranteze pătrate, exemplu: [link]. Ulterior, cuvântul și link-ul acestuia, trebuie adăugate prin click pe butonul 'Adaugă link pe cuvânt'.`,
      upDuration: 40000
    })
  }

  const handleFormSubmit = (values) => {
    // Below checks are needed to ensure user fulfils the requirement related to adding links on words
    // every word with link needs to be encapsulated within square brackets, as -> [link] , inside the TextField
    // and then added to the dedicated section for each Paragraph, clicking on "Adaugă link pe cuvânt" button.
    const wordLinksInModule1Paragraph1 = (values.infoCoursesModule1.paragraph1.match(/\[/g) || []).length
    const wordLinksInModule1Paragraph2 = (values.infoCoursesModule1.paragraph2.match(/\[/g) || []).length
    const wordLinksInModule2Paragraph = (values.infoCoursesModule2.paragraph.match(/\[/g) || []).length
    const MODULE_1_SECTION = 'Info Cursuri Modul 1'
    const MODULE_2_SECTION = 'Info Cursuri Modul 2'

    if (module1WordsWithLinks.paragraph1.length !== wordLinksInModule1Paragraph1) {
      displayErrorBanner(1, MODULE_1_SECTION)
      return
    }

    if (module1WordsWithLinks.paragraph2.length !== wordLinksInModule1Paragraph2) {
      displayErrorBanner(2, MODULE_1_SECTION)
      return
    }

    if (module2WordsWithLinks.paragraph.length !== wordLinksInModule2Paragraph) {
      displayErrorBanner(null, MODULE_2_SECTION)
      return
    }

    setLoadingData({...loadingData, showCircle: true})
    dispatch(updateCoursesPageData(values))
  }

  const displaySnackBar = () => {
    if (serverMessage) {
      if (error) {
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
      } else {
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
    }
  }

  // watch Redux updates for back-end response
  // on updating the page data information
  useEffect(() => {
    displaySnackBar()
  }, [serverMessage, error])
 

  return (
    <>
      { hasViewPermission ?
        <>
          <OverlayProgressCircle overlaySetup={loadingData} />
          <div className='pagina-cursuri d-flex' style={{pointerEvents: loadingData.showCircle ? 'none': 'auto'}}>
    
            {/* show page when data is fully loaded */}
            { dataObject && 
              <>
                {/* Editing PageData Section */}
                { hasEditPermission ?
                  <RingBellAndPageInstructionsBanner Component={HowToOperateOnPage} />
                  :
                  <NoPermissionBanner permissions={permissions} /> }
            
                <section className='left-section me-2'>
                  <h6> EDITARE CONTENT PAGINA CURSURI </h6>
                  <Divider style={{background: 'white'}} className="mb-5" />
            
                  <Formik
                    enableReinitialize={true}
                    initialValues={formInitialValues}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={values => handleFormSubmit(values)}>
                  {(props) => (
                      <Form>
                        <EditStripeInfoCourses localStyles={localStyles} FormikProps={props} editPermission={!hasEditPermission} />
                        <EditInfoCoursesModule1 localStyles={localStyles} FormikProps={props} editPermission={!hasEditPermission} />
                        <EditStripeInfoPractice localStyles={localStyles} FormikProps={props} editPermission={!hasEditPermission} />
                        <EditInfoCoursesModule2 localStyles={localStyles} FormikProps={props} editPermission={!hasEditPermission} />

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
                <ShowPageContent data={dataObject} />
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

export default PaginaCursuri
