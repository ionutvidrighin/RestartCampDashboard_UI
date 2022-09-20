import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesModule1, 
  updateCourseModule1State, 
  deleteCourseModule1,
  clearCoursesModule1,
  clearCoursesModule1ServerResponse } from "../../redux/actions/coursesActions/coursesModule1";
import { doesUserHavePermission } from "../../utils/helperFunctions";
import { makeStyles } from '@material-ui/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import NoAccessPage from "../../components/NoAccessPage";
import ToggleCourseStateBanner from "../../components/ReusableComponents/ToggleCourseStateBanner";
import CourseModule1Card from "../../components/CoursesModule1/CourseModule1Card";
import AddCourseModule1 from "../../components/CoursesModule1/AddCourseModule1";
import ChangeCourseModule1 from "../../components/CoursesModule1/ChangeCourseModule1";
import DeleteCourseDialog from "../../components/ReusableComponents/DeleteCourseDialog";
import SnackBar from "../../components/ReusableComponents/SnackBar";
import OverlayProgressCircle from "../../components/ReusableComponents/OverlayProgressCircle/OverlayProgressCircle";

const useStyles = makeStyles({
  deleteCourseDialog: {
    "& .MuiSnackbarContent-root": {
      minWidth: '210px !important',
      backgroundColor: '#28cc95'
    },
    "& .MuiSnackbarContent-message": {
      width: '100%',
      textAlign: 'center',
      color: 'black'
    }
  },
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

const CursuriModul1 = ({setShowPlaceholder}) => {
  const localStyles = useStyles()
  const dispatch = useDispatch()
  const route = useLocation()
  const { pathname } = route
  
  const getUserPagesAccessFromStore = useSelector(state => state.authReducer.pagesPermission)
  const userHasPermission = doesUserHavePermission(pathname, getUserPagesAccessFromStore)

  useEffect(() => {
    setShowPlaceholder(false)
    if (userHasPermission) {
      dispatch(fetchCoursesModule1())
    }
    return () => dispatch(clearCoursesModule1())
  }, [])

  const [loadingData, setLoadingData] = useState({ showCircle: false, circlePosition: 'center' })
  const [snackBar, setSnackBar] = useState({})
  const coursesModule1 = useSelector(state => ({
    courses: state.coursesModule1.courses,
    success: state.coursesModule1?.success,
    error: state.coursesModule1?.error
  }))
  const { courses, success, error } = coursesModule1

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

    return () => dispatch(clearCoursesModule1ServerResponse())
  }, [courses, error])

  const [selectedCourse, setSelectedCourse] = useState({})
  const [showAddCourseModule1Form, setShowAddCourseModule1Form] = useState(false)
  const [showChangeCourseModule1, setShowChangeCourseModule1] = useState(false)
  const [courseState, setCourseState] = useState({ message: '', state: null, courseId: null })
  const [openCourseBannerState, setOpenCourseBannerState] = useState({ open: false, vertical: 'top', horizontal: 'center' })
  const [deleteCourseDialog, setDeleteCourseDialog] = useState({open: false})

  const toggleCourseState = (courseState, courseId) => {
    const message = courseState === "deactivate-course" ? 'Dezactivez Curs ?' : 'Activez Curs ?'
    const state = courseState === "deactivate-course" ? false : true
    setCourseState({ message, state, courseId })
    setOpenCourseBannerState({...openCourseBannerState, open: true})
  }
  
  const handleOpenDeleteCourseDialog = (course) => setDeleteCourseDialog({open: true, course})

  const handleOpenEditCourse = (course) => {
    setShowChangeCourseModule1(true)
    setShowAddCourseModule1Form(false)
    setSelectedCourse(course)
  }

  const handleOpenAddNewCourseSection = () => {
    setShowAddCourseModule1Form(true)
    setShowChangeCourseModule1(false)
  }

  return (
    <>
     { userHasPermission ?
      <>
        <OverlayProgressCircle overlaySetup={loadingData} />
        <div className="cursuri-gratuite">
          <div className="p-3 component-content">
            <h5 className="fw-bold fs-6" style={{color: 'white'}}>CURSURI MODUL 1</h5>
            <h5 className="ps-2" style={{color: 'white'}}>Toate cursurile existente:</h5>

            {/* Modal on activate / deactivate course */}
            <ToggleCourseStateBanner
              courseState={courseState}
              updateCourseStateAction={updateCourseModule1State}
              openBanner={openCourseBannerState}
              closeBanner={setOpenCourseBannerState}
            />

            { courses.length !== 0 &&
              <div className="show-db-courses">
                { courses.map(course => (
                  <div className="individual-course d-flex flex-column align-items-center" key={course.courseId}>
                    { course.courseActive ?
                      <div className="deactivate-course" 
                        onClick={ (element) => {  
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
                    
                    {/* render a card for each course */}
                    <CourseModule1Card
                      courseLogo={course.courseLogo}
                      coursePriceLogo={course.coursePriceLogo}
                      courseTitle={course.courseTitle}
                      courseDate={course.courseDate}
                      courseRecurrence={course.courseRecurrence}
                      courseActive={course.courseActive}
                      courseAccessLink={course.courseAccessLink}
                    />

                    <div className="delete-edit-course">
                      <span onClick={() => handleOpenDeleteCourseDialog(course)}>      
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
                        hideChangeCourseSection={setShowChangeCourseModule1}
                        deleteCourseAction={deleteCourseModule1}
                      />
                    }
                  </div>
                  )
                )}
              </div>
            }

            <div className="p-3 mt-3 save-courses">
              <Button 
                variant="contained" 
                disabled={showChangeCourseModule1 || showAddCourseModule1Form}
                className={localStyles.addBtn}
                onClick={handleOpenAddNewCourseSection}>
              Adauga curs nou
              </Button>
              
              { showAddCourseModule1Form && 
                <AddCourseModule1 setShowAddCourseModule1Form={setShowAddCourseModule1Form} /> 
              }
              
              { (showChangeCourseModule1 && Object.keys(selectedCourse).length !== 0) && 
                <ChangeCourseModule1
                  setSelectedCourse={setSelectedCourse}
                  setShowChangeCourseModule1={setShowChangeCourseModule1}
                  courseActive={selectedCourse.courseActive}
                  courseId={selectedCourse.courseId}
                  courseLogo={selectedCourse.courseLogo}
                  coursePriceLogo={selectedCourse.coursePriceLogo}
                  courseTitle={selectedCourse.courseTitle}
                  courseDate={selectedCourse.courseDate}
                  courseZoomAccessLink={selectedCourse.courseZoomAccessLink}
                  courseLinkPage={selectedCourse.courseLinkPage}
                  courseRecurrence={selectedCourse.courseRecurrence}
                /> 
              }
            </div>
          </div>
        </div>
        { snackBar.open && <SnackBar snackbarData={snackBar} setSnackBar={setSnackBar} /> }
      </>
      :
      <NoAccessPage/>
     }
    </>
  )
};

export default CursuriModul1;
