import { ActionTypes } from '../../actions/action_types';

const intialState = {
  template: [],
  linkWords: {
    paragraph1: [],
    paragraph2: []
  }
}

const coursePresence = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_EMAIL_REMINDER_1HOUR:
      return {
        template: payload
      }
    case ActionTypes.CHANGE_EMAIL_REMINDER_1HOUR:
      return {
        template: payload.data,
        success: payload.success,
        message: payload.message
      }
    case ActionTypes.ERROR_EMAIL_REMINDER_1HOUR:
      return {
        template: payload.template,
        success: payload.serverResponse.success,
        message: payload.serverResponse.message
      }
    case ActionTypes.SEND_TEST_EMAIL_REMINDER_1_HOUR:
      return {
        success: payload.success,
        message: payload.message,
        template: payload.emailTemplate,
        emailResponse: payload.emailResponse.response
      }
    case ActionTypes.ERROR_SEND_TEST_EMAIL_REMINDER_1_HOUR: 
      return {
        template: payload.template,
        success: payload.serverResponse.success,
        message: payload.serverResponse.message
      }
    case ActionTypes.CLEAR_EMAIL_REMINDER_1_HOUR_STATE: 
      return {
        ...state,
        success: null,
        message: null,
        emailResponse: null
      }
    case ActionTypes.ADD_LINK_WORDS_EMAIL_REMINDER_1_HOUR_PAR_1:
      return {
        ...state,
        linkWords: {
          ...state.linkWords,
          paragraph1: [...state.linkWords.paragraph1, payload]
        }
      }
    case ActionTypes.REMOVE_LINK_WORDS_EMAIL_REMINDER_1_HOUR_PAR_1:
      return {
        ...state,
        linkWords: {
          ...state.linkWords,
          paragraph1: state.linkWords.paragraph1.filter(word => word.id !== payload)
        }
      }
    case ActionTypes.ADD_LINK_WORDS_EMAIL_REMINDER_1_HOUR_PAR_2:
      return {
        ...state,
        linkWords: {
          ...state.linkWords,
          paragraph2: [...state.linkWords.paragraph2, payload]
        }
      }
    case ActionTypes.REMOVE_LINK_WORDS_EMAIL_REMINDER_1_HOUR_PAR_2:
      return {
        ...state,
        linkWords: {
          ...state.linkWords,
          paragraph2: state.linkWords.paragraph2.filter(word => word.id !== payload)
        }
      }
    default:
      return state;
  }
}

export default coursePresence;