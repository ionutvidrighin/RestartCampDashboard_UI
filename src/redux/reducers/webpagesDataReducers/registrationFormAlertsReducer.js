import { ActionTypes } from '../../actions/action_types';

const intialState = {
  alerts: null,
}

const coursesPageData = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_REGISTRATION_FORM_ALERTS:
      return {
        alerts: payload,
        success: true
      }
    case ActionTypes.ERROR_GET_REGISTRATION_FORM_ALERTS:
      return {
        alerts: null,
        success: false,
        serverMessage: payload
      }
    case ActionTypes.UPDATE_REGISTRATION_FORM_ALERTS:
      return {
        alerts: payload,
        success: true,
        serverMessage: 'Registration Form Alerts Updated Successfully'
      }
    case ActionTypes.ERROR_UPDATE_REGISTRATION_FORM_ALERTS:
      return {
        ...state,
        serverMessage: 'Registration Form Alerts could not be updated',
        error: payload,
      }
    case ActionTypes.CLEAR_SERVER_MESSAGE_RESPONSE:
      const currentState = state
      delete currentState['serverMessage']
      return currentState
    case ActionTypes.CLEAR_REGISTRATION_FORM_ALERTS_STATE:
      return {
        alerts: null
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        alerts: null
      }
    default:
      return state;
  }
}

export default coursesPageData;