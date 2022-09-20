import React from 'react'
import API from '../../api/api';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { EmailTextField, PasswordTextField } from './FormFields';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const GenerateTokenForm = ({ setToken }) => {

  const FORM_VALIDATION = yup.object().shape({
    username: yup.string().required('Username-ul lipsește'),
    password: yup.string().required('Parola lipsește')
  })

  return (
    <div className='generate-token-form'>
      <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={FORM_VALIDATION}
      onSubmit={ (values, {setSubmitting, setErrors}) => {
        (async function generateToken() {
          try {
            const payload = { username: values.username, password: values.password }
            const response = await API.Authentication.generateAccessToken(payload)
            setToken({
              received: true,
              value: response.data.token
            })
            setSubmitting(false)
          } catch (error) {
            if (!error.response) {
              setErrors({
                username: 'Server Error - No response', 
                password: 'Server Error - No response'
              })
              setSubmitting(false)
              return
            }

            if (error.response.status === 404) {
              setErrors({
                username: 'Credențiale invalide - te rog reîncearcă', 
                password: 'Credențiale invalide - te rog reîncearcă'
              })
              setSubmitting(false)
            } else if (error.response.status === 401) {
              setErrors({
                username: error.response.data.message, 
                password: error.response.data.message
              })
              setSubmitting(false)
            }
          }
        })()
      }}>
      {({errors, touched, isSubmitting}) => (
        <Form className="login-form-section">
          <div className="form-fields">
            <div>
              <Field name="username" type="input" as={EmailTextField} />
              <br />
              { errors.username && touched.username &&
                <div className='login-form-error'> {errors.username} </div>
              }
            </div>
            <br />

            <div>
              <Field name="password" type="password" as={PasswordTextField}/>
              <br />
              { errors.password && touched.password &&
                <div className='login-form-error'> {errors.password} </div>
              }
            </div>
            <br />
            <br />
            
            <Button
              className="submitLoginForm"
              variant="outlined"
              color='secondary'
              type="submit"
              disabled={isSubmitting}>
              { isSubmitting ?
                <div className='d-flex align-items-center'>
                  <strong className='me-2 text-lowercase'>
                    <span className='text-capitalize'>Un</span> moment, generez token-ul de access
                  </strong>
                  <CircularProgress size={25} color="secondary"/> 
                </div>
                :
                <span>
                  <strong>Generează Token Acces</strong>
                </span> 
              }
            </Button>
          </div>
          <p className='mb-0 mt-1' style={{color: '#6d6d7a', fontStyle: 'italic', fontSize: '.8rem'}}>
            *** Token-ul de acces expiră în 3 minute de la generare.
          </p>
        </Form>
      )}
      </Formik>
    </div>
  )
}

export default GenerateTokenForm