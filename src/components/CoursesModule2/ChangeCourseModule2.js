import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeCourseModule2 } from "../../redux/actions/coursesActions/coursesModule2";
import CourseModule2Card from "./CourseModule2Card";
import { Formik, Form } from "formik";
import { makeStyles } from '@material-ui/styles';
import * as Yup from "yup";
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import weekDayNames from "../../constants/weekdayNames";
import dayjs from 'dayjs';
import isEqual from 'lodash.isequal';

//overriding MaterialUI styles
const useStyles = makeStyles({
  checkBox: {
    "& .MuiSvgIcon-root": {
      color: '#d9dbdb'
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

const ChangeCourseModule2 = ({
  setShowChangeCourseModule2Form,
  courseActive,
  courseId,
  courseLogo,
  coursePriceLogo,
  courseLink,
  courseTitle,
  courseDate,
  courseWeekDays,
  courseRecurrence,
  setSelectedCourse
}) => {

  const localStyles = useStyles()
  const dispatch = useDispatch()

  // state used to show/hide the course recurrence days
  const [courseRecurrenceDays, setCourseRecurrenceDays] = useState(false)

  /* ************************ */
  // setup for pop-up dialog on activate/deactivate course
  const [snackbar, setSnackBar] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
    text: "",
    error: false
  })

  const {open, vertical, horizontal} = snackbar

  const handleClose = () => {
    setSnackBar({ ...snackbar, open: false })
  }
  /* ************************ */

  const orderedWeekDayNames = courseWeekDays.sort((a, b) => a.day - b.day)
   const [selectedCourseWeekDays, setSelectedCourseWeekDays] = useState([])

 // weekDayNames = weekDayNames.map(obj => courseWeekDays.find(item => item.name === obj.name) || obj)


  const formValues = {
    courseActive,
    courseId,
    courseLogo,
    coursePriceLogo,
    courseLink,
    courseTitle,
    courseDate,
    courseRecurrence
  };

  const FORM_VALIDATION = Yup.object().shape({
    courseLogo: Yup.string().required("Link-ul logo-ului cursului lipseste"),
    coursePriceLogo: Yup.string().required("Logo-ul pret curs lipseste"),
    courseLink: Yup.string().required("Linkul spre curs lipseste"),
    courseTitle: Yup.string().required("Titlul cursului lipseste"),
    courseDate: Yup.string().required("Data cursului lipseste"),
    courseRecurrence: Yup.string().required("Recurenta cursului lipeste")
  })


  return (
    <div className="mt-2 d-flex">
      <section className="form-section mt-2">
        <div className="d-flex" style={{position: 'relative'}}>
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
            onClick={() => setShowChangeCourseModule2Form(false)}
          />
        </div>

        <Formik
          enableReinitialize={true}
          initialValues={formValues}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, {setErrors}) => {
            const initialCourseData = formValues
            const updatedCourseData = values

            Object.assign(updatedCourseData, { courseId, courseWeekDays: selectedCourseWeekDays })

            if ( dayjs(values.courseDate).isBefore(dayjs()) ) {
              setErrors({courseDate: 'Data cursului nu poate fi in trecut'})
              return
            }
            
            if ( isEqual(initialCourseData, updatedCourseData) ) {
              setSnackBar({...snackbar, open: true, error: true, text: "Nicio modificare detectată !"})
              return
            }

            dispatch(changeCourseModule2(updatedCourseData))
            setSelectedCourse(updatedCourseData)
            setSnackBar({...snackbar, open: true, error: false, text: "Curs modificat cu succes!"})
          }}
        >
          {({ errors, values, touched, handleChange }) => (
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
                placeholder="sub forma http(s)://"
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
                placeholder="sub forma http(s)://"
                error={Boolean(errors.coursePriceLogo && touched.coursePriceLogo)}
                helperText={errors.coursePriceLogo}
              />

              <TextField
                className={localStyles.textFiled}
                value={values.courseLink}
                autoComplete="off"
                onChange={handleChange}
                type="input"
                id="courseLink"
                name="courseLink"
                label="Linkul spre curs"
                variant="filled"
                placeholder="sub forma http(s)://"
                error={Boolean(errors.courseLink && touched.courseLink)}
                helperText={errors.courseLink}
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

              <div className="d-flex flex-column course-days">
                <div className="d-flex">
                  <p className="m-0 course-recurrence">Cursul are loc în zilele de:</p>
                  { orderedWeekDayNames.map((weekDay, index) => (
                      <span key={index} className="ms-2 course-week-days"> {weekDay.name} </span> 
                    ))
                  }
                </div>

                <div className="d-flex flex-column mt-1">
                  <p className="mb-0 fst-italic">Modifică zilele:</p>
                  <div className="d-flex course-days">
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
                                name={`weekDayNames[${index}]`}
                                value={item[index]}
                              />
                            }
                            label={item.name}
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>

              <p className="course-recurrence mt-2">Recurență Curs:</p>
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
        autoHideDuration={7000}
      />

      <section className="selected-course d-flex flex-column align-items-center justify-content-center">
        <h5 className="mb-2">Curs selectat:</h5>
        <p className="text-center fst-italic px-2">{courseTitle}</p>
        <CourseModule2Card
          className="selected-paid-course-card"
          courseDetailsClass="selected-paid-course-details"
          courseLogo={courseLogo}
          coursePriceLogo={coursePriceLogo}
          courseLink={courseLink}
          courseTitle={courseTitle}
          courseDate={courseDate}
          courseWeekDays={courseWeekDays}
          courseRecurrence={courseRecurrence}
          courseActive={courseActive}
          showCourseRecurrence={courseRecurrenceDays}
        />
      </section>
    </div>
  );
};

export default ChangeCourseModule2;
