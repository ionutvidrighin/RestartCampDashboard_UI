import { ActionTypes } from '../actions/action_types';

const intialState = {
  module1: {
    data: []
  },
  module2: {
    data: []
  }
}

const courses = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_COURSES_MODULE_1:
      return {
        ...state,
        module1: { data: payload }
      }
    case ActionTypes.GET_COURSES_MODULE_2:
      return {
        ...state,
        module2: { data: payload }
      }

    case ActionTypes.ADD_COURSE_MODULE_1:
      return {
        ...state,
        module1: { data: [payload, ...state.module1.data], success: true }
      }
    case ActionTypes.ADD_COURSE_MODULE_2:
      return {
        ...state,
        module2: { data: [payload, ...state.module2.data], success: true }
      }

    case ActionTypes.TOGGLE_COURSE_MODULE_1_STATE:
      const courseMod1Index = state.module1.data.findIndex(course => course.courseId === payload.courseId)
      const coursesListMod1 = [...state.module1.data]
      coursesListMod1[courseMod1Index].courseActive = payload.courseActive
      return {
        ...state,
        module1: { data: coursesListMod1, success: true }
      }
    case ActionTypes.TOGGLE_COURSE_MODULE_2_STATE:
      const courseMod2Index = state.module2.data.findIndex(course => course.courseId === payload.courseId)
      const coursesListMod2 = [...state.module2.data]
      coursesListMod2[courseMod2Index].courseActive = payload.courseActive
      return {
        ...state,
        module2: { data: coursesListMod2, success: true }
      }

    case ActionTypes.UPDATE_COURSE_MODULE_1_DATA:
      const courseMod1 = state.module1.data.findIndex(course => course.courseId === payload.courseId)
      const updatedCoursesListMod1 = [...state.module1.data]
      updatedCoursesListMod1[courseMod1] = payload
      return {
        ...state,
        module1: { data: updatedCoursesListMod1, success: true }
      }
    case ActionTypes.UPDATE_COURSE_MODULE_2_DATA:
      const courseMod2 = state.module2.data.findIndex(course => course.courseId === payload.courseId)
      const updatedCoursesListMod2 = [...state.module2.data]
      updatedCoursesListMod1[courseMod2] = payload
      return {
        ...state,
        module2: { data: updatedCoursesListMod2, success: true }
      }

    case ActionTypes.DELETE_COURSE_MODULE_1:
      const allCoursesMod1 = [...state.module1.data]
      const newCoursesListMod1 = allCoursesMod1.filter(course => course.courseId !== payload.courseId)
      return {
        ...state,
        module1: { data: newCoursesListMod1, success: true }
      }
    case ActionTypes.DELETE_COURSE_MODULE_2:
      const allCoursesMod2 = [...state.module2.data]
      const newCoursesListMod2 = allCoursesMod2.filter(course => course.courseId !== payload.courseId)
      return {
        ...state,
        module2: { data: newCoursesListMod2, success: true }
      }

    case ActionTypes.ERROR_GET_COURSES_MODULE_1:
    case ActionTypes.ERROR_ADD_COURSE_MODULE_1:
    case ActionTypes.ERROR_TOGGLE_COURSE_MODULE_1_STATE:
    case ActionTypes.ERROR_UPDATE_COURSE_MODULE_1_DATA:
    case ActionTypes.ERROR_DELETE_COURSE_MODULE_1:
      return {
        ...state,
        module1: {
          data: state.module1.data,
          success: false,
          error: payload
        }
      }
    case ActionTypes.ERROR_GET_COURSES_MODULE_2:
    case ActionTypes.ERROR_ADD_COURSE_MODULE_2:
    case ActionTypes.ERROR_TOGGLE_COURSE_MODULE_2_STATE:
    case ActionTypes.ERROR_UPDATE_COURSE_MODULE_2_DATA:
    case ActionTypes.ERROR_DELETE_COURSE_MODULE_2:
      return {
        ...state,
        module2: {
          data: state.module2.data,
          success: false,
          error: payload
        }
      }

    case ActionTypes.CLEAR_COURSES_MODULE_1_SERVER_RESPONSE:
    case ActionTypes.CLEAR_COURSES_MODULE_2_SERVER_RESPONSE:
      return {
        module1: { data: state.module1.data },
        module2: { data: state.module2.data }
      }

    case ActionTypes.CLEAR_COURSES_MODULE_1:
    case ActionTypes.CLEAR_COURSES_MODULE_2:
      return {
        module1: { data: [] },
        module2: { data: [] }
      }

    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        module1: { data: [] },
        module2: { data: [] }
      }

    default:
      return state
  }
}

export default courses
