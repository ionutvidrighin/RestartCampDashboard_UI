import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/styles';
import { fetchEmailTemplateContent, updateEmailTemplateContent,
  sendTestEmailTemplateContent,clearServerResponse,
  clearReducerState } from '../../../redux/actions/emailTemplatesActions/emailConfirmationStudentRegistration';
import { doesUserHavePermission } from '../../../utils/helperFunctions';
import { formValues, formValidation } from './formValuesAndValidation'; 
import { Formik, Form } from "formik";
import isEqual from 'lodash.isequal';
import Divider from '@material-ui/core/Divider';
import NoAccessPage from '../../../components/NoAccessPage';
import ShowEmailTemplateContent from '../../../components/EmailConfirmationTemplate/ShowEmailTemplateContent';
import TopSection from '../../../components/EmailConfirmationTemplate/TopSection';
import CenterSection from '../../../components/EmailConfirmationTemplate/CenterSection';
import ButtonsSection from '../../../components/EmailConfirmationTemplate/ButtonsSection';
import ContestLogoSection from '../../../components/EmailConfirmationTemplate/ContestLogoSection';
import UpdateEmailsFooterSection from '../../../components/ReusableComponents/EmailTemplatesManipulation/UpdateEmailsFooterSection';
import ConfirmOrTestEmailTemplateUpdate from '../../../components/ReusableComponents/EmailTemplatesManipulation/ConfirmOrTestEmailTemplateUpdate';
import OverlayProgressCircle from '../../../components/ReusableComponents/OverlayProgressCircle/OverlayProgressCircle';
import SnackBar from '../../../components/ReusableComponents/SnackBar';
 
const useStyles = makeStyles({
  textField: {
    width: '280px',
    marginBottom: '.5rem !important',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(10px, 5px) scale(0.75)'
    },
    "& .MuiFormLabel-root": {
      color: 'white',
      fontSize: '.8rem'
    },
    "& .MuiInputBase-root": {
      color: 'white'
    }
  },
  narrowTextField: {
    width: '45%',
    marginBottom: '.5rem !important',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(10px, 5px) scale(0.75)'
    },
    "& .MuiFormLabel-root": {
      color: 'white',
      fontSize: '.8rem'
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
  }
})

