import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Formik, Form } from "formik";
import * as yup from "yup";
import API from "../../api/api";
import Snackbar from '@material-ui/core/Snackbar';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import LockOpenTwoToneIcon from "@material-ui/icons/LockOpenTwoTone";
import LockTwoToneIcon from "@material-ui/icons/LockTwoTone";
import Button from '@material-ui/core/Button';

// overriding Material UI Styles
const useStyles = makeStyles({
  root: {
    color: '#c9c9c9',
    "& .MuiFormLabel-root": {
      color: '#e0e0e0'
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#e0e0e0"
    },
    "& .MuiInputBase-input": {
      width: '300px !important'
    },
    "& .MuiGrid-root": {
      marginBottom: '1rem'
    },
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    }
  }, 
  form: {
    minHeight: "400px",
    height: 'fit-content',
    width: "450px",
    marginLeft: "-10rem",
    zIndex: "5",
  },
  snackBarSuccess: {
    "& .MuiSnackbarContent-root": {
      minWidth: '210px !important',
      backgroundColor: '#28cc95'
    },
    "& .MuiSnackbarContent-message": {
      width: '100%',
      textAlign: 'center'
    }
  },
  snackBarError: {
    "& .MuiSnackbarContent-root": {
      minWidth: '210px !important',
      backgroundColor: '#e04d6b'
    },
    "& .MuiSnackbarContent-message": {
      width: '100%',
      textAlign: 'center'
    }
  }
})

