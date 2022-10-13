import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesModule2, 
  updateCourseModule2State,
  deleteCourseModule2,
  clearCoursesModule2,
  clearCoursesModule2ServerResponse } from "../../redux/actions/coursesActions/coursesModule2";
import { appPagesConstants } from "../../constants/userPermissions";
import { doesUserHaveViewPermission } from "../../utils/helperFunctions";
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import NoAccessPage from "../../components/NoAccessPage";
import CourseModule2Card from "../../components/CoursesModule2/CourseModule2Card";
import AddCourseModule2 from '../../components/CoursesModule2/AddCourseModule2';
import ChangeCourseModule2 from '../../components/CoursesModule2/ChangeCourseModule2';
import DeleteCourseDialog from "../../components/ReusableComponents/Dialogs/DeleteCourseDialog";
import SnackBar from "../../components/ReusableComponents/SnackBar";
import ToggleCourseStateBanner from "../../components/ReusableComponents/Banners/ToggleCourseStateBanner";
import OverlayProgressCircle from "../../components/ReusableComponents/OverlayProgressCircle/OverlayProgressCircle";

const useStyles = makeStyles({
  addBtn: {
    backgroundColor: '#509ecc',
    color: 'white',
    fontSize: '.8rem',
    fontWeight: 'bold',
    "&:hover": {
      backgroundColor: '#c23a6a',
      color: 'white'
    }
  },
})

