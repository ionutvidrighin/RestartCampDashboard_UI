import React, { useState } from "react";
import { nanoid } from 'nanoid';
import { useDispatch } from "react-redux";
import { addCourseModule2 } from "../../redux/actions/coursesActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import weekDayNames from "../../constants/weekdayNames";
import CourseModule2Card from "./CourseModule2Card";
import dayjs from 'dayjs';

//overriding MaterialUI styles
const useStyles = makeStyles({
  checkBox: {
    "& .MuiSvgIcon-root": {
      color: '#d9dbdb'
    }
  },
  textField: {
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

const AddCourseModule2 = ({ setShowAddCourseModule2Form }) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()

  /* ************************ */
  // setup for pop-up dialog on activate/deactivate course
  const [snackbar, setSnackBar] = useState({
    open: false,
    error: false,
    vertical: 'bottom',
    horizontal: 'right',
    text: ""
  })

  const {open, vertical, horizontal} = snackbar

  const handleClose = () => {
    setSnackBar({ ...snackbar, open: false })
  }
  /* ************************ */

  
  const [selectedCourseWeekDays, setSelectedCourseWeekDays] = useState([])
  
  const formValues = {
    courseActive: false,
    courseLogo: '',
    coursePriceLogo: '',
    courseLink: '',
    courseTitle: '',
    courseDate: '',
    courseRecurrence: ''
  }

  const FORM_VALIDATION = Yup.object().shape({
    courseActive: Yup.boolean().required("wadaasf"),
    courseLogo: Yup.string().required("Logo-ul de curs lipseste"),
    coursePriceLogo: Yup.string().required("Logo pret curs lipseste"),
    courseLink: Yup.string().required("Linkul spre curs lipseste"),
    courseTitle: Yup.string().required("Titlul cursului lipseste"),
    courseDate: Yup.string().required("Data cursului lipeste"),
    courseRecurrence: Yup.string().required("Recurenta cursului lipeste")
  })

  const [newlyAddedCourse, setNewlyAddedCourse] = useState({})

  return (
    <div className="mt-2 d-flex">
      <section className="form-section">

        <div className="d-flex justify-content-end" style={{position: 'relative'}}>
          <CloseIcon
            className="exit-section-btn"
            onClick={() => setShowAddCourseModule2Form(false) }
          />
        </div>

        <Formik
          initialValues={formValues}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm, setErrors }) => {
            const newCourse = values
            console.log(newCourse)

            if ( dayjs(values.courseDate).isBefore(dayjs()) ) {
              setErrors({ courseDate: 'Data cursului nu poate fi in trecut' })
              return
            }

            Object.assign(newCourse, {
              courseId: nanoid(5),
              courseWeekDays: selectedCourseWeekDays
            })
            
            dispatch(addCourseModule2(newCourse))
            setNewlyAddedCourse(newCourse)
            setSnackBar({ ...snackbar, open: true, error: false, text: "Curs adaugat cu success!" })
            resetForm()
          }}
        >
          {({values, errors, touched, handleChange }) => (
            <Form>
              <FormControlLabel
                value="top"
                control={
                  <Checkbox
                    className={localStyles.checkBox}
                    checked={values.courseActive}
                    name="courseActive" 
                    id="courseActive" 
                    value={values.courseActive}
                    onChange={handleChange}
                  />
                }
                labelPlacement="end"
              />
              <span style={{color: 'white', marginLeft: '-1rem'}}>Salveaza ca activ ?</span>
              <div className="mt-4 d-flex flex-column pb-4" style={{ width: "500px" }}>
                <TextField
                  className={localStyles.textField}
                  autoComplete="off"
                  onChange={handleChange}
                  type="input"
                  id="courseLogo"
                  name="courseLogo"
                  label="Logo Curs"
                  variant="filled"
                  value={values.courseLogo}
                  placeholder="sub forma http(s)://"
                  error={Boolean(errors.courseLogo && touched.courseLogo)}
                  helperText={errors.courseLogo}
                />

                <TextField
                  className={localStyles.textField}
                  autoComplete="off"
                  onChange={handleChange}
                  type="input"
                  id="coursePriceLogo"
                  name="coursePriceLogo"
                  label="Logo Pret Curs"
                  variant="filled"
                  value={values.coursePriceLogo}
                  placeholder="sub forma http(s)://"
                  error={Boolean(errors.coursePriceLogo && touched.coursePriceLogo)}
                  helperText={errors.coursePriceLogo}
                />

                <TextField
                  className={localStyles.textField}
                  autoComplete="off"
                  onChange={handleChange}
                  type="input"
                  id="courseLink"
                  name="courseLink"
                  label="Linkul spre curs"
                  variant="filled"
                  value={values.courseLink}
                  placeholder="sub forma http(s)://"
                  error={Boolean(errors.courseLink && touched.courseLink)}
                  helperText={errors.courseLink}
                />

                <TextField
                  className={localStyles.textField}
                  autoComplete="off"
                  onChange={handleChange}
                  type="input"
                  id="courseTitle"
                  name="courseTitle"
                  label="Titlul cursului"
                  variant="filled"
                  multiline={true}
                  maxRows={3}
                  minRows={3}
                  value={values.courseTitle}
                  placeholder="titlu curs.."
                  error={Boolean(errors.courseTitle && touched.courseTitle)}
                  helperText={errors.courseTitle}
                />

                <TextField
                  className={localStyles.textField}
                  autoComplete="off"
                  onChange={handleChange}
                  type="datetime-local"
                  id="courseDate"
                  name="courseDate"
                  label="Data cursului"
                  variant="filled"
                  placeholder="format: ZZ/DD/MM"
                  value={values.courseDate}
                  error={Boolean(errors.courseDate && touched.courseDate)}
                  helperText={errors.courseDate}
                />
                
                <p className="m-0 course-recurrence">Cursul va avea loc în zilele de:</p>
                <div className="course-days">
                  { weekDayNames.map((item, index) => (
                     <div key={index}> 
                      <FormControlLabel
                        control={
                          <Checkbox
                            className={localStyles.checkBox}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCourseWeekDays([...selectedCourseWeekDays, {name: item.name, day: item.day}])
                              } else {
                                setSelectedCourseWeekDays(selectedCourseWeekDays.filter(course => course.name !== item.name))
                              }
                            }}
                            name={`courseDays[${index}]`}
                            value={item[index]}
                          />
                        }
                        label={item.name}
                      />
                     </div>
                  ))}
                </div>

                <p className="course-recurrence mt-3">Recurență Curs (în săptămâni): </p>
                <RadioGroup 
                  className={`${localStyles.radio} flex-row`}
                  aria-label="Recurenta Curs(în săptămâni)" 
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
                  <p className={localStyles.radioError}>
                    {errors.courseRecurrence}
                  </p>
                }
                <br />
                <Button 
                  className={localStyles.button} 
                  type="submit" 
                  fullWidth={true} 
                  variant="contained"
                  disabled={selectedCourseWeekDays.length === 0}>
                  Confirm
                </Button>
              </div>
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
      
      { Object.keys(newlyAddedCourse).length !== 0 &&
        <section className="reveal-added-course d-flex flex-column align-items-center justify-content-center">
          <CourseModule2Card
            className="added-paid-course-card"
            courseLogoClass="added-paid-course-logo"
            courseDetailsClass="added-paid-course-details"
            courseLogo={newlyAddedCourse.courseLogo}
            courseLink={newlyAddedCourse.courseLink}
            courseTitle={newlyAddedCourse.courseTitle}
            courseDate={newlyAddedCourse.courseDate}
            courseRecurrence={newlyAddedCourse.courseRecurrence}
            courseActive={newlyAddedCourse.courseActive}
          />
        </section>
      }
    </div>
  );
};

export default AddCourseModule2;
