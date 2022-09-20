import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { changeCourseModule1 } from "../../redux/actions/coursesActions/coursesModule1";
import CourseModule1Card from './CourseModule1Card';
import { Formik, Form } from "formik";
import { makeStyles } from '@material-ui/styles';
import * as Yup from "yup";
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import dayjs from 'dayjs';
import isEqual from 'lodash.isequal';

//overriding MaterialUI styles
const useStyles = makeStyles({
  textFiled: {
    marginBottom: '1rem !important',
    "& .MuiFormHelperText-root": {
      color: '#ff5c5c !important'
    },
    "& .MuiInputLabel-filled": {
      color: 'white',
      fontStyle: 'italic',
      fontWeight: 'bold',
      marginTop: '-.6rem',
    },
    "& .MuiInputLabel-shrink": {
      transform: 'translate(12px, 15px) scale(0.75)'
    },
    "& .MuiFilledInput-input": {
      color: 'white'
    }
  },
  radio: {
    color: 'white',
    "& .MuiRadio-colorSecondary.Mui-checked": {
      color: 'white !important'
    },
    "& .MuiFormControlLabel-root": {
      marginRight: '40px !important'
    }
  },
  button: {
    backgroundColor: '#509ecc',
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    "&:hover": {
      backgroundColor: '#c23a6a',
      color: 'white'
    }
  },
  courseDetailsBtn: {
    backgroundColor: '#509ecc',
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    height: '2rem',
    "&:hover": {
      backgroundColor: '#c23a6a',
      color: 'white'
    }
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


const ChangeCourseModule1 = ({
  courseActive,
  courseId,
  courseLogo,
  coursePriceLogo,
  courseZoomAccessLink,
  courseTitle,
  courseDate,
  courseRecurrence,
  courseLinkPage,
  setShowChangeCourseModule1,
  setSelectedCourse
}) => {

  const localStyles = useStyles()
  const dispatch = useDispatch()

  // state used to show/hide the course recurrence days
  const [courseRecurrenceDays, setCourseRecurrenceDays] = useState(false)

  /* ************************ */
  // setup for pop-up dialog on successfully modified course
  const [snackbar, setSnackBar] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
    text: null,
    error: false
  })

  const {open, vertical, horizontal} = snackbar

  const handleClose = () => {
    setSnackBar({...snackbar, open: false})
  }
  /* ************************ */

  const formValues = {
    courseLogo,
    coursePriceLogo,
    courseTitle,
    courseDate,
    courseRecurrence,
    courseZoomAccessLink,
    courseLinkPage
  }

  const FORM_VALIDATION = Yup.object().shape({
    courseLogo: Yup.string().required("Logo-ul cursului lipseste"),
    coursePriceLogo: Yup.string().required("Logo-ul pret curs lipseste"),
    courseTitle: Yup.string().required("Titlul cursului lipseste"),
    courseDate: Yup.string().required("Data cursului lipseste"),
    courseRecurrence: Yup.string().required(),
    courseZoomAccessLink: Yup.string().required("Linkul Zoom de access la curs lipseste"),
    courseLinkPage: Yup.string().required("Linkul de access spre curs lipseste"),
  })

  return (
    <div className="mt-2 d-flex">
      <section className="form-section mt-2">
        <div className="d-flex justify-content-start align-items-center" style={{position: 'relative'}}>
          { courseActive ?
            <Button 
              variant="contained" 
              style={{background: '#0aa378'}}
              className={localStyles.button}>
              Curs activ
            </Button>
            : 
            <Button 
              variant="contained" 
              style={{background: '#e04d6b'}}
              className={localStyles.button}>
              Curs inactiv
            </Button>
          }

          <Button
            variant="contained" 
            style={{background: '#509ecc'}}
            className={`${localStyles.button} ms-2`}
            onClick={() => setCourseRecurrenceDays(!courseRecurrenceDays)}>
            { courseRecurrenceDays ? 'Închide recurență curs' : 'Vezi recurență curs' }
          </Button>

          <CloseIcon
            className="exit-section-btn"
            onClick={() => setShowChangeCourseModule1(false) }
          />
        </div>

        <Formik
          enableReinitialize={true}
          initialValues={formValues}
          validationSchema={FORM_VALIDATION}
          onSubmit={ (values, {setErrors}) => {
            const initialCourseData = formValues
            const updatedCourseData = values

            if ( dayjs(values.courseDate).isBefore(dayjs()) ) {
              setErrors({courseDate: 'Data cursului nu poate fi in trecut'})
              return
            }
            
            if ( isEqual(initialCourseData, updatedCourseData) ) {
              setSnackBar({...snackbar, open: true, error: true, text: "Nicio modificare detectata!"})
              return
            }

            Object.assign(updatedCourseData, {courseId, courseActive})
            dispatch(changeCourseModule1(updatedCourseData))

            setSelectedCourse(updatedCourseData)
            setSnackBar({...snackbar, open: true, error: false, text: "Curs modificat cu succes!"})
          }}>
          { ({ errors, values, touched, handleChange }) => (
            <Form className="mt-4 d-flex flex-column pb-4" style={{ width: "500px" }}>
              <TextField
                className={localStyles.textFiled}
                value={values.courseLogo}
                autoComplete="off"
                onChange={handleChange}
                type="input"
                id="courseLogo"
                name="courseLogo"
                label="Logo Curs"
                variant="filled"
                placeholder="link spre o image in format JPEG, JPG sau PNG, sub forma http(s)://"
                error={Boolean(errors.courseLogo && touched.courseLogo)}
                helperText={errors.courseLogo}
              />

              <TextField
                className={localStyles.textFiled}
                value={values.coursePriceLogo}
                autoComplete="off"
                onChange={handleChange}
                type="input"
                id="coursePriceLogo"
                name="coursePriceLogo"
                label="Logo Pret Curs"
                variant="filled"
                placeholder="link spre o image in format JPEG, JPG sau PNG, sub forma http(s)://"
                error={Boolean(errors.coursePriceLogo && touched.coursePriceLogo)}
                helperText={errors.coursePriceLogo}
              />

              <TextField
                className={localStyles.textFiled}
                value={values.courseTitle}
                autoComplete="off"
                onChange={handleChange}
                type="input"
                multiline={true}
                maxRows={3}
                minRows={3}
                id="courseTitle"
                name="courseTitle"
                label="Titlul cursului"
                variant="filled"
                placeholder="titlu curs.."
                error={Boolean(errors.courseTitle && touched.courseTitle)}
                helperText={errors.courseTitle}
              />

              <TextField
                className={localStyles.textFiled}
                value={values.courseDate}
                autoComplete="off"
                onChange={handleChange}
                type="datetime-local"
                id="courseDate"
                name="courseDate"
                label="Data cursului"
                variant="filled"
                placeholder="format: ZZ/DD/MM"
                error={Boolean(errors.courseDate && touched.courseDate)}
                helperText={errors.courseDate}
              />

              <p className="course-recurrence">Recurenta Curs</p>
              <RadioGroup 
                className={`${localStyles.radio} flex-row`}
                aria-label="Recurenta Curs" 
                name="courseRecurrence" 
                value={values.courseRecurrence} 
                onChange={handleChange}
              >
                <FormControlLabel value="2" control={<Radio />} label="2 săpt." />
                <FormControlLabel value="4" control={<Radio />} label="4 săpt." />
                <FormControlLabel value="6" control={<Radio />} label="6 săpt." />
                <FormControlLabel value="8" control={<Radio />} label="8 săpt." />
              </RadioGroup>

              <TextField
                className={localStyles.textFiled}
                value={values.courseZoomAccessLink}
                autoComplete="off"
                onChange={handleChange}
                type="input"
                id="courseZoomAccessLink"
                name="courseZoomAccessLink"
                label="Link Zoom acces curs"
                variant="filled"
                multiline={true}
                maxRows={3}
                minRows={3}
                error={Boolean(errors.courseZoomAccessLink && touched.courseZoomAccessLink)}
                helperText={errors.courseZoomAccessLink}
              />

              <TextField
                className={localStyles.textFiled}
                value={values.courseLinkPage}
                autoComplete="off"
                onChange={handleChange}
                type="input"
                id="courseLinkPage"
                name="courseLinkPage"
                label="Link pagina individuala curs"
                variant="filled"
                multiline={true}
                maxRows={3}
                minRows={3}
                error={Boolean(errors.courseLinkPage && touched.courseLinkPage)}
                helperText={errors.courseLinkPage}
              />

              <Button 
                className={`${localStyles.button} mt-3`} 
                type="submit" 
                fullWidth={true} 
                variant="contained" >
                Confirm
              </Button>
            </Form>
          )}
        </Formik>
      </section>

      <Snackbar
        className={snackbar.error ? localStyles.snackBarError : localStyles.snackBarSuccess}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={snackbar.text}
        key={vertical + horizontal}
        autoHideDuration={5000}
      />

      <section className="selected-course d-flex flex-column align-items-center justify-content-start">
        <h5 className="mb-2">Curs selectat:</h5>
        <p className="text-center fst-italic px-2" style={{width: '75%'}}>
          {courseTitle}
        </p>
        <CourseModule1Card
          className="selected-free-course-card"
          courseLogoClass="selected-free-course-logo"
          courseLogo={courseLogo}
          coursePriceLogo={coursePriceLogo}
          courseTitle={courseTitle}
          courseDate={courseDate}
          courseRecurrence={courseRecurrence}
          courseActive={courseActive}
          showCourseRecurrence={courseRecurrenceDays}
        />
      </section>
    </div>
  )
}

export default ChangeCourseModule1
