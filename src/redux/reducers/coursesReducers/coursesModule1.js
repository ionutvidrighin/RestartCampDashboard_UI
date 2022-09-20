import { ActionTypes } from '../../actions/action_types';

const intialState = {
  courses: []
}

const coursesModule1 = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_COURSES_MODULE_1:
      return {
        courses: payload
      }
    case ActionTypes.ADD_COURSE_MODULE_1:
      return {
        courses: [payload, ...state.courses],
        success: true
      }
    case ActionTypes.UPDATE_COURSE_MODULE_1_STATE:
      const courseToUpdate = state.courses.findIndex(course => course.courseId === payload.courseId)
      const updatedCourses = [...state.courses]
      updatedCourses[courseToUpdate].courseActive = payload.courseActive
      return {
        courses: updatedCourses,
        success: true
      }
    case ActionTypes.CHANGE_COURSE_MODULE_1:
      const courseToChange = state.courses.findIndex(course => course.courseId === payload.courseId)
      const changedCourses = [...state.courses]
      changedCourses[courseToChange] = payload
      return {
        courses: changedCourses,
        success: true
      }
    case ActionTypes.DELETE_COURSE_MODULE_1:
      const allCourses = [...state.courses]
      const newCoursesList = allCourses.filter(course => course.courseId !== payload.courseId)
      return {
        courses: newCoursesList,
        success: true
      }
    case ActionTypes.ERROR_GET_COURSES_MODULE_1:
    case ActionTypes.ERROR_ADD_COURSE_MODULE_1:
    case ActionTypes.ERROR_UPDATE_COURSE_MODULE_1_STATE:
    case ActionTypes.ERROR_CHANGE_COURSE_MODULE_1:
    case ActionTypes.ERROR_DELETE_COURSE_MODULE_1:
      return {
        courses: state.courses,
        success: false,
        error: payload
      }
    case ActionTypes.CLEAR_COURSES_MODULE_1_SERVER_RESPONSE:
      return {
        courses: state.courses
      }
    case ActionTypes.CLEAR_COURSES_MODULE_1:
      return {
        courses: []
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        courses: []
      }
    default:
      return state;
  }
}

export default coursesModule1;