const CursuriModul2 = ({setShowPlaceholder}) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()
  
  const userPagesAccessFromStore = useSelector(state => state.authReducer.permissions)
  const hasViewPermission = doesUserHaveViewPermission(appPagesConstants.MANIPULARE_CURSURI_MODUL2, userPagesAccessFromStore)

  useEffect(() => {
    setShowPlaceholder(false)
    if (hasViewPermission) {
      dispatch(fetchCoursesModule2())
    }
    return () => dispatch(clearCoursesModule2())
  }, [])

  const [loadingData, setLoadingData] = useState({ showCircle: false, circlePosition: 'center' })
  const [snackBar, setSnackBar] = useState({})
  const coursesModule2 = useSelector(state => {
    return {
      courses: state.coursesModule2.courses,
      error: state.coursesModule2?.error
    }
  })
  const { courses, error } = coursesModule2

  const handleShowLoadingPageData = () => {
    if (courses.length === 0) {
      setLoadingData({...loadingData, showCircle: true})
      if (error) {
        setSnackBar({
          background: '#e53c5d', 
          open: true,
          upDuration: 5000,
          text: error
        })
      }
    } else {
      setLoadingData({...loadingData, showCircle: false})
    }
  }

  useEffect(() => {
    handleShowLoadingPageData()
    return () => dispatch(clearCoursesModule2ServerResponse())
  }, [courses, error])

  const [selectedCourse, setSelectedCourse] = useState({})
  const [showAddCourseModule2Form, setShowAddCourseModule2Form] = useState(false)
  const [showChangeCourseModule2Form, setShowChangeCourseModule2Form] = useState(false)
  const [courseState, setCourseState] = useState({ message: '', state: null, courseId: null })
  const [openCourseBannerState, setOpenCourseBannerState] = useState({ open: false, vertical: 'top', horizontal: 'center' })
  const [deleteCourseDialog, setDeleteCourseDialog] = useState({open: false})

  const toggleCourseState = (courseState, courseId) => {
    const message = courseState === "deactivate-course" ? 'Dezactivez Curs ?' : 'Activez Curs ?'
    const state = courseState === "deactivate-course" ? false : true
    setCourseState({ message, state, courseId })
    setOpenCourseBannerState({ ...openCourseBannerState, open: true }) 
  }

  const handleOpenDeleteCourseDialog = (course) => setDeleteCourseDialog({open: true, course})

  const handleOpenEditCourse = (course) => {
    setShowChangeCourseModule2Form(true)
    setShowAddCourseModule2Form(false)
    setSelectedCourse(course)
  }

  const handleOpenAddNewCourseSection = () => {
    setShowAddCourseModule2Form(true)
    setShowChangeCourseModule2Form(false)
  } 

  return (
    <>
      { hasViewPermission ?
        <>
          <OverlayProgressCircle overlaySetup={loadingData} />
          <div className="cursuri-platite">
            <div className="p-3">
              <h5 className="fw-bold fs-6" style={{color: 'white'}}>CURSURI MODUL 2</h5>
              <h5 className="ps-2" style={{color: 'white'}}>Toate cursurile existente:</h5>

              { coursesModule2.length === 0 &&
                <>
                  <p className="mt-5 ms-2" style={{color: 'white'}}>
                    Un moment. Cursurile se incarca...
                  </p>
                  <CircularProgress size={60} color={"secondary"} className="m-2" />
                </>
              }

              {/* Modal on activate / deactivate course */}
              <ToggleCourseStateBanner
                courseState={courseState}
                updateCourseStateAction={updateCourseModule2State}
                openBanner={openCourseBannerState}
                closeBanner={setOpenCourseBannerState}
              />

              { courses.length !== 0 &&
                <section className="show-db-courses">
                  { courses.map(course => (
                    <div className="individual-course d-flex flex-column align-items-center" key={course.courseId}>
                      { course.courseActive ?
                        <div className="deactivate-course" 
                          onClick={(element) => {
                            const courseState = element.target.className
                            const courseId = course.courseId
                            toggleCourseState(courseState, courseId) 
                          }}>
                          Dezactiveaza
                        </div>  
                        :
                        <div className="activate-course" 
                          onClick={(element) => {  
                            const courseState = element.target.className
                            const courseId = course.courseId
                            toggleCourseState(courseState, courseId) 
                          }}>
                          Activeaza
                        </div>
                      }

                      <CourseModule2Card
                        courseLogo={course.courseLogo}
                        coursePriceLogo={course.coursePriceLogo}
                        courseLink={course.courseLink}
                        courseTitle={course.courseTitle}
                        courseDate={course.courseDate}
                        courseWeekDays={course.courseWeekDays}
                        courseRecurrence={course.courseRecurrence}
                        courseActive={course.courseActive}
                      />
                      
                      <div className="manipulate-course">
                        <span onClick={() => handleOpenDeleteCourseDialog(course) }>      
                          <DeleteForeverIcon style={{color: '#e04d6b', fontSize: '1.5rem'}} /> 
                          STERGE 
                        </span>
                        <span onClick={() => handleOpenEditCourse(course)}> 
                          <EditIcon style={{color: '#0aa378', fontSize: '1.5rem'}}/> 
                          EDITEAZA 
                        </span>
                      </div>

                      { deleteCourseDialog.open && 
                        <DeleteCourseDialog
                          openDialog={deleteCourseDialog}
                          closeDialog={setDeleteCourseDialog}
                          hideChangeCourseSection={setShowChangeCourseModule2Form}
                          deleteCourseAction={deleteCourseModule2}
                        />
                      } 
                    </div>
                  ))}
                </section>
              }

              <section className="p-3 mt-3 save-courses">
                <Button 
                  variant="contained" 
                  disabled={showChangeCourseModule2Form || showAddCourseModule2Form}
                  className={localStyles.addBtn}
                  onClick={handleOpenAddNewCourseSection}>
                Adauga curs nou
                </Button>
                
                { showAddCourseModule2Form && 
                  <AddCourseModule2 setShowAddCourseModule2Form={setShowAddCourseModule2Form} /> 
                }

                { (showChangeCourseModule2Form && Object.keys(selectedCourse).length !== 0) && 
                  <ChangeCourseModule2
                    setSelectedCourse={setSelectedCourse}
                    setShowChangeCourseModule2Form={setShowChangeCourseModule2Form}
                    courseActive={selectedCourse.courseActive}
                    courseId={selectedCourse.courseId}
                    courseLogo={selectedCourse.courseLogo}
                    coursePriceLogo={selectedCourse.coursePriceLogo}
                    courseLink={selectedCourse.courseLink}
                    courseTitle={selectedCourse.courseTitle}
                    courseDate={selectedCourse.courseDate}
                    courseWeekDays={selectedCourse.courseWeekDays}
                    courseRecurrence={selectedCourse.courseRecurrence}
                  /> 
                }
              </section>
            </div>
          </div>
          { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
        </>
        :
        <NoAccessPage />
      }
    </>
  )
}

export default CursuriModul2;
