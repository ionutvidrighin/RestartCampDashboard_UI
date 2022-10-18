import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from "react-redux";
import { addCourseModule1, clearCoursesModule1ServerResponse } from "../../redux/actions/coursesActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from '@material-ui/styles';
import dayjs from 'dayjs';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import CourseModule1Card from "./CourseModule1Card";
import SnackBar from '../ReusableComponents/SnackBar';

//overriding MaterialUI styles
const useStyles = makeStyles({
  checkBox: {
    "& .MuiSvgIcon-root": {
      color: '#28cc95'
    }
  },
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
  radioError: {
    color: '#ff5c5c',
    margin: '-10px 14px 15px 14px',
    fontSize: '0.75rem',
    fontFamily: ' "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: '1.66', 
    letterSpacing: '0.03333em'
  },
  submitButton: {
    backgroundColor: '#509ecc',
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    "&:hover": {
      backgroundColor: '#c23a6a',
      color: 'white'
    }
  },
  addDetailsButton: {
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
  dialog: {
    "& .MuiSnackbarContent-root": {
      minWidth: '210px !important',
      backgroundColor: '#28cc95'
    },
    "& .MuiSnackbarContent-message": {
      width: '100%',
      textAlign: 'center'
    }
  }
})

const AddCourseModule1 = ({ setShowAddCourseModule1Form }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  const [newlyAddedCourse, setNewlyAddedCourse] = useState({})

  const [snackBar, setSnackBar] = useState({})
  const serverMessageOnAddCourse = useSelector(state => ({
    error: state.coursesModule1?.error,
    success: state.coursesModule1?.success
  }))
  const {error, success} = serverMessageOnAddCourse

  const displaySnackbar = () => {
    dispatch(clearCoursesModule1ServerResponse()) 
    if (error) {
      setSnackBar({
        background: '#e53c5d', 
        open: true, 
        success: false,
        text: error
      })
    }
  
    if (success) {
      setSnackBar({
        background: '#28cc95', 
        open: true, 
        success: true,
        text: `Curs Adaugat cu success!` 
      })
    }
  }

  useEffect(() => {
    displaySnackbar()
    return () => dispatch(clearCoursesModule1ServerResponse()) 
  }, [error, success])

  const formValues = {
    courseActive: false,
    courseLogo: '',
    coursePriceLogo: '',
    courseTitle: '',
    courseDate: '',
    courseRecurrence: '',
    courseZoomAccessLink: '',
    courseLinkPage: ''
  }

  const FORM_VALIDATION = Yup.object().shape({
    courseActive: Yup.boolean().required("wadaasf"),
    courseLogo: Yup.string().required("Logo-ul de curs lipseste"),
    coursePriceLogo: Yup.string().required("Logo pret curs lipseste"),
    courseTitle: Yup.string().required("Titlul cursului lipseste"),
    courseDate: Yup.string().required("Data cursului lipseste"),
    courseRecurrence: Yup.string().required("Recurenta cursului lipeste"), 
    courseZoomAccessLink: Yup.string().required("Linkul Zoom de access la curs lipseste"),
    courseLinkPage: Yup.string().required("Linkul paginii individuale a cursului lipseste"),
  })


  return (
    <div className="mt-2 d-flex">
      <section className="form-section">
        <Formik
          initialValues={formValues}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm, setErrors }) => {
            const newCourse = values
            if ( dayjs(values.courseDate).isBefore(dayjs()) ) {
              setErrors({courseDate: 'Data cursului nu poate fi in trecut'})
              return
            }

            Object.assign(newCourse, { courseId: nanoid(5)})
            dispatch(addCourseModule1(newCourse))
            
            setNewlyAddedCourse(newCourse)
            resetForm()
          }}
        >
          {({values, errors, touched, handleChange }) => (
            <Form>
              <div style={{position: 'relative'}}>
                <FormControlLabel
                  value="top"
                  control={
                    <Checkbox
                      className={localStyles.checkBox}
                      checked={values.courseActive}
                      color="primary" 
                      name="courseActive" 
                      id="courseActive" 
                      value={values.courseActive}
                      onChange={handleChange}
                    />
                  }
                  labelPlacement="end"
                />
                <span style={{color: 'white', marginLeft: '-1rem'}}>Salveaza ca activ ?</span>
                <CloseIcon
                  className="exit-section-btn"
                  onClick={() => setShowAddCourseModule1Form(false) }
                />
              </div>

              <div className="mt-2 d-flex flex-column pb-4" style={{ width: "500px" }}>
                <TextField
                  className={localStyles.textFiled}
                  autoComplete="off"
                  onChange={handleChange}
                  type="input"
                  id="courseLogo"
                  name="courseLogo"
                  label="Logo Curs"
                  variant="filled"
                  value={values.courseLogo}
                  placeholder="link spre o imagine in format JPEG, JPG sau PNG"
                  error={Boolean(errors.courseLogo && touched.courseLogo)}
                  helperText={errors.courseLogo}
                />

                <TextField
                  className={localStyles.textFiled}
                  autoComplete="off"
                  onChange={handleChange}
                  type="input"
                  id="coursePriceLogo"
                  name="coursePriceLogo"
                  label="Logo Pret Curs"
                  variant="filled"
                  value={values.coursePriceLogo}
                  placeholder="link spre o imagine in format JPEG, JPG sau PNG"
                  error={Boolean(errors.coursePriceLogo && touched.coursePriceLogo)}
                  helperText={errors.coursePriceLogo}
                />

                <TextField
                  className={localStyles.textFiled}
                  autoComplete="off"
                  onChange={handleChange}
                  type="input"
                  id="courseTitle"
                  name="courseTitle"
                  label="Titlul cursului"
                  placeholder="Titlul cursului"
                  variant="filled"
                  multiline={true}
                  maxRows={3}
                  minRows={3}
                  value={values.courseTitle}
                  error={Boolean(errors.courseTitle && touched.courseTitle)}
                  helperText={errors.courseTitle}
                />

                <TextField
                  className={localStyles.textFiled}
                  autoComplete="off"
                  onChange={handleChange}
                  type="datetime-local"
                  id="courseDate"
                  name="courseDate"
                  label="Data cursului"
                  variant="filled"
                  value={values.courseDate}
                  placeholder="format: ZZ/DD/MM"
                  error={Boolean(errors.courseDate && touched.courseDate)}
                  helperText={errors.courseDate}
                />
                
                <p className="course-recurrence mt-2">Recurență Curs (în săptămâni): </p>
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
                { errors.courseRecurrence &&
                  <p className={localStyles.radioError}>{errors.courseRecurrence}</p>
                }

                <TextField
                  className={localStyles.textFiled}
                  autoComplete="off"
                  onChange={handleChange}
                  type="input"
                  id="courseZoomAccessLink"
                  name="courseZoomAccessLink"
                  label="Link Zoom acces curs"
                  placeholder="Link de zoom pentru acces la curs"
                  variant="filled"
                  multiline={true}
                  maxRows={3}
                  minRows={3}
                  value={values.courseZoomAccessLink}
                  error={Boolean(errors.courseZoomAccessLink && touched.courseZoomAccessLink)}
                  helperText={errors.courseZoomAccessLink}
                />

                <TextField
                  className={localStyles.textFiled}
                  autoComplete="off"
                  onChange={handleChange}
                  type="input"
                  id="courseLinkPage"
                  name="courseLinkPage"
                  label="Link pagina cursului"
                  placeholder="Link spre pagina individuala a cursului"
                  variant="filled"
                  multiline={true}
                  maxRows={3}
                  minRows={3}
                  value={values.courseLinkPage}
                  error={Boolean(errors.courseLinkPage && touched.courseLinkPage)}
                  helperText={errors.courseLinkPage}
                />  

                <Button className={localStyles.submitButton} type="submit" fullWidth={true} variant="contained">
                  Confirm
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>

      { Object.keys(newlyAddedCourse).length !== 0 &&
        <section className="reveal-added-course d-flex flex-column align-items-center justify-content-center">
          <CourseModule1Card
            className="added-free-course-card"
            courseLogoClass="added-free-course-logo"
            courseDetailsClass="added-free-course-description"
            courseLogo={newlyAddedCourse.courseLogo}
            courseTitle={newlyAddedCourse.courseTitle}
            courseDate={newlyAddedCourse.courseDate}
            courseRecurrence={newlyAddedCourse.courseRecurrence}
            courseActive={newlyAddedCourse.courseActive}
          />
        </section>
      }

      { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
    </div>
  );
};

export default AddCourseModule1;
