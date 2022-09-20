import { ActionTypes } from '../../actions/action_types';

const intialState = {
  data: null
}

const coursesPageData = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_COURSE_PRESENCE_PAGE_DATA:
      return {
        data: payload,
        success: true
      }
    case ActionTypes.ERROR_GET_COURSE_PRESENCE_PAGE_DATA:
      return {
        data: null,
        success: false,
        serverMessage: payload
      }
    case ActionTypes.UPDATE_COURSE_PRESENCE_PAGE_DATA:
      return {
        data: payload,
        success: true,
        serverMessage: 'Page Data Updated Successfully'
      }
    case ActionTypes.ERROR_UPDATE_COURSE_PRESENCE_PAGE_DATA:
      return {
        ...state,
        serverMessage: 'Page Data could not be updated',
        error: payload,
      }
    case ActionTypes.REMOVE_LINK_WORDS_COURSE_PRESENCE_PAGE:
      if (payload.location === "lessThan30Min") {
        if (payload.paragraphNumber === 'paragraph1') {
          return {
            ...state,
            data: {
              ...state.data,
              lessThan30Min: {
                ...state.data.lessThan30Min,
                linkWords: {
                  ...state.data.lessThan30Min.linkWords,
                  paragraph1: state.data.lessThan30Min.linkWords.paragraph1.filter(word => word.id !== payload.wordId)
                }
              }
            }
          }
        } else if (payload.paragraphNumber === 'paragraph2') {
          return {
            ...state,
            data: {
              ...state.data,
              lessThan30Min: {
                ...state.data.lessThan30Min,
                linkWords: {
                  ...state.data.lessThan30Min.linkWords,
                  paragraph2: state.data.lessThan30Min.linkWords.paragraph2.filter(word => word.id !== payload.wordId)
                }
              }
            }
          }
        }
      } else if (payload.location === "moreThan30Min") {
        return {
          ...state,
          data: {
            ...state.data,
            moreThan30Min: {
              ...state.data.moreThan30Min,
              linkWords: {
                ...state.data.moreThan30Min.linkWords,
                paragraph: state.data.moreThan30Min.linkWords.paragraph.filter(word => word.id !== payload.wordId)
              }
            }
          }
        }
      }
      return state
    case ActionTypes.ADD_LINK_WORDS_COURSE_PRESENCE_PAGE:
      if (payload.location === "lessThan30Min") {
        if (payload.paragraphNumber === 'paragraph1') {
          return {
            ...state,
            data: {
              ...state.data,
              lessThan30Min: {
                ...state.data.lessThan30Min,
                linkWords: {
                  ...state.data.lessThan30Min.linkWords,
                  paragraph1: [...state.data.lessThan30Min.linkWords.paragraph1, payload.data]
                }
              }
            }
          }
        } else if (payload.paragraphNumber === 'paragraph2') {
          return {
            ...state,
            data: {
              ...state.data,
              lessThan30Min: {
                ...state.data.lessThan30Min,
                linkWords: {
                  ...state.data.lessThan30Min.linkWords,
                  paragraph2: [...state.data.lessThan30Min.linkWords.paragraph2, payload.data]
                }
              }
            }
          }
        }
      } else if (payload.location === "moreThan30Min") {
        if (payload.paragraphNumber === 'paragraph1') {
          return {
            ...state,
            data: {
              ...state.data,
              moreThan30Min: {
                ...state.data.moreThan30Min,
                linkWords: {
                  ...state.data.moreThan30Min.linkWords,
                  paragraph1: [...state.data.moreThan30Min.linkWords.paragraph1, payload.data]
                }
              }
            }
          }
        } else if (payload.paragraphNumber === 'paragraph2') {
          return {
            ...state,
            data: {
              ...state.data,
              moreThan30Min: {
                ...state.data.moreThan30Min,
                linkWords: {
                  ...state.data.moreThan30Min.linkWords,
                  paragraph2: [...state.data.moreThan30Min.linkWords.paragraph2, payload.data]
                }
              }
            }
          }
        }
      }
      return state
    case ActionTypes.CLEAR_COURSE_PRESENCE_PAGE_STATE:
      return {
        data: null
      }
    case ActionTypes.CLEAR_SERVER_MESSAGE_RESPONSE:
      const currentState = state
      delete currentState['serverMessage']
      return currentState
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        data: null
      }
    default:
      return state
  }
}

export default coursesPageData