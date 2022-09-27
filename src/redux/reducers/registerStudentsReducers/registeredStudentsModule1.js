import { ActionTypes } from '../../actions/action_types';

const intialState = {
  students: []
}

const registeredStudentsModule1 = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_ALL_STUDENTS:
      return {
        students: payload
      }
    case ActionTypes.GET_STUDENTS_IN_COURSES_MOD1_BY_DATE:
      return {
        students: payload
      }
    case ActionTypes.ERROR_GET_STUDENTS_IN_COURSES_MOD1_BY_DATE:
      return {
        students: [],
        error: payload
      }
    case ActionTypes.GET_STUDENTS_IN_COURSES_MOD1_BY_COURSE_NAME_AND_CAREER:
      return {
        students: payload
      }
    case ActionTypes.ERROR_GET_STUDENTS_IN_COURSES_MOD1_BY_COURSE_NAME_AND_CAREER:
      return {
        students: [],
        error: payload
      }
    case ActionTypes.CLEAR_STUDENTS_IN_COURSES_MOD1_STATE: 
      return {
        students: []
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        students: []
      }
    default:
      return state;
  }
}

export default registeredStudentsModule1;