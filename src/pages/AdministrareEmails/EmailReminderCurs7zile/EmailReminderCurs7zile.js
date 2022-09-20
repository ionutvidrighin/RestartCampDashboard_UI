import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailTemplateContent, 
  changeEmailTemplateContent, 
  sendTestEmailTemplateContent,
  clearEmailReminder7DaysState } from '../../../redux/actions/emailTemplatesActions/emailReminder7Days';
import { doesUserHavePermission } from '../../../utils/helperFunctions';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import templateScreenshot1 from './email-template1.png';
import templateScreenshot2 from './email-template2.png';
import templateScreenshot3 from './email-template3.png';
import templateScreenshot4 from './email-template4.png';
import NoAccessPage from '../../../components/NoAccessPage';
import LogoSection from '../../../components/EmailReminderCourse1Day/LogoSection';
import SectionCenter from '../../../components/EmailReminderCourse1Day/SectionCenter';
import SectionReferral from '../../../components/EmailReminderCourse1Day/SectionReferral';
import TestOrConfirmEmailTemplateUpdate from '../../../components/ReusableComponents/TestOrConfirmEmailTemplateUpdate';
import OverlayProgressCircle from '../../../components/ReusableComponents/OverlayProgressCircle/OverlayProgressCircle';
import SnackBar from '../../../components/ReusableComponents/SnackBar';