const EmailConfirmareInscriere = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()
  const route = useLocation()
  const { pathname } = route

  const getUserPagesAccessFromStore = useSelector(state => state.authReducer.pagesPermission)
  const userHasPermission = doesUserHavePermission(pathname, getUserPagesAccessFromStore)

  useEffect(() => {
    setShowPlaceholder(false)
    if (userHasPermission) {
      dispatch(fetchEmailTemplateContent())
    }

    // clear Store at component destroy
    return () => dispatch(clearReducerState())
  }, [])

  const [loadingData, setLoadingData] = useState({ showCircle: false, circlePosition: 'center' })
  const [snackBar, setSnackBar] = useState({upDuration: 2000})
  const [confirmOrTestEmailTemplateUpdate, setConfirmOrTestEmailTemplateUpdate] = useState({
    testChanges: false,
    confirmChanges: true
  })
  const [emailTitleOnMultipleRows, setEmailTitleOnMultipleRows] = useState(false)
  const [testEmailAddress, setTestEmailAddress] = useState('')

  // grab the E-mail Template Object from Redux
  // and plug into *formValues* function
  const emailTemplateObject = useSelector(state => ({
    template: state.emailConfirmationRegistrationTemplate.template,
    serverResponse: state.emailConfirmationRegistrationTemplate.success,
    serverMessage: state.emailConfirmationRegistrationTemplate?.serverMessage
  }))
  const { template, serverResponse, serverMessage } = emailTemplateObject

  const formInitialValues = formValues(template)

  const handleShowLoadingPageData = () => {
    if (serverResponse || template) {
      setLoadingData({...loadingData, showCircle: false})
      setSnackBar({
        ...snackBar,
        background: '#28cc95', 
        open: true,
        upDuration: 500,
        text: 'Data Loaded Successfully'
      })
    } else {
      setLoadingData({...loadingData, showCircle: true})
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        text: serverMessage
      })
    }
  }

  useEffect( () => {
    handleShowLoadingPageData()
  }, [template])
  
  
  const handleDisplayConfirmOrTestEmailTemplate = (e) => {
    const clickedButtonValue = e.target.innerText
    const confirmChanges = 'CONFIRMA SCHIMBĂRILE'
    const testChanges = 'TESTEAZA SCHIMBĂRILE'

    if (clickedButtonValue === confirmChanges) {
      setConfirmOrTestEmailTemplateUpdate({ testChanges: false, confirmChanges: true })
    } else if (clickedButtonValue === testChanges) {
      setConfirmOrTestEmailTemplateUpdate({ testChanges: true, confirmChanges: false })
    } else {
      setConfirmOrTestEmailTemplateUpdate({ testChanges: false, confirmChanges: true })
    }
  }

  const handleSelectEmailTitleOnMultipleRows = (e) => {
    setEmailTitleOnMultipleRows(e.target.checked)
  }

  const handleTestEmailValueChange = (val) => {
    setTestEmailAddress(val.target.value)
  }

  const handleFormSubmit = (values) => {
    // in case no changes are made, prevent unnecessary API call
    if (isEqual(values, formInitialValues)) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d',
        open: true,
        success: false,
        upDuration: 5000,
        text: "Eroare! Nicio modificare detectată!"
      })
      return
    }

    /*
    * attach *emailTitleOnMultipleRows* flag to the payload object
    * and check if user followed the correct instructions
    */
    const emailTemplateTitle = values.topSection.emailTitle
    Object.assign(values.topSection, { emailTitleOnMultipleRows })
    if (emailTitleOnMultipleRows && !emailTemplateTitle.includes('[break]')) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d',
        open: true,
        success: false,
        upDuration: 8000,
        text: 'Eroare! Ai selectat "Titlu Email pe mai multe rânduri" fără a nota locul/locurile de separare.'
      })
      return
    }
    if (!emailTitleOnMultipleRows && emailTemplateTitle.includes('[break]')) {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d',
        open: true,
        success: false,
        upDuration: 8000,
        text: 'Eroare! Ai notat locuri de separare a Titlului templateului fără a bifa "Titlu Email pe mai multe rânduri".'
      })
      return
    }

    if (confirmOrTestEmailTemplateUpdate.confirmChanges) {
      // scenario: user wants to submit the form changes

      // perform the API call
      dispatch(updateEmailTemplateContent(values))
      setLoadingData({...loadingData, showCircle: true})
    } else if (confirmOrTestEmailTemplateUpdate.testChanges) {
      // scenario: user wants to test the form changes by sending a test email

      if ((testEmailAddress === "") || !( testEmailAddress.includes("@", 1) && (testEmailAddress.includes(".", 3)) )) {
        // ensure user typed in a valid E-mail Address to perform the Test Email Action
        setSnackBar({
          ...snackBar,
          background: '#e53c5d',
          open: true,
          success: false,
          upDuration: 5000,
          text: 'Adresa e-mail pentru testare, lipseşte'
        })
        return
      }

      // add the testEmailAddress value to the payload 
      // and perform the API call
      Object.assign(values, { testEmail: testEmailAddress })
      dispatch(sendTestEmailTemplateContent(values))
      setLoadingData({...loadingData, showCircle: true})

      // reset Test Email Address Input Field
      setTestEmailAddress("")
    }
  }

  const displaySnackBar = () => {
    if (serverMessage === 'Update Successfull') {
      setSnackBar({
        ...snackBar,
        background: '#28cc95',
        open: true,
        success: true,
        text: serverMessage
      })
      dispatch(clearServerResponse())
      setLoadingData({...loadingData, showCircle: false})
    }

    if (serverMessage === 'Update Failed') {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        text: serverMessage
      })
      dispatch(clearServerResponse())
      setLoadingData({...loadingData, showCircle: false})
    }

    if (serverMessage === 'Sent Successfull') {
      setSnackBar({
        ...snackBar,
        background: '#28cc95', 
        open: true,
        success: true,
        text: serverMessage
      })
      dispatch(clearServerResponse())
      setLoadingData({...loadingData, showCircle: false})
    }

    if (serverMessage === 'Sent Failed') {
      setSnackBar({
        ...snackBar,
        background: '#e53c5d', 
        open: true,
        success: false,
        text: serverMessage
      })
      dispatch(clearServerResponse())
      setLoadingData({...loadingData, showCircle: false})
    }
  }

  // watch Redux updates for back-end response
  // on updating the template or sending a test e-mail
  useEffect(() => {
    displaySnackBar()
  }, [serverMessage])


  return (
    <>
      { userHasPermission ?
        <>
          <OverlayProgressCircle overlaySetup={loadingData} />
          <div className='editare-email-template' style={{pointerEvents: loadingData.showCircle ? 'none': 'auto'}}>

            { emailTemplateObject.template &&
              <>
                <section className='manipulare-template pe-2'>
                  <h6 className='pt-3 fw-bold'> EDITARE E-MAIL TEMPLATE </h6>
                  <h6 className='ps-5 pe-5 subtitle'> E-mail confirmare instant la înscriere </h6>
                  <Divider style={{background: 'white'}} className="mb-5 ms-2" />

                  <Formik
                    enableReinitialize={true}
                    initialValues={formInitialValues}
                    validationSchema={formValidation}
                    onSubmit={ values => handleFormSubmit(values)}
                  >
                  {(props) => (
                    <Form>
                      <TopSection FormikProps={props} localStyles={localStyles} emailTitleMultipleRows={handleSelectEmailTitleOnMultipleRows} />
                      <CenterSection FormikProps={props} localStyles={localStyles} />
                      <ButtonsSection FormikProps={props} localStyles={localStyles} />
                      <ContestLogoSection FormikProps={props} localStyles={localStyles} />
                      <UpdateEmailsFooterSection FormikProps={props} localStyles={localStyles} />

                      <ConfirmOrTestEmailTemplateUpdate
                        action={handleDisplayConfirmOrTestEmailTemplate} 
                        displayButton={confirmOrTestEmailTemplateUpdate}
                        testEmailAddressValue={testEmailAddress}
                        collectEmailAddressValue={handleTestEmailValueChange}
                        localStyles={localStyles}
                      />
                    </Form>
                  )} 
                  </Formik>
                </section>

                <ShowEmailTemplateContent />

                { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
              </>
            }
          </div>
        </>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default EmailConfirmareInscriere
