import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { doesUserHavePermission } from '../../../utils/helperFunctions';
import templateScreenshot1 from './email-template1.png';
import templateScreenshot2 from './email-template2.png';
import templateScreenshot3 from './email-template3.png';
import templateScreenshot4 from './email-template4.png';
import NoAccessPage from '../../../components/NoAccessPage';
import LogoSection from '../../../components/EmailReminderCourse1Day/LogoSection';
import SectionCenter from '../../../components/EmailVoucher4HoursAfterParticipationForm/SectionCenter';
import LogoSection2 from '../../../components/EmailVoucher4HoursAfterParticipationForm/LogoSection2';
import TestOrConfirmEmailTemplateUpdate from '../../../components/ReusableComponents/TestOrConfirmEmailTemplateUpdate';

const EmailVoucher4oreDupaParticipare = () => {
  const route = useLocation()
  const { pathname } = route

  const getUserPagesAccessFromStore = useSelector(state => state.authReducer.pagesPermission)
  const userHasPermission = doesUserHavePermission(pathname, getUserPagesAccessFromStore)

  const [showConfirmChangesBtn, setShowConfirmChangesBtn] = useState({
    chooseOption: true,
    realChanges: false,
    testChanges: false
  })

  const [showProgressCircle, setShowProgressCircle] = useState({ show: false, circlePosition: 'flex-end' })
  const [snackBar, setSnackBar] = useState({})
  const [testEmailValue, setTestEmailValue] = useState('')

  const formInitialValues = {
    logoSection: '',
    sectionCenter: {
      title: '',
      paragraph1: '',
      title2: '',
      paragraph2: '',
      paragraph3: {
        text: '',
        word1: '',
        wordLink1: '',
        word2: '',
        wordLink2: '',
        word3: '',
        wordLink3: '',
        button1: '',
        button2: ''
      }
    },
    logoSection2: {
      title: '',
      logoLink: ''
    },
    contactSection: {
      phone: '',
      email: ''
    }
  }

  const VALIDATION = Yup.object().shape({
    logoSection: Yup.string().required("Linkul logo-ului, sectiunea LOGO, lipseşte"),
    sectionCenter: Yup.object().shape({
      title: 'Titlu, sectiunea CENTRU, lipseşte',
      paragraph1: 'Paragraf 1, sectiunea CENTRU, lipseşte',
      title2: 'Titlu 2, sectiunea CENTRU, lipseşte',
      paragraph2: 'Paragraf 2, sectiunea CENTRU, lipseşte',
      paragraph3: Yup.object().shape({
        text: 'Text paragraf 3 sectiunea CENTRU, lipseşte ',
        word1: 'Șir 1 lipseşte',
        wordLink1: 'Link şir 1 lipseşte',
        word2: 'Șir 2 lipseşte',
        wordLink2: 'Link şir 2 lipseşte',
        word3: 'Șir 3 lipseşte',
        wordLink3: 'Link şir 3 lipseşte',
        button1: 'Buton 1 lipseşte',
        button2: 'Buton 2 lipseşte'
      })
    }),
    logoSection2: {
      title: 'Titlu, sectiunea Logo 2, lipseşte',
      logoLink: 'Link logo, sectiunea CENTRU, lipseşte'
    },
    contactSection: Yup.object().shape({
      phone: Yup.string().required("Nr. telefon lipseşte"),
      email: Yup.string().email('Adresa e-mail invalida').required("Adresa e-mail lipseşte")
    })
  })

  return <h1>in development</h1>

  // return (
  //   <>
  //     { userHasPermission ?
  //       <div 
  //         className='editare-email-template'
  //         style={{
  //         //pointerEvents: showProgressCircle.show ? 'none': 'auto',
  //         //height: emailTemplateContent.length === 0 ? '100vh' : 'fit-content'
  //         height: 'fit-content'
  //       }}>
  //       <section className='manipulare-template'>
  //           <h5 className='pt-5'> EDITARE E-MAIL TEMPLATE </h5>
  //           <h6 className='ps-4 pe-4 subtitle'> E-mail voucher la 4 ore dupa confirmare participare la curs modul 1</h6>
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
  //               <SectionCenter FormikProps={props} />
  //               <LogoSection2 FormikProps={props} />

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
  //           <img src={templateScreenshot3} alt="templateScreenshot3" />
  //           <img src={templateScreenshot4} alt="templateScreenshot4" />
  //         </section>
          
  //       </div>
  //       :
  //       <NoAccessPage />
  //     }
  //   </>
  // )
}

export default EmailVoucher4oreDupaParticipare
