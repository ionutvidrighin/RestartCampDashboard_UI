import { ActionTypes } from '../actions/action_types'

const intialState = {
  studentData: {},
  serverResponse: null
}

const unsubscribeOrRemoveStudent = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_STUDENT_DATA_FOR_UNSUBSCRIBE_OR_REMOVE:
      return {
        studentData: payload.data,
        serverResponse: payload.status
      }
    case ActionTypes.UNSUBSCRIBED_OR_REMOVED_STUDENT:
      return {
        studentData: {
          message: payload.data.message,
          studentInCoursesModule1: [],
          studentInCoursesModule2: [],
          studentPresenceInCoursesModule1: []
        },
        serverResponse: payload.status
      }
    case ActionTypes.STUDENT_NOT_UNSUBSCRIBED_OR_REMOVED:
      return {
        studentData: {
          error: payload.data
        },
        serverResponse: payload.status
      }
    case ActionTypes.STUDENT_NOT_FOUND: 
      return {
        studentData: payload.data,
        serverResponse: payload.status
      }
    case ActionTypes.CLEAR_UNSUBSCRIBE_OR_REMOVE_STUDENT_STATE:
      return {
        studentData: {},
        serverResponse: null
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        studentData: {},
        serverResponse: null
      }
    default:
      return state;
  }
}

export default unsubscribeOrRemoveStudent;