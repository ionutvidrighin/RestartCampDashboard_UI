import { ActionTypes } from '../../actions/action_types';

const intialState = {
  template: []
}

const coursePresence = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_EMAIL_REMINDER_1DAY:
      return {
        template: payload
      }
    case ActionTypes.CHANGE_EMAIL_REMINDER_1DAY:
      return {
        template: payload.data,
        success: payload.success,
        message: payload.message
      }
    case ActionTypes.SEND_TEST_EMAIL_REMINDER_1_DAY:
      return {
        success: payload.success,
        message: payload.message,
        template: payload.emailTemplate,
        emailResponse: payload.emailResponse.response
      }
    case ActionTypes.ERROR_SEND_TEST_EMAIL_REMINDER_1_DAY: 
      return {
        template: payload.template,
        success: payload.serverResponse.success,
        message: payload.serverResponse.message
      }
    case ActionTypes.ERROR_EMAIL_REMINDER_1DAY:
      return {
        template: payload.template,
        success: payload.serverResponse.success,
        message: payload.serverResponse.message
      }
    case ActionTypes.CLEAR_EMAIL_REMINDER_1_DAY_STATE: 
      return {
        ...state,
        success: null,
        message: null,
        emailResponse: null
      }
    default:
      return state;
  }
}

export default coursePresence;