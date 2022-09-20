import { ActionTypes } from '../../actions/action_types';

const intialState = {
  data: null
}

const coursesPageData = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_COURSES_PAGE_DATA:
      return {
        data: payload,
        success: true
      }
    case ActionTypes.ERROR_GET_COURSES_PAGE_DATA:
      return {
        data: null,
        success: false,
        serverMessage: payload
      }
    case ActionTypes.UPDATE_COURSES_PAGE_DATA:
      return {
        data: payload,
        success: true,
        serverMessage: 'Page Data Updated Successfully'
      }
    case ActionTypes.ERROR_UPDATE_COURSES_PAGE_DATA:
      return {
        ...state,
        serverMessage: 'Page Data could not be updated',
        error: payload,
      }
    case ActionTypes.REMOVE_LINK_WORDS_COURSES_PAGE:
      if (payload.location === "infoCoursesModule1") {
        if (payload.childLocation === 'paragraph1') {
          return {
            ...state,
            data: {
              ...state.data,
              infoCoursesModule1: {
                ...state.data.infoCoursesModule1,
                linkWords: {
                  ...state.data.infoCoursesModule1.linkWords,
                  paragraph1: state.data.infoCoursesModule1.linkWords.paragraph1.filter(word => word.id !== payload.wordId)
                }
              }
            }
          }
        } else if (payload.childLocation === 'paragraph2') {
          return {
            ...state,
            data: {
              ...state.data,
              infoCoursesModule1: {
                ...state.data.infoCoursesModule1,
                linkWords: {
                  ...state.data.infoCoursesModule1.linkWords,
                  paragraph2: state.data.infoCoursesModule1.linkWords.paragraph2.filter(word => word.id !== payload.wordId)
                }
              }
            }
          }
        }
      } else if (payload.location === "infoCoursesModule2") {
        return {
          ...state,
          data: {
            ...state.data,
            infoCoursesModule2: {
              ...state.data.infoCoursesModule2,
              linkWords: {
                ...state.data.infoCoursesModule2.linkWords,
                paragraph: state.data.infoCoursesModule2.linkWords.paragraph.filter(word => word.id !== payload.wordId)
              }
            }
          }
        }
      }
      return state
    case ActionTypes.ADD_LINK_WORDS_COURSES_PAGE:
      if (payload.location === "infoCoursesModule1") {
        if (payload.childLocation === 'paragraph1') {
          return {
            ...state, 
            data: {
              ...state.data,
              infoCoursesModule1: {
                ...state.data.infoCoursesModule1,
                linkWords: {
                  ...state.data.infoCoursesModule1.linkWords,
                  paragraph1: [...state.data.infoCoursesModule1.linkWords.paragraph1, payload.data]
                }
              }
            }
          }
        } else if (payload.childLocation === 'paragraph2') {
          return {
            ...state,
            data: {
              ...state.data,
              infoCoursesModule1: {
                ...state.data.infoCoursesModule1,
                linkWords: {
                  ...state.data.infoCoursesModule1.linkWords,
                  paragraph2: [...state.data.infoCoursesModule1.linkWords.paragraph2, payload.data]
                }
              }
            }
          }
        }
      } else if (payload.location === "infoCoursesModule2") {
        return {
          data: {
            ...state,
            ...state.data,
            infoCoursesModule2: {
              ...state.data.infoCoursesModule2,
              linkWords: {
                ...state.data.infoCoursesModule2.linkWords,
                paragraph: [...state.data.infoCoursesModule2.linkWords.paragraph, payload.data]
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
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        data: null
      }
    default:
      return state
  }
}

export default coursesPageData;