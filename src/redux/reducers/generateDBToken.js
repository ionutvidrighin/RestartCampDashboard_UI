import { ActionTypes } from '../actions/action_types';

const initialState = {
  value: null
}

const generateDBTokenReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case ActionTypes.GENERATE_DATABASE_TOKEN:
      const currentState = {
        value: payload
      }
      delete currentState.error
      return currentState
    case ActionTypes.ERROR_GENERATE_DATABASE_TOKEN: 
      return {
        value: "error",
        error: payload
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT: 
      return {
        value: null
      }
    default:
      return state
  }
}

export default generateDBTokenReducer