import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursePresencePageData, 
  updateCoursePresencePageData,
  clearCoursePresencePageDataState } from '../../../redux/actions/webPagesDataActions/coursePresencePageDataActions';
import { clearServerResponse } from '../../../redux/actions/clearServerResponseAction';
import { doesUserHaveViewPermission, doesUserHaveEditPermission } from "../../../utils/helperFunctions";
import { appPagesConstants } from '../../../constants/userPermissions';
import { makeStyles } from '@material-ui/styles';
import { Formik, Form } from "formik";
import { formValues, formValidation } from './formValuesAndValidation';
import isEqual from 'lodash.isequal';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import NoAccessPage from '../../../components/NoAccessPage';
import NoPermissionBanner from '../../../components/ReusableComponents/Banners/NoPermissionBanner';
import HowToOperateOnPage from '../../../components/EditingWebPages/CoursePresence/HowToOperateOnPage';
import EditContentForMoreThan30minBeforeCourseStart from '../../../components/EditingWebPages/CoursePresence/EditContentForMoreThan30minBeforeCourseStart';
import EditContentForLessThan30minBeforeCourseStart from '../../../components/EditingWebPages/CoursePresence/EditContentForLessThan30minBeforeCourseStart';
import ShowPageContent from '../../../components/EditingWebPages/CoursePresence/ShowPageContent';
import RingBellAndPageInstructionsBanner from '../../../components/ReusableComponents/Banners/RingBellAndPageInstructionsBanner';
import OverlayProgressCircle from '../../../components/ReusableComponents/OverlayProgressCircle/OverlayProgressCircle';
import SnackBar from '../../../components/ReusableComponents/SnackBar';

const useStyles = makeStyles({
  textField: {
    width: '280px',
    marginBottom: '.5rem',
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

const ConfirmarePrezenta = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.PAGINA_CONFIRMARE_PREZENTA, userPagesAccessFromStore)
  const hasEditPermission = doesUserHaveEditPermission(appPagesConstants.PAGINA_CONFIRMARE_PREZENTA, userPagesAccessFromStore)
  const permissions = {edit: hasEditPermission}
  
  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      dispatch(fetchCoursePresencePageData())
    }

    // clear Store at component destroy
    return () => {
      dispatch(clearCoursePresencePageDataState())
    }
  }, [])

  const [loadingData, setLoadingData] = useState({ showCircle: false, circlePosition: 'center' })
  const [snackBar, setSnackBar] = useState({upDuration: 3000})

  // grab the Page data object from Redux
  const coursePresencePageData = useSelector(state => {
    const dataObject = state.coursePresencePageReducer.data
    const serverResponse = state.coursePresencePageReducer.success
    const serverMessage = state.coursePresencePageReducer?.serverMessage
    return { dataObject, serverResponse, serverMessage }
  })
  const { dataObject, serverResponse, serverMessage } = coursePresencePageData

  const formInitialValues = formValues(coursePresencePageData.dataObject)
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

  const [presenceConfirmFormTitleOnMultipleRows, setPresenceConfirmFormTitleOnMultipleRows] = useState(false)
  const handleSelectFormTitleOnMultipleRows = (e) => {
    setPresenceConfirmFormTitleOnMultipleRows(e.target.checked)
  }

  const handleFormSubmit = (values) => {
    if ( isEqual(values, formInitialValues) ) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true, 
        success: false,
        upDuration: 6000,
        text: "Eroare! Nicio modificare detectată!"
      })
      return
    }

    // check if user followed the correct instructions 
    // related to having the Form Title on 2 rows
    const confirmPresenceFormTitle = values.lessThan30Min.formTitle
    if ( !confirmPresenceFormTitle.includes('[break]') ) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        text: 'Eroare! Ai selectat "Titlu Formular pe mai multe rânduri" fără a nota locul/locurile de separare.',
        upDuration: 12000
      })
      return
    }
    if (!presenceConfirmFormTitleOnMultipleRows && confirmPresenceFormTitle.includes('[break]')) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d',
        open: true,
        success: false,
        upDuration: 12000,
        text: 'Eroare! Ai notat locuri de separare a Titlului Formular fără a bifa "Titlu Formular pe mai multe rânduri".'
      })
      return
    }

    // Add all Words with Links to the final Payload object
    Object.assign(values, {
      lessThan30Min: {
        ...values.lessThan30Min,
        linkWords: dataObject.lessThan30Min.linkWords
      },
      moreThan30Min: {
        ...values.moreThan30Min,
        linkWords: dataObject.moreThan30Min.linkWords
      }
    })

    setLoadingData({...loadingData, showCircle: true})
    dispatch(updateCoursePresencePageData(values))
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
      { hasViewPermission ?
        <>
          <OverlayProgressCircle overlaySetup={loadingData} />
          <div className='confirmare-prezenta d-flex' style={{pointerEvents: loadingData.showCircle ? 'none': 'auto'}}>

            {/* show page when data is fully loaded */}
            { dataObject && 
              <>
                { hasEditPermission ?
                  <RingBellAndPageInstructionsBanner position={'60px'} Component={HowToOperateOnPage} />
                  :
                  <NoPermissionBanner permissions={permissions} />
                }

                <section className='left-section me-2'>
                  <h6> EDITARE PAGINA CONFIRMARE PREZENȚĂ </h6>
                  <Divider style={{background: 'white'}} className="mb-5" />

                  <Formik
                    initialValues={formInitialValues}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={values => handleFormSubmit(values)}>
                  {(props) => (
                    <Form>
                      <EditContentForMoreThan30minBeforeCourseStart 
                        FormikProps={props} 
                        localStyles={localStyles}
                        wordsWithLinks={dataObject?.moreThan30Min?.linkWords}
                        editPermission={!hasEditPermission}
                      />
                      <EditContentForLessThan30minBeforeCourseStart
                        FormikProps={props}
                        localStyles={localStyles}
                        formTitleMultipleRows={handleSelectFormTitleOnMultipleRows}
                        wordsWithLinks={dataObject?.lessThan30Min?.linkWords}
                        editPermission={!hasEditPermission}
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

export default ConfirmarePrezenta