const EmailReminderCurs7zile = ({ setShowPlaceholder }) => {
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
  }, [])

  const [showConfirmChangesBtn, setShowConfirmChangesBtn] = useState({
    chooseOption: true,
    realChanges: false,
    testChanges: false
  })

  const [showProgressCircle, setShowProgressCircle] = useState({ show: false, circlePosition: 'flex-end' })
  const [snackBar, setSnackBar] = useState({})
  const [testEmailValue, setTestEmailValue] = useState('')

  // grab the E-mail Template Content from Redux
  // and plug into *formInitialValues* variable
  const emailTemplateContent = useSelector(state => state.emailReminder7Days.template)
  const getChangeEmailTemplateSuccess = useSelector(state => state.emailReminder7Days.success)
  const getChangeEmailTemplateServerMessage = useSelector(state => state.emailReminder7Days?.message)

  // get the server response after sending TEST E-mail Template
  const getNodeMailerResponse = useSelector(state => state.emailReminder7Days.emailResponse)
  const getTestEmailSuccess = useSelector(state => state.emailReminder7Days.success)
  const getTestEmailServerMessage = useSelector(state => state.emailReminder7Days?.message)

  // show a circle progress icon on the page while E-mail Template content is loaded
  useEffect( () => {
    if (emailTemplateContent.length === 0) {
      setShowProgressCircle({show: true, circlePosition: 'center'})
    } else {
      setShowProgressCircle({...showProgressCircle, show: false})
    }
  }, [emailTemplateContent.length])

  useEffect( () => {
    if (getChangeEmailTemplateSuccess && getChangeEmailTemplateServerMessage && 
      getChangeEmailTemplateServerMessage === "E-MAIL TEMPLATE content successfully added") {
        // E-mail template is successfully changed/updated in Database
        setShowProgressCircle({...showProgressCircle, show: false})
        setSnackBar({
          ...snackBar,
          testEmailSent: false,
          background: '#0eb082', 
          open: true, 
          text: "Email Template actualizat cu success!"
        })
        dispatch(clearEmailReminder7DaysState())
    } else if ((!getChangeEmailTemplateSuccess) && getChangeEmailTemplateServerMessage) {
      // E-mail template could not be changed/updated in Database
      // Modal shows server response message, under "text"
      setSnackBar({
        ...snackBar,
        testEmailSent: false,
        background: '#ff564a', 
        open: true, 
        text: getChangeEmailTemplateServerMessage
      })
    }

    if (getTestEmailSuccess && getTestEmailServerMessage 
      && (getTestEmailServerMessage === "TESTING E-MAIL TEMPLATE content successfully sent")
      && (getNodeMailerResponse.includes('250 2.0.0 OK')) ) {
        // Test E-mail template was successfully sent to the specified e-mail address by the user
        setShowProgressCircle({...showProgressCircle, show: false})
        setSnackBar({
          ...snackBar,
          testEmailSent: true,
          background: '#0eb082', 
          open: true, 
          text: `Email trimis cu success la -> ${testEmailValue}. Verifica si folderul Spam` 
        })
        setTestEmailValue("")
        dispatch(clearEmailReminder7DaysState())
    } else if ((!getTestEmailSuccess) && getTestEmailServerMessage) {
      // Test E-mail template could not be sent to the specified e-mail address
      // Modal shows server response message under "text"
      setSnackBar({
        ...snackBar,
        testEmailSent: true,
        background: '#ff564a',
        open: true, 
        text: getTestEmailServerMessage
      })
    }
  }, [ getChangeEmailTemplateSuccess, 
      getChangeEmailTemplateServerMessage, 
      getTestEmailSuccess, 
      getTestEmailServerMessage,
      getNodeMailerResponse ])

  const formInitialValues = {
    logoSection: emailTemplateContent?.logoSection,
    sectionCenter: {
      title1: emailTemplateContent?.sectionCenter?.title1,
      paragraph1: emailTemplateContent?.sectionCenter?.paragraph1,
      title2: emailTemplateContent?.sectionCenter?.title2,
      paragraph2: emailTemplateContent?.sectionCenter?.paragraph2,
      title3: emailTemplateContent?.sectionCenter?.title3,
      paragraph3: emailTemplateContent?.sectionCenter?.paragraph3,
      title4: emailTemplateContent?.sectionCenter?.title4,
      paragraph4: emailTemplateContent?.sectionCenter?.paragraph4,
    },
    sectionReferral: {
      button1: emailTemplateContent?.sectionReferral?.button1,
      button2: emailTemplateContent?.sectionReferral?.button2,
      logo: emailTemplateContent?.sectionReferral?.logo,
      text: emailTemplateContent?.sectionReferral?.text
    },
    contactSection: {
      phone: emailTemplateContent?.contactSection?.phone,
      email: emailTemplateContent?.contactSection?.email
    }
  }

  const VALIDATION = Yup.object().shape({
    logoSection: Yup.string().required("Linkul logo-ului, sectiunea LOGO, lipseşte"),
    sectionCenter: Yup.object().shape({
      title1: Yup.string().required("Titlu 1, sectiunea CENTRU, lipseşte"),
      paragraph1: Yup.string().required("Paragraf 1, sectiunea CENTRU, lipseşte"),
      title2: Yup.string().required("Titlu 2, sectiunea CENTRU, lipseşte"),
      paragraph2: Yup.string().required("Paragraf 2, sectiunea CENTRU, lipseşte"),
      title3: Yup.string().required("Titlu 3, sectiunea CENTRU, lipseşte"),
      paragraph3: Yup.string().required("Paragraf 3, sectiunea CENTRU, lipseşte"),
      title4: Yup.string().required("Titlu 4, sectiunea CENTRU, lipseşte"),
      paragraph4: Yup.string().required("Paragraf 4, sectiunea CENTRU, lipseşte"),
    }),
    sectionReferral: Yup.object().shape({
      button1: Yup.string().required("Text Buton 1, sectiunea REFERRAL, lipseşte"),
      button2: Yup.string().required("Text Buton 2, sectiunea REFERRAL, lipseşte"),
      logo: Yup.string().required("Link logo, sectiunea REFERRAL, lipseşte"),
      text: Yup.string().required("Text, sectiunea REFERRAL, lipseşte")
    }),
    contactSection: Yup.object().shape({
      phone: Yup.string().required("Nr. telefon lipseşte"),
      email: Yup.string().email('Adresa e-mail invalida').required("Adresa e-mail lipseşte")
    })
  })

  return <h1>in development</h1>
  // return (
  //   <>
  //     { userHasPermission ? 
  //       <div className='editare-email-template'
  //       style={{
  //         pointerEvents: showProgressCircle.show ? 'none': 'auto',
  //         height: emailTemplateContent.length === 0 ? '100vh' : 'fit-content'
  //       }}>

  //         { emailTemplateContent.length !== 0 &&
  //           <>
  //             <section className='manipulare-template'>
  //               <h5 className='pt-5'> EDITARE E-MAIL TEMPLATE </h5>
  //               <h6 className='ps-5 pe-5 subtitle'> E-mail reminder 7 zile înaintea începerii cursului modul 1 </h6>
  //               <div className='divider'></div>

  //               <Formik
  //                 initialValues={formInitialValues}
  //                 validationSchema={VALIDATION}
  //                 onSubmit={ async (values) => {
  //                   const emailTemplateContentObject = values

  //                   const sectionReferralButton1 = values.sectionReferral.button1.includes('- https://')
  //                   const sectionReferralButton2 = values.sectionReferral.button2.includes('- https://')

  //                   if (!showConfirmChangesBtn.testChanges && (sectionReferralButton1 && sectionReferralButton2)) {
  //                     // dispatching action for changing/updating e-mail template content
  //                     dispatch(changeEmailTemplateContent(emailTemplateContentObject))
  //                     setShowProgressCircle({...showProgressCircle, show: true})
  //                   } else if (!sectionReferralButton1 || !sectionReferralButton2) {
  //                     setSnackBar({
  //                       ...snackBar,
  //                       background: '#ff564a', 
  //                       open: true, 
  //                       text: "Buton 1 sau Buton 2, sectiunea Referral, nu au linkuri"
  //                     })
  //                     return
  //                   }
                    
  //                   if (showConfirmChangesBtn.testChanges) {
  //                     // dispatching action for sending a test e-mail template
  //                     if ( testEmailValue === "" || testEmailValue === undefined 
  //                         || !(testEmailValue.includes("@", 1) && testEmailValue.includes(".", 3)) ) {
  //                         setSnackBar({
  //                           ...snackBar,
  //                           background: '#ff564a', 
  //                           open: true, 
  //                           text: "Adresa e-mail pentru testare, lipseşte"
  //                         })
  //                     } else {
  //                       Object.assign(emailTemplateContentObject, {
  //                         testEmail: testEmailValue
  //                       })
  //                       dispatch(sendTestEmailTemplateContent(emailTemplateContentObject))
  //                       setShowProgressCircle({...showProgressCircle, show: true})
  //                     }
  //                   }
  //                 }}>
  //                 { (props) => (
  //                   <Form>
  //                     <LogoSection FormikProps={props} />
  //                     <SectionCenter FormikProps={props} />
  //                     <SectionReferral FormikProps={props} />

  //                     <TestOrConfirmEmailTemplateUpdate 
  //                       showConfirmChangesBtn={showConfirmChangesBtn}
  //                       setShowConfirmChangesBtn={setShowConfirmChangesBtn}
  //                       showProgressCircle={showProgressCircle}
  //                       testEmailValue={testEmailValue}
  //                       setTestEmailValue={setTestEmailValue}
  //                     />
  //                   </Form>
  //                 )}
  //               </Formik>
  //             </section>

  //             <section className='template-screenshot'>
  //               <img src={templateScreenshot1} alt="templateScreenshot1" />
  //               <img src={templateScreenshot2} alt="templateScreenshot2" />
  //               <img src={templateScreenshot3} alt="templateScreenshot3" />
  //               <img src={templateScreenshot4} alt="templateScreenshot4" />
  //             </section>

  //             { !snackBar.testEmailSent && 
  //               <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} />
  //             }

  //             { snackBar.testEmailSent &&
  //               <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} />
  //             }
  //           </>
  //         }

  //         <OverlayProgressCircle overlaySetup={showProgressCircle} />
  //       </div>
  //       :
  //       <NoAccessPage />
  //     }
  //   </>
  // )
}

export default EmailReminderCurs7zile
