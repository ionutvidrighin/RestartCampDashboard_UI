import { ActionTypes } from '../../actions/action_types';

const intialState = {
  template: null
}

const email3DaysEmployee = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SUCCESS_GET_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE:
      return {
        ...state,
        template: payload,
        success: true
      }
    case ActionTypes.ERROR_GET_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE:
      return {
        template: null,
        success: false,
        serverMessage: payload
      }
    case ActionTypes.SUCCESS_UPDATE_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE:
      return {
        template: payload,
        serverMessage: "Update Successfull"
      }
    case ActionTypes.ERROR_UPDATE_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE:
      return {
        ...state,
        serverMessage: "Update Failed"
      }
    case ActionTypes.SUCCESS_SEND_TEST_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE:
      return {
        ...state,
        serverMessage: "Sent Successfull",
        emailResponse: payload.emailResponse
      }
    case ActionTypes.ERROR_SEND_TEST_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE: 
      return {
        ...state,
        serverMessage: "Sent Failed",
      }
    case ActionTypes.CLEAR_SERVER_MESSAGE_RESPONSE: 
      const currentState = state
      delete currentState['serverMessage']
      return currentState
    case ActionTypes.CLEAR_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE_STATE:
      return {
        template: null,
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        template: null,
      }
    default:
      return state;
  }
}

export default email3DaysEmployee;