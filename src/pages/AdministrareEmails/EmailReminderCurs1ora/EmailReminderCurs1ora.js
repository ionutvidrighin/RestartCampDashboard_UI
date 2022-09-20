import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailTemplateContent,
  changeEmailTemplateContent,
  sendTestEmailTemplateContent,
  clearEmailReminder1HourState } from '../../../redux/actions/emailTemplatesActions/emailReminder1Hour';
import { doesUserHavePermission } from '../../../utils/helperFunctions';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import templateScreenshot1 from './email-template1.png';
import templateScreenshot2 from './email-template2.png';
import NoAccessPage from '../../../components/NoAccessPage';
import LogoSection from '../../../components/EmailReminderCourse1Hour/LogoSection';
import TestOrConfirmEmailTemplateUpdate from '../../../components/ReusableComponents/TestOrConfirmEmailTemplateUpdate';
import OverlayProgressCircle from '../../../components/ReusableComponents/OverlayProgressCircle/OverlayProgressCircle';
import SnackBar from '../../../components/ReusableComponents/SnackBar';

const EmailReminderCurs1ora = ({ setShowPlaceholder }) => {
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

  const [snackBar, setSnackBar] = useState({})
  const [showProgressCircle, setShowProgressCircle] = useState({ show: false, circlePosition: 'flex-end' })
  const [testEmailValue, setTestEmailValue] = useState('')

  // grab the E-mail Template Content from Redux
  // and plug into *formInitialValues* variable
  const emailTemplateContent = useSelector(state => state.emailReminder1Hour.template)
  const linkWords = useSelector(state => state.emailReminder1Hour.linkWords)
  const getChangeEmailTemplateSuccess = useSelector(state => state.emailReminder1Hour.success)
  const getChangeEmailTemplateServerMessage = useSelector(state => state.emailReminder1Hour?.message)

  // get the server response after sending TEST E-mail Template
  const getNodeMailerResponse = useSelector(state => state.emailReminder1Hour.emailResponse)
  const getTestEmailSuccess = useSelector(state => state.emailReminder1Hour.success)
  const getTestEmailServerMessage = useSelector(state => state.emailReminder1Hour?.message)

  const formInitialValues = {
    logoSection: {
      logoLink: emailTemplateContent?.logoSection?.logoLink,
      title1: emailTemplateContent?.logoSection?.title1,
      paragraph1: emailTemplateContent?.logoSection?.paragraph1,
      title2: emailTemplateContent?.logoSection?.title2,
      paragraph2: emailTemplateContent?.logoSection?.paragraph2,
      word: '',
      wordLink: '',
      button1: emailTemplateContent?.logoSection?.button1,
      button2: emailTemplateContent?.logoSection?.button2
    },
    contactSection: {
      phone: emailTemplateContent?.contactSection?.phone,
      email: emailTemplateContent?.contactSection?.email
    }
  }

  const VALIDATION = Yup.object().shape({
    logoSection: Yup.object().shape({
      logoLink: Yup.string().required("Linkul logo-ului, sectiunea LOGO, lipseşte"),
      title1: Yup.string().required("Titlu 1, sectiunea CENTRU, lipseşte"),
      paragraph1: Yup.string().required("Paragraf 1, sectiunea CENTRU, lipseşte"),
      title2: Yup.string().required("Titlu 2, sectiunea CENTRU, lipseşte"),
      paragraph2: Yup.string().required("Paragraf 2, sectiunea CENTRU, lipseşte"),
      button1: Yup.string().required("Text Buton 1, sectiunea LOGO, lipseşte"),
      button2: Yup.string().required("Text Buton 2, sectiunea LOGO, lipseşte")
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
  //         //pointerEvents: showProgressCircle.show ? 'none': 'auto',
  //         //height: emailTemplateContent.length === 0 ? '100vh' : 'fit-content'
  //         height: 'fit-content'
  //       }}>

  //         <section className='manipulare-template'>
  //           <h5 className='pt-5'> EDITARE E-MAIL TEMPLATE </h5>
  //           <h6 className='ps-5 pe-5 subtitle'> E-mail reminder 1 ora înaintea începerii cursului modul 1 </h6>
  //           <div className='divider'></div>

  //           <Formik
  //             enableReinitialize={true}
  //             initialValues={formInitialValues}
  //             validationSchema={VALIDATION}
  //             onSubmit={() => {}}
  //           >
  //           { (props) => (
  //             <Form>
  //               <LogoSection FormikProps={props} />

  //               <TestOrConfirmEmailTemplateUpdate 
  //                 showConfirmChangesBtn={showConfirmChangesBtn}
  //                 setShowConfirmChangesBtn={setShowConfirmChangesBtn}
  //                 showProgressCircle={showProgressCircle}
  //                 testEmailValue={testEmailValue}
  //                 setTestEmailValue={setTestEmailValue}
  //               />
  //             </Form>
  //           )}
  //           </Formik>
  //         </section>

  //         <section className='template-screenshot'>
  //           <img src={templateScreenshot1} alt="templateScreenshot1" />
  //           <img src={templateScreenshot2} alt="templateScreenshot2" />
  //         </section>
          
  //       </div>
  //       :
  //       <NoAccessPage />
  //     }
  //   </>
  // )
}

export default EmailReminderCurs1ora
