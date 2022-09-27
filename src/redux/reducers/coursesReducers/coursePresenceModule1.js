import { ActionTypes } from '../../actions/action_types';

const intialState = {
  presence: []
}

const coursePresenceModule1 = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_COURSE_MODULE_1_PRESENCE:
      return {
        presence: payload
      }
    case ActionTypes.ERROR_GET_COURSE_MODULE_1_PRESENCE:
      return {
        presence: [],
        error: payload
      }
    case ActionTypes.CLEAR_COURSE_MODULE_1_PRESENCE:
      return {
        presence: []
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        presence: []
      }
    default:
      return state;
  }
}

export default coursePresenceModule1;