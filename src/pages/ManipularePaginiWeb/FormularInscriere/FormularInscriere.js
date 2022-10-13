import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistrationFormAlerts,
  updateRegistrationFormAlerts,
  clearRegistrationFormAlertsState } from '../../../redux/actions/webPagesDataActions/registrationFormAlertsActions';
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
import HowToOperateOnPage from '../../../components/EditingWebPages/RegistrationFormPage/HowToOperateOnPage';
import EditErrorAlerts from '../../../components/EditingWebPages/RegistrationFormPage/EditErrorAlerts';
import ShowErrorAlerts from '../../../components/EditingWebPages/RegistrationFormPage/ShowErrorAlerts';
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

const FormularInscriere = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.PAGINA_FORMULAR_INSCRIERE, userPagesAccessFromStore)
  const hasEditPermission = doesUserHaveEditPermission(appPagesConstants.PAGINA_CURSURI, userPagesAccessFromStore)
  const permissions = {edit: hasEditPermission}

  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      dispatch(fetchRegistrationFormAlerts())
    }

    // clear Store at component destroy
    return () => {
      dispatch(clearRegistrationFormAlertsState())
    }
  }, [])

  const [loadingData, setLoadingData] = useState({ showCircle: false, circlePosition: 'center' })
  const [snackBar, setSnackBar] = useState({upDuration: 3000})

  // grab the Page data object from Redux
  const registrationFormAlerts = useSelector(state => {
    const alerts = state.registrationFormAlertsReducer.alerts
    const serverResponse = state.registrationFormAlertsReducer.success
    const serverMessage = state.registrationFormAlertsReducer?.serverMessage
    return { alerts, serverResponse, serverMessage }
  })
  const { alerts, serverResponse, serverMessage } = registrationFormAlerts

  const convertedAlerts = alerts ? alerts.map(element => [element.validation, element.message]) : []
  const formInitialValues = formValues(convertedAlerts)
  const FORM_VALIDATION = formValidation

  const handleShowLoadingPageData = () => {
    if (alerts || serverResponse) {
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
  }, [alerts])

  const handleFormSubmit = (values) => {
    if ( isEqual(values, formInitialValues) ) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        upDuration: 10000,
        text: "Eroare! Nicio modificare detectată!"
      })
      return
    }

    const payload = []
    let preparePayload = Object.entries(values)
    preparePayload = preparePayload.map(([key, value]) => [`message`, value])
    preparePayload.forEach(element => payload.push({ [element[0]]: element[1] }))                

    payload.forEach((newMsg, i) => {
      Object.assign(newMsg, {
        message: newMsg.message,
        title: alerts[i].title,
        validation: alerts[i].validation
      })
    })

    setLoadingData({...loadingData, showCircle: true})
    dispatch(updateRegistrationFormAlerts(payload))
  }

  const displaySnackBar = () => {
    if (serverMessage === 'Registration Form Alerts Updated Successfully') {
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

    if (serverMessage === 'Registration Form Alerts could not be updated') {
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
  // on updating the Registration Form Alerts
  useEffect(() => {
    displaySnackBar()
  }, [serverMessage])


  return (
    <>
      { hasViewPermission ?
        <>
          <OverlayProgressCircle overlaySetup={loadingData} />
          <div className='editare-formular-inscriere d-flex'>

            {/* show page when data is fully loaded */}
            { alerts &&
              <>
                { hasEditPermission ?
                  <RingBellAndPageInstructionsBanner Component={HowToOperateOnPage} />
                  :
                  <NoPermissionBanner permissions={permissions} />
                }

                <section className='left-section me-2'>
                  <h6> EDITARE ALERTE PAGINA FORMULAR ÎNSCRIERE </h6>
                  <Divider style={{background: 'white'}} className="mb-5" />

                  <Formik
                    initialValues={formInitialValues}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={values => handleFormSubmit(values)}>
                  {(props) => (
                      <Form>
                        <EditErrorAlerts
                          FormikProps={props}
                          localStyles={localStyles}
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
                
                <section className='right-section me-2 mt-2 pb-5'>
                  <ShowErrorAlerts data={alerts} />
                </section>
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

export default FormularInscriere
