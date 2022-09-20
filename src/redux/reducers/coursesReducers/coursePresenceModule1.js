import { ActionTypes } from '../../actions/action_types';

const intialState = {
  presence: []
}

const coursePresenceModule1 = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_COURSE_PRESENCE:
      return {
        presence: payload
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