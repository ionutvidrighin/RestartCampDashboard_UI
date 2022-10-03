import { ActionTypes } from '../../actions/action_types';

const intialState = {
  data: null
}

const searchStudentReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_STUDENT_DATA:
      return {
        data: payload,
        success: true
      }
    case ActionTypes.ERROR_GET_STUDENT_DATA:
      return {
        data: null,
        success: false,
        error: payload
      }
    case ActionTypes.CLEAR_STUDENT_DATA:
      return {
        data: null,
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        data: null
      }
    default:
      return state;
  }

}

export default searchStudentReducer;