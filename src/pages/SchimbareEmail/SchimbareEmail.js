import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { changeAccountEmail } from "../../redux/actions/accountChangeActions";
import API from "../../api/api";
import { makeStyles } from '@material-ui/styles';
import { Formik, Form } from "formik";
import * as yup from "yup";
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
    minHeight: "350px",
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
});

const SchimbareEmail = ({ setShowPlaceholder }) => {

  const localStyles = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    setShowPlaceholder(false);
  }, []);

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


  const FORM_VALIDATION = yup.object().shape({
    currentUserAccountEmail: yup.string().required('Adresa e-mail curenta lipseste'),
    newUserAccountEmail: yup.string().required('Noua adresa e-mail lipseste')
  })

  return <>in development</>

  // return (
  //   <div className="change-email-page">
  //     <section className="page-title-section"> </section>

  //     <div className="d-flex align-items-flex justify-content-start">
  //       <div className="change-email-logo"> </div>
  //       <Paper elevation={6} className={`${localStyles.form} change-email-form p-5`}>
  //         <h4 className="fs-6 fw-bold text-uppercase mb-4">Schimba-ti adresa de e-mail</h4>

  //         <Formik 
  //           initialValues={{ currentUserAccountEmail: '', newUserAccountEmail: ''}}
  //           validationSchema={FORM_VALIDATION}
  //           onSubmit={(values, { setErrors, resetForm }) => {

  //             if (values.currentUserAccountEmail === values.newUserAccountEmail) {
  //               setErrors({ 
  //                 currentUserAccountEmail: 'Nicio modificare detectata',
  //                 newUserAccountEmail: 'Nicio modificare detectata'
  //               })
  //               return
  //             }

  //             (async function() {
  //               const appAccessKey = sessionStorage.getItem('accessKey')
  //               try {
  //                 await API.userAccount.changeEmail(values, appAccessKey)
  //                 setSnackBar({...snackbar, open: true, error: false, text: "Adresa e-mail s-a schimbat cu succes."})
  //                 resetForm()
  //                 dispatch(changeAccountEmail(values.newUserAccountEmail))
  //               } catch (error) {
  //                 setErrors({ 
  //                   currentUserAccountEmail: 'A aparut o eroare',
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
  //                     type="text"
  //                     autoComplete="off"
  //                     id="currentUserAccountEmail"
  //                     name="currentUserAccountEmail"
  //                     label="Adresa mail curenta"
  //                     value={values.currentUserAccountEmail}
  //                     className={localStyles.root}
  //                     error={Boolean(errors.currentUserAccountEmail && touched.currentUserAccountEmail)}
  //                     helperText={errors.currentUserAccountEmail}
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
  //                     type="text"
  //                     autoComplete="off"
  //                     id="newUserAccountEmail"
  //                     name="newUserAccountEmail"
  //                     label="Noua adresa mail"
  //                     value={values.newUserAccountEmail}
  //                     className={localStyles.root}
  //                     error={Boolean(errors.newUserAccountEmail && touched.newUserAccountEmail)}
  //                     helperText={errors.newUserAccountEmail} 
  //                   />
  //                 </Grid>
  //               </Grid>

  //               <div className="d-flex justify-content-center mt-4">           
  //                 <Button 
  //                   variant="contained" 
  //                   color="primary" 
  //                   type="submit" 
  //                   fullWidth={true} 
  //                   id="change-email-btn"
  //                 >
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
  //       autoHideDuration={3000}
  //     />
  //   </div>
  // );
};

export default SchimbareEmail;
