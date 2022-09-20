import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/styles';
import { fetchCoursesPageData,
  updateCoursesPageData,
  clearCoursesPageDataState } from "../../../redux/actions/webPagesDataActions/coursesPageDataActions";
import { clearServerResponse } from '../../../redux/actions/clearServerResponseAction';
import { doesUserHavePermission } from "../../../utils/helperFunctions"; 
import { formValues, formValidation } from './formValuesAndValidation';
import { Formik, Form } from "formik";
import isEqual from 'lodash.isequal';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import NoAccessPage from '../../../components/NoAccessPage';
import HowToOperateOnPage from '../../../components/EditingWebPages/CoursesPage/HowToOperateOnPage';
import EditStripeInfoCourses from '../../../components/EditingWebPages/CoursesPage/EditStripeInfoCourses';
import EditStripeInfoPractice from '../../../components/EditingWebPages/CoursesPage/EditStripeInfoPractice';
import EditInfoCoursesModule1 from '../../../components/EditingWebPages/CoursesPage/EditInfoCoursesModule1';
import EditInfoCoursesModule2 from '../../../components/EditingWebPages/CoursesPage/EditInfoCoursesModule2';
import ShowPageContent from '../../../components/EditingWebPages/CoursesPage/ShowPageContent';
import DisplayRingBellAndBanner from '../../../components/ReusableComponents/DisplayRingBellAndBanner';
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
  const route = useLocation()
  const { pathname } = route

  const getUserPagesAccessFromStore = useSelector(state => state.authReducer.pagesPermission)
  const userHasPermission = doesUserHavePermission(pathname, getUserPagesAccessFromStore)

  useEffect(() => {
    setShowPlaceholder(false)
    if (userHasPermission) {
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
    const module1WordsWithLinks = state.coursesPageReducer.data?.infoCoursesModule1?.linkWords
    const module2WordsWithLinks = state.coursesPageReducer.data?.infoCoursesModule2?.linkWords
    return { dataObject, serverResponse, serverMessage, module1WordsWithLinks, module2WordsWithLinks }
  })
  const { dataObject, serverResponse, serverMessage, module1WordsWithLinks, module2WordsWithLinks } = coursesPageData

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


  const handleFormSubmit = (values) => {
    if (isEqual(values, formInitialValues)) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true, 
        success: false,
        upDuration: 8000,
        text: "Eroare! Nicio modificare detectată!"
      })
      return
    }

    // check if user followed the correct instructions 
    // for having the section Titles on 2 rows
    const courseModule1Title = values.infoCoursesModule1.title
    const courseModule2Title = values.infoCoursesModule2.title
    if (!courseModule1Title.includes('[break]') || !courseModule2Title.includes('[break]')) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Eroare! Titlul Cursuri Modul 1 sau Titlul Cursuri Modul 2, nu conțin caracterele '[break]' pentru separarea pe 2 rânduri.",
        upDuration: 30000
      })
      return
    }

    // Following checks are needed to ensure user fulfils the requirement related to adding links on words
    // every word with link needs to be encapsulated within square brackets, as -> [link] , inside the TextField
    // and then added to the dedicated section for each Paragraph, clicking on "Adaugă link pe cuvânt" button.
    const occurenceInModule1Paragraph1 = (values.infoCoursesModule1.paragraph1.match(/\[/g) || []).length
    const occurenceInModule1Paragraph2 = (values.infoCoursesModule1.paragraph2.match(/\[/g) || []).length
    const occurenceInModule2Paragraph = (values.infoCoursesModule2.paragraph.match(/\[/g) || []).length

    if (module1WordsWithLinks.paragraph1.length !== occurenceInModule1Paragraph1) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Eroare! Ai adăugat cuvânt/cuvinte cu link în Paragraful 1, secțiunea 'Info Cursuri Modul 1'. Fiecare cuvânt (din interiorul frazei) ce conține link, trebuie încadrat între paranteze pătrate, exemplu: [link]. Ulterior, cuvântul și link-ul acestuia, trebuie adăugate prin click pe butonul 'Adaugă link pe cuvânt'.",
        upDuration: 30000
      })
      return
    }

    if (module1WordsWithLinks.paragraph2.length !== occurenceInModule1Paragraph2) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Eroare! Ai adăugat cuvânt/cuvinte cu link în Paragraful 2, secțiunea 'Info Cursuri Modul 1'. Fiecare cuvânt (din interiorul frazei) ce conține link, trebuie încadrat între paranteze pătrate, exemplu: [link]. Ulterior, cuvântul și link-ul acestuia, trebuie adăugate prin click pe butonul 'Adaugă link pe cuvânt'.",
        upDuration: 30000
      })
      return
    }

    if (module2WordsWithLinks.paragraph.length !== occurenceInModule2Paragraph) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        text: "Eroare! Ai adăugat cuvânt/cuvinte cu link în Paragraf, secțiunea 'Info Cursuri Modul 2'. Fiecare cuvânt (din interiorul frazei) ce conține link, trebuie încadrat între paranteze pătrate, exemplu: [link]. Ulterior, cuvântul și link-ul acestuia, trebuie adăugate prin click pe butonul 'Adaugă link pe cuvânt'.",
        upDuration: 30000
      })
      return
    }

    // Add all Words with Links to the final Payload object
    Object.assign(values, {
      infoCoursesModule1: {
        ...values.infoCoursesModule1,
        linkWords: module1WordsWithLinks
      },
      infoCoursesModule2: {
        ...values.infoCoursesModule2,
        linkWords: module2WordsWithLinks
      }
    })

    setLoadingData({...loadingData, showCircle: true})
    dispatch(updateCoursesPageData(values))
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
      { userHasPermission ?
        <>
          <OverlayProgressCircle overlaySetup={loadingData} />
          <div className='pagina-cursuri d-flex' style={{pointerEvents: loadingData.showCircle ? 'none': 'auto'}}>
    
            {/* show page when data is fully loaded */}
            { dataObject && 
              <>
                {/* Editing PageData Section */}
                <DisplayRingBellAndBanner Component={HowToOperateOnPage} />
                <section className='left-section me-2'>
                  <h6> EDITARE CONTENT PAGINA CURSURI </h6>
                  <Divider style={{background: 'white'}} className="mb-5" />
            
                  <Formik
                    initialValues={formInitialValues}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={values => handleFormSubmit(values)}>
                  {(props) => (
                      <Form>
                        <EditStripeInfoCourses localStyles={localStyles} FormikProps={props} />
                        <EditInfoCoursesModule1 localStyles={localStyles} FormikProps={props} />
                        <EditStripeInfoPractice localStyles={localStyles} FormikProps={props} />
                        <EditInfoCoursesModule2 localStyles={localStyles} FormikProps={props} />

                        <div className='d-flex justify-content-center'>
                          <Button variant='contained' type="submit" className={localStyles.submitButton}> 
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