const SchimbareParola = ({ setShowPlaceholder }) => {
  const localStyles = useStyles()

  useEffect(() => {
    setShowPlaceholder(false);
  }, [])

  /* ************************ */
  // setup for pop-up dialog on activate/deactivate course
  const [snackbar, setSnackBar] = useState({
    open: false,
    error: false,
    vertical: 'bottom',
    horizontal: 'center',
    text: ""
  })
  const {open, vertical, horizontal} = snackbar
  const handleClose = () => {
    setSnackBar({ ...snackbar, open: false })
  }
  /* ************************ */

  const formValues = {
    currentPassword: '',
    newUserAccountPassword: '',
    repeatNewUserAccountPassword: ''
  }

  const FORM_VALIDATION = yup.object().shape({
    currentPassword: yup.string().required('Parola curenta lipseste'),
    newUserAccountPassword: yup.string().required('Parola noua lipseste'),
    repeatNewUserAccountPassword: yup.string().required('Parola noua lipseste')
  })

  const getUserEmailFromStore = useSelector(state => state.authReducer.userEmail)

  return <>in development</>

  // return (
  //   <div className="change-password-page">
  //     <section className="page-title-section"> </section>

  //     <div className="d-flex align-items-flex justify-content-start">
  //       <div className="change-passw-logo"> </div>
  //       <Paper elevation={6} className={`${localStyles.form} change-password-form p-5`}>
  //         <h4 className="fs-6 fw-bold text-uppercase"> Schimba-ti parola </h4>

  //         <Formik
  //           initialValues={formValues}
  //           validationSchema={FORM_VALIDATION}
  //           onSubmit={(values, {setErrors, resetForm}) => {
  //             if (values.newUserAccountPassword !== values.repeatNewUserAccountPassword) {
  //               setErrors({ 
  //                 newUserAccountPassword: 'Parolele nu corespund', 
  //                 repeatNewUserAccountPassword: 'Parolele nu corespund'
  //               })
  //               return
  //             }

  //             if (values.currentPassword === values.newUserAccountPassword) {
  //               setErrors({
  //                 currentPassword: 'Noua parola nu poate fi identica cu vechea parola',
  //                 newUserAccountPassword: 'Noua parola nu poate fi identica cu vechea parola', 
  //                 repeatNewUserAccountPassword: 'Noua parola nu poate fi identica cu vechea parola'
  //               })
  //               return
  //             }

  //             (async function() {
  //               const appAccessKey = sessionStorage.getItem('accessKey')
  //               try {
  //                 const payload = {
  //                   email: getUserEmailFromStore,
  //                   currentPassword: values.currentPassword,
  //                   newPassword: values.newUserAccountPassword,
  //                 }
  //                 await API.userAccount.changePassword(payload, appAccessKey)
  //                 setSnackBar({...snackbar, open: true, error: false, text: "Parola a fost schimbata cu succes."})
  //                 resetForm()
  //               } catch (error) {
  //                 setErrors({ 
  //                   currentPassword: error.response.data.message,
  //                   newUserAccountPassword: error.response.data.message, 
  //                   repeatNewUserAccountPassword: error.response.data.message
  //                 })
  //                 setSnackBar({...snackbar, open: true, error: true, text: error.response.data.message})
  //               }
  //             })()

  //           }}
  //         >
  //           {({errors, values, touched, handleChange}) => (
  //             <Form>
  //               <Grid container spacing={1} alignItems="flex-end" className={localStyles.root}>
  //                 <Grid item>
  //                   <LockOpenTwoToneIcon />
  //                 </Grid>
  //                 <Grid item>
  //                   <TextField
  //                     onChange={handleChange}
  //                     type="password"
  //                     autoComplete="off"
  //                     id="currentPassword"
  //                     name="currentPassword"
  //                     label="Parola curenta"
  //                     value={values.currentPassword}
  //                     className={localStyles.root}
  //                     error={Boolean(errors.currentPassword && touched.currentPassword)}
  //                     helperText={errors.currentPassword}
  //                   />
  //                 </Grid>
  //               </Grid>

  //               <Grid container spacing={1} alignItems="flex-end" className={localStyles.root}>
  //                 <Grid item>
  //                   <LockTwoToneIcon />
  //                 </Grid>
  //                 <Grid item>
  //                   <TextField
  //                     onChange={handleChange}
  //                     type="password"
  //                     autoComplete="off"
  //                     id="newUserAccountPassword"
  //                     name="newUserAccountPassword"
  //                     label="Parola noua"
  //                     value={values.newUserAccountPassword}
  //                     className={localStyles.root}
  //                     error={Boolean(errors.newUserAccountPassword && touched.newUserAccountPassword)}
  //                     helperText={errors.newUserAccountPassword} 
  //                   />
  //                 </Grid>
  //               </Grid>

  //               <Grid container spacing={1} alignItems="flex-end" className={localStyles.root}>
  //                 <Grid item>
  //                   <LockTwoToneIcon />
  //                 </Grid>
  //                 <Grid item>
  //                   <TextField
  //                     onChange={handleChange}
  //                     type="password"
  //                     autoComplete="off"
  //                     id="repeatNewUserAccountPassword"
  //                     name="repeatNewUserAccountPassword"
  //                     label="Confirma parola noua"
  //                     value={values.repeatNewUserAccountPassword}
  //                     className={localStyles.root}
  //                     error={Boolean(errors.repeatNewUserAccountPassword && touched.repeatNewUserAccountPassword)}
  //                     helperText={errors.repeatNewUserAccountPassword}
  //                   />
  //                 </Grid>
  //               </Grid>

  //               <div className="d-flex justify-content-center mt-4">           
  //                 <Button variant="contained" color="primary" type="submit" fullWidth={true} id="change-passw-btn">
  //                   <span className="text-capitalize">Schimba Adresa Mail</span>
  //                 </Button>
  //               </div>
                
  //             </Form>
  //           )}
  //         </Formik> 
  //       </Paper>
  //     </div>

  //     <Snackbar
  //       className={snackbar.error ? localStyles.snackBarError : localStyles.snackBarSuccess}
  //       anchorOrigin={{ vertical, horizontal }}
  //       open={open}
  //       onClose={handleClose}
  //       message={snackbar.text}
  //       key={vertical + horizontal}
  //       autoHideDuration={5000}
  //     />
  //   </div>
  // );
};

export default SchimbareParola;
