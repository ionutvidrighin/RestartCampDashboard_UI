import { ActionTypes } from '../actions/action_types';

const intialState = {
  registeredForCourseMod1: {
    data: []
  },
  registeredForCourseMod2: {
    data: []
  },
  presenceAtCourseMod1: {
    data: []
  },
  singleStudent: {
    data: null
  }
}

const students = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_STUDENTS_IN_COURSES_MOD1_BY_DATE:
      return {
        ...state,
        registeredForCourseMod1: { data: payload }
      }
    case ActionTypes.ERROR_GET_STUDENTS_IN_COURSES_MOD1_BY_DATE:
      return {
        ...state,
        registeredForCourseMod1: { data: [], error: payload }
      }
    case ActionTypes.GET_STUDENTS_IN_COURSES_MOD1_BY_COURSE_NAME_AND_CAREER:
      return {
        ...state,
        registeredForCourseMod1: { data: payload }
      }
    case ActionTypes.ERROR_GET_STUDENTS_IN_COURSES_MOD1_BY_COURSE_NAME_AND_CAREER:
      return {
        ...state,
        registeredForCourseMod1: { data: [], error: payload }
      }
    case ActionTypes.GET_STUDENTS_PRESENCE_AT_COURSE_MOD1: 
      return {
        ...state,
        presenceAtCourseMod1: { data: payload }
      }
    case ActionTypes.ERROR_GET_STUDENTS_PRESENCE_AT_COURSE_MOD1:
      return {
        ...state,
        presenceAtCourseMod1: { data: [], error: payload }
      }
    case ActionTypes.GET_STUDENT_DATA:
      return {
        ...state,
        singleStudent: { data: payload, success: true }
      }
    case ActionTypes.ERROR_GET_STUDENT_DATA:
      return {
        ...state,
        singleStudent: { data: null, success: false, error: payload }
      }
    case ActionTypes.CLEAR_STUDENTS_IN_COURSES_MOD1:
    case ActionTypes.CLEAR_STUDENTS_IN_COURSES_MOD2:
    case ActionTypes.CLEAR_STUDENTS_PRESENCE_AT_COURSE_MOD1:
    case ActionTypes.CLEAR_STUDENT_DATA:
      return {
        registeredForCourseMod1: { data: [] },
        registeredForCourseMod2: { data: [] },
        presenceAtCourseMod1: { data: [] },
        singleStudent: { data: null }
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        registeredForCourseMod1: { data: [] },
        registeredForCourseMod2: { data: [] },
        presenceAtCourseMod1: { data: [] },
        singleStudent: { data: null }
      }
    default:
      return state;
  }
}

export default students