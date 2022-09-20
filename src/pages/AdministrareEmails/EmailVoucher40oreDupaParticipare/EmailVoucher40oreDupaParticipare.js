import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { doesUserHavePermission } from '../../../utils/helperFunctions';
import templateScreenshot1 from './email-template1.png';
import templateScreenshot2 from './email-template2.png';
import templateScreenshot3 from './email-template3.png';
import NoAccessPage from '../../../components/NoAccessPage';
import LogoSection from '../../../components/EmailVoucher40HoursAfterParticipationForm/LogoSection';
import SectionCenter from '../../../components/EmailVoucher40HoursAfterParticipationForm/SectionCenter';
import TestOrConfirmEmailTemplateUpdate from '../../../components/ReusableComponents/TestOrConfirmEmailTemplateUpdate';

const EmailVoucher40oreDupaParticipare = () => {
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
    logoSection: {
      logoLink: '',
      title: '',
      paragraph: {
        text: '',
        word: '',
        wordLink: ''
      },
      button1: '',
      button2: ''
    },
    sectionCenter: {
      logoLink: '',
      paragraph1: '',
      paragraph2: '',
      paragraph3: ''
    },
    contactSection: {
      phone: '',
      email: ''
    }
  }

  const VALIDATION = Yup.object().shape({
    logoSection: Yup.object().shape({
      logoLink: Yup.string().required("Linkul logo-ului, sectiunea LOGO, lipseşte"),
      title: Yup.string().required("Titlu, sectiunea LOGO, lipseşte"),
      paragraph: Yup.object().shape({
        text: Yup.string().required('Text paragraf sectiunea LOGO, lipseşte'),
        word: Yup.string().required('Șir 1 lipseşte'),
        wordLink: Yup.string().required('Link şir 1 lipseşte')
      })
    }),
    sectionCenter: Yup.object().shape({
      logoLink: Yup.string().required("Linkul logo-ului, sectiunea CENTRU, lipseşte"),
      paragraph1: Yup.string().required('Paragraf 1, sectiunea CENTRU, lipseşte'),
      paragraph2: Yup.string().required('Paragraf 2, sectiunea CENTRU, lipseşte'),
      paragraph3: Yup.string().required('Paragraf 3, sectiunea CENTRU, lipseşte')
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
  //       <div 
  //         className='editare-email-template'
  //         style={{
  //         //pointerEvents: showProgressCircle.show ? 'none': 'auto',
  //         //height: emailTemplateContent.length === 0 ? '100vh' : 'fit-content'
  //         height: 'fit-content'
  //       }}>
  //         <section className='manipulare-template'>
  //         <h5 className='pt-5'> EDITARE E-MAIL TEMPLATE </h5>
  //           <h6 className='ps-4 pe-4 subtitle'> E-mail voucher la 40 ore dupa confirmare participare la curs modul 1</h6>
  //           <div className='divider'></div>

  //           <Formik
  //             enableReinitialize={true}
  //             initialValues={formInitialValues}
  //             validationSchema={VALIDATION}
  //             onSubmit={() => {}}
  //           >
  //             { (props) => (
  //               <Form>
  //                 <LogoSection FormikProps={props} />
  //                 <SectionCenter FormikProps={props} />

  //                 <TestOrConfirmEmailTemplateUpdate 
  //                   showConfirmChangesBtn={showConfirmChangesBtn}
  //                   setShowConfirmChangesBtn={setShowConfirmChangesBtn}
  //                   showProgressCircle={showProgressCircle}
  //                   testEmailValue={testEmailValue}
  //                   setTestEmailValue={setTestEmailValue}
  //                 />
  //               </Form>
  //             )}
  //           </Formik>

  //         </section>
      
  //         <section className='template-screenshot'>
  //           <img src={templateScreenshot1} alt="templateScreenshot1" />
  //           <img src={templateScreenshot2} alt="templateScreenshot2" />
  //           <img src={templateScreenshot3} alt="templateScreenshot3" />
  //         </section>
  //       </div>
  //       :
  //       <NoAccessPage />
  //     }
  //   </>
  // )
}

export default EmailVoucher40oreDupaParticipare
