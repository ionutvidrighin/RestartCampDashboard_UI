import { ActionTypes } from '../../actions/action_types';

const intialState = { 
  data: null
}

const coursesPageData = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_HEADER_FOOTER_DATA:
      return {
        data: payload,
        success: true
      }
    case ActionTypes.ERROR_GET_HEADER_FOOTER_DATA:
      return {
        data: null,
        success: false,
        serverMessage: payload
      }
    case ActionTypes.UPDATE_HEADER_FOOTER_DATA:
      return {
        data: payload,
        success: true,
        serverMessage: 'Header&Footer Data Updated Successfully'
      }
    case ActionTypes.ERROR_UPDATE_HEADER_FOOTER_DATA:
      return {
        ...state,
        serverMessage: 'Header&Footer Data could not be updated',
        error: payload,
      }
    case ActionTypes.ADD_LINK_WORDS_HEADER_FOOTER:
      if (payload.location === "contactInformation") {
        if (payload.childLocation === 'title') {
          return {
            ...state,
            data: {
              ...state.data,
              contactInformation: {
                ...state.data.contactInformation,
                linkWords: {
                  ...state.data.contactInformation.linkWords,
                  title: [...state.data.contactInformation.linkWords.title, payload.data]
                }
              }
            }
          }
        } else if (payload.childLocation === 'paragraph') {
          return {
            ...state,
            data: {
              ...state.data,
              contactInformation: {
                ...state.data.contactInformation,
                linkWords: {
                  ...state.data.contactInformation.linkWords,
                  paragraph: [...state.data.contactInformation.linkWords.paragraph, payload.data]
                }
              }
            }
          }
        }
      }
      return state
    case ActionTypes.REMOVE_LINK_WORDS_HEADER_FOOTER:
      if (payload.location === "contactInformation") {
        if (payload.childLocation === 'title') {
          return {
            ...state,
            data: {
              ...state.data,
              contactInformation: {
                ...state.data.contactInformation,
                linkWords: {
                  ...state.data.contactInformation.linkWords,
                  title: state.data.contactInformation.linkWords.title.filter(word => word.id !== payload.wordId)
                }
              }
            }
          }
        } else if (payload.childLocation === 'paragraph') {
          return {
            ...state,
            data: {
              ...state.data,
              contactInformation: {
                ...state.data.contactInformation,
                linkWords: {
                  ...state.data.contactInformation.linkWords,
                  paragraph: state.data.contactInformation.linkWords.paragraph.filter(word => word.id !== payload.wordId)
                }
              }
            }
          }
        }
      }
      return state
    case ActionTypes.CLEAR_SERVER_MESSAGE_RESPONSE:
      const currentState = state
      delete currentState['serverMessage']
      return currentState
    case ActionTypes.CLEAR_HEADER_FOOTER_DATA_STATE:
      return {
        data: null
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        data: null
      }
    default:
      return state;
  }
}

export default coursesPageData;