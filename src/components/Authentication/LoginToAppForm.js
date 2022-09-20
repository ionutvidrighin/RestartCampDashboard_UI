import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import API from '../../api/api';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { AccessTokenTextField } from './FormFields';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { logUserIn } from '../../redux/actions/authenticationActions';
import copyToClipboardIcon from "../../assets/token-icon.png";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoginToAppForm = ({ token }) => {
  const dispatch = useDispatch()

  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  const FORM_VALIDATION = yup.object().shape({
    accessToken: yup.string().required('Token acces lipsește')
  })

  return (
    <div className='login-to-app-form'>
      <Formik
      initialValues={{ accessToken: '' }}
      validationSchema={FORM_VALIDATION}
      onSubmit={ (values, {setSubmitting, setErrors}) => {
        (async function login() {
          try {
            const response = await API.Authentication.logUserIn(values.accessToken)
            const loggedUser = response.data.loggedUser 
            setSubmitting(true)
            dispatch(logUserIn(loggedUser))
          } catch (error) {
            setErrors({ accessToken: 'Token Acces expirat sau incorect' })
            setSubmitting(false)
          }
        })()
      }}>
      {({errors, touched, isSubmitting}) => (
        <>
          <div className='d-flex justify-content-end'>
            <CopyToClipboard 
              text={token.value}
              onCopy={() => setCopiedToClipboard(true)}>
            <button type="button" className='copy-clipboard-btn'> 
              { copiedToClipboard ? <span style={{color: 'tomato', fontWeight: 'bold'}}> Copied </span> : 'Copy' }
            </button>
            </CopyToClipboard>
          </div>
        
          <Form className="login-form-section">
            <div className="form-fields">

              <div className='display-token'>
                <img src={copyToClipboardIcon} className='copy-to-clipboard-icon' alt="copy-to-clipboard" />
                <p className='m-0'> {token.value} </p>
              </div>
              
              <div className='mb-3'>
                <p className='token-input-label'>Token Acces</p>
                <Field name="accessToken" type="text"  as={AccessTokenTextField} />
                <br />
                { errors.accessToken && touched.accessToken &&
                  <div className='login-form-error'> {errors.accessToken} </div>
                }
              </div>
              
              <Button
                className="submitLoginForm" 
                variant="outlined"
                color='secondary'
                type="submit"
                disabled={isSubmitting}>
                { isSubmitting ?
                  <div className='d-flex align-items-center'>
                    <strong className='me-2 text-lowercase'>
                      <span className='text-capitalize'>Un</span> moment, te conectez...
                    </strong>
                    <CircularProgress size={25} color="secondary"/> 
                  </div>
                  :
                  <span>
                    <strong>Conectează-te</strong>
                  </span> 
                }
              </Button>
            </div>
          </Form>
        </>
      )}
      </Formik>
    </div>
  )
}

export default LoginToAppForm