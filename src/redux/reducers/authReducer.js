import { ActionTypes } from '../actions/action_types';

const intialState = {
  username: null,
  access: null,
  pagesPermission: [],
  isLogged: false
}

const authReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOG_USER_IN:
      return payload
    case ActionTypes.LOG_USER_OUT:
      return payload 
    case ActionTypes.UPDATE_USERNAME: 
      return {
        ...state,
        username: payload
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        username: null,
        access: null,
        pagesPermission: [],
        isLogged: false
      }
    default:
      return state;
  }
}

export default authReducer;