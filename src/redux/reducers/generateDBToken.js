import { ActionTypes } from '../actions/action_types';

const initialState = {
  isDialogOpen: true,
  isTokenGenerated: false,
  value: null
}

const generateDBTokenReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case ActionTypes.TOGGLE_GENERATE_DATABASE_TOKEN_DIALOG:
      return {
        ...state,
        isDialogOpen: !state.isDialogOpen
      }
    case ActionTypes.GENERATE_DATABASE_TOKEN:
      const currentState = {
        ...state,
        isTokenGenerated: true,
        value: payload
      }
      delete currentState.error
      return currentState
    case ActionTypes.ERROR_GENERATE_DATABASE_TOKEN: 
      return {
        ...state,
        isTokenGenerated: false,
        value: "error",
        error: payload
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT: 
      return {
        isDialogOpen: false,
        isTokenGenerated: false,
        value: null
      }
    default:
      return state
  }
}

export default generateDBTokenReducer