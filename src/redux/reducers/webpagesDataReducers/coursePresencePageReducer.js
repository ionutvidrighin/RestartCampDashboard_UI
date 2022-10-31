import { ActionTypes } from '../../actions/action_types';

const intialState = {}

const coursesPageData = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_COURSE_PRESENCE_PAGE_DATA:
      state = payload
      Object.assign(state, {
        success: true
      })
      return state
    case ActionTypes.ERROR_GET_COURSE_PRESENCE_PAGE_DATA:
      state = {}
      Object.assign(state, {
        message: payload,
        success: false
      })
      return state
    case ActionTypes.UPDATE_COURSE_PRESENCE_PAGE_DATA:
      state = payload
      Object.assign(state, {
        success: true,
        message: 'Page Data Updated Successfully'
      })
      return state
    case ActionTypes.ERROR_UPDATE_COURSE_PRESENCE_PAGE_DATA:
      state = {}
      Object.assign(state, {
        success: false,
        message: 'Page Data Could Not Be Updated',
        error: payload
      })
      return state 
    case ActionTypes.REMOVE_LINK_WORDS_COURSE_PRESENCE_PAGE:
      if (payload.location === "courseDateIsInPresent-moreThan30min" && payload.paragraphNumber === 'paragraph1') {
        return {
          ...state,
          courseDateIsInPresent: {
            ...state.courseDateIsInPresent,
            pageData: {
              ...state.courseDateIsInPresent.pageData,
              moreThan30min: {
                ...state.courseDateIsInPresent.pageData.moreThan30min,
                linkWords: {
                  ...state.courseDateIsInPresent.pageData.moreThan30min.linkWords,
                  paragraph1: state.courseDateIsInPresent.pageData.moreThan30min.linkWords.paragraph1.filter(word => word.id !== payload.wordId)
                }
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInPresent-moreThan30min" && payload.paragraphNumber === 'paragraph2') {
        return {
          ...state,
          courseDateIsInPresent: {
            ...state.courseDateIsInPresent,
            pageData: {
              ...state.courseDateIsInPresent.pageData,
              moreThan30min: {
                ...state.courseDateIsInPresent.pageData.moreThan30min,
                linkWords: {
                  ...state.courseDateIsInPresent.pageData.moreThan30min.linkWords,
                  paragraph2: state.courseDateIsInPresent.pageData.moreThan30min.linkWords.paragraph2.filter(word => word.id !== payload.wordId)
                }
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInPresent-moreThan30min" && payload.paragraphNumber === 'paragraph3') {
        return {
          ...state,
          courseDateIsInPresent: {
            ...state.courseDateIsInPresent,
            pageData: {
              ...state.courseDateIsInPresent.pageData,
              moreThan30min: {
                ...state.courseDateIsInPresent.pageData.moreThan30min,
                linkWords: {
                  ...state.courseDateIsInPresent.pageData.moreThan30min.linkWords,
                  paragraph3: state.courseDateIsInPresent.pageData.moreThan30min.linkWords.paragraph3.filter(word => word.id !== payload.wordId)
                }
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInPresent-lessThan30min" && payload.paragraphNumber === 'paragraph1') {
        return {
          ...state,
          courseDateIsInPresent: {
            ...state.courseDateIsInPresent,
            pageData: {
              ...state.courseDateIsInPresent.pageData,
              lessThan30min: {
                ...state.courseDateIsInPresent.pageData.lessThan30min,
                linkWords: {
                  ...state.courseDateIsInPresent.pageData.lessThan30min.linkWords,
                  paragraph1: state.courseDateIsInPresent.pageData.lessThan30min.linkWords.paragraph1.filter(word => word.id !== payload.wordId)
                }
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInPresent-lessThan30min" && payload.paragraphNumber === 'paragraph2') {
        return {
          ...state,
          courseDateIsInPresent: {
            ...state.courseDateIsInPresent,
            pageData: {
              ...state.courseDateIsInPresent.pageData,
              lessThan30min: {
                ...state.courseDateIsInPresent.pageData.lessThan30min,
                linkWords: {
                  ...state.courseDateIsInPresent.pageData.lessThan30min.linkWords,
                  paragraph2: state.courseDateIsInPresent.pageData.lessThan30min.linkWords.paragraph2.filter(word => word.id !== payload.wordId)
                }
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInPast") {
        return {
          ...state,
          courseDateIsInPast: {
            ...state.courseDateIsInPast,
            pageData: {
              ...state.courseDateIsInPast.pageData,
              linkWords: {
                ...state.courseDateIsInPast.pageData.linkWords,
                paragraph: state.courseDateIsInPast.pageData.linkWords.paragraph.filter(word => word.id !== payload.wordId)
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInFuture") {
        return {
          ...state,
          courseDateIsInFuture: {
            ...state.courseDateIsInFuture,
            pageData: {
              ...state.courseDateIsInFuture.pageData,
              linkWords: {
                ...state.courseDateIsInFuture.pageData.linkWords,
                paragraph: state.courseDateIsInFuture.pageData.linkWords.paragraph.filter(word => word.id !== payload.wordId)
              }
            }
          }
        }
      }
      if (payload.location === "courseZoomAccessPage") {
        return {
          ...state,
          courseZoomAccessPage: {
            ...state.courseZoomAccessPage,
            pageData: {
              ...state.courseZoomAccessPage.pageData,
              linkWords: {
                ...state.courseZoomAccessPage.pageData.linkWords,
                paragraph: state.courseZoomAccessPage.pageData.linkWords.paragraph.filter(word => word.id !== payload.wordId)
              }
            }
          }
        }
      }
        
      return state
    case ActionTypes.ADD_LINK_WORDS_COURSE_PRESENCE_PAGE:
      if (payload.location === "courseDateIsInPresent-moreThan30min" && payload.paragraphNumber === 'paragraph1') {
        return {
          ...state,
          courseDateIsInPresent: {
            ...state.courseDateIsInPresent,
            pageData: {
              ...state.courseDateIsInPresent.pageData,
              moreThan30min: {
                ...state.courseDateIsInPresent.pageData.moreThan30min,
                linkWords: {
                  ...state.courseDateIsInPresent.pageData.moreThan30min.linkWords,
                  paragraph1: [...state.courseDateIsInPresent.pageData.moreThan30min.linkWords.paragraph1, payload.data]
                }
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInPresent-moreThan30min" && payload.paragraphNumber === 'paragraph2') {
        return {
          ...state,
          courseDateIsInPresent: {
            ...state.courseDateIsInPresent,
            pageData: {
              ...state.courseDateIsInPresent.pageData,
              moreThan30min: {
                ...state.courseDateIsInPresent.pageData.moreThan30min,
                linkWords: {
                  ...state.courseDateIsInPresent.pageData.moreThan30min.linkWords,
                  paragraph2: [...state.courseDateIsInPresent.pageData.moreThan30min.linkWords.paragraph2, payload.data]
                }
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInPresent-moreThan30min" && payload.paragraphNumber === 'paragraph3') {
        return {
          ...state,
          courseDateIsInPresent: {
            ...state.courseDateIsInPresent,
            pageData: {
              ...state.courseDateIsInPresent.pageData,
              moreThan30min: {
                ...state.courseDateIsInPresent.pageData.moreThan30min,
                linkWords: {
                  ...state.courseDateIsInPresent.pageData.moreThan30min.linkWords,
                  paragraph3: [...state.courseDateIsInPresent.pageData.moreThan30min.linkWords.paragraph3, payload.data]
                }
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInPresent-lessThan30min" && payload.paragraphNumber === 'paragraph1') {
        return {
          ...state,
          courseDateIsInPresent: {
            ...state.courseDateIsInPresent,
            pageData: {
              ...state.courseDateIsInPresent.pageData,
              lessThan30min: {
                ...state.courseDateIsInPresent.pageData.lessThan30min,
                linkWords: {
                  ...state.courseDateIsInPresent.pageData.lessThan30min.linkWords,
                  paragraph1: [...state.courseDateIsInPresent.pageData.lessThan30min.linkWords.paragraph1, payload.data]
                }
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInPresent-lessThan30min" && payload.paragraphNumber === 'paragraph2') {
        return {
          ...state,
          courseDateIsInPresent: {
            ...state.courseDateIsInPresent,
            pageData: {
              ...state.courseDateIsInPresent.pageData,
              lessThan30min: {
                ...state.courseDateIsInPresent.pageData.lessThan30min,
                linkWords: {
                  ...state.courseDateIsInPresent.pageData.lessThan30min.linkWords,
                  paragraph2: [...state.courseDateIsInPresent.pageData.lessThan30min.linkWords.paragraph2, payload.data]
                }
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInPast") {
        return {
          ...state,
          courseDateIsInPast: {
            ...state.courseDateIsInPast,
            pageData: {
              ...state.courseDateIsInPast.pageData,
              linkWords: {
                paragraph: [...state.courseDateIsInPast.pageData.linkWords.paragraph, payload.data]
              }
            }
          }
        }
      }
      if (payload.location === "courseDateIsInFuture") {
        return {
          ...state,
          courseDateIsInFuture: {
            ...state.courseDateIsInFuture,
            pageData: {
              ...state.courseDateIsInFuture.pageData,
              linkWords: {
                paragraph: [...state.courseDateIsInFuture.pageData.linkWords.paragraph, payload.data]
              }
            }
          }
        }
      }
      if (payload.location === "courseZoomAccessPage") {
        return {
          ...state,
          courseZoomAccessPage: {
            ...state.courseZoomAccessPage,
            pageData: {
              ...state.courseZoomAccessPage.pageData,
              linkWords: {
                paragraph: [...state.courseZoomAccessPage.pageData.linkWords.paragraph, payload.data]
              }
            }
          }
        }
      }
      return state
    case ActionTypes.CLEAR_COURSE_PRESENCE_PAGE_STATE:
      return {}
    case ActionTypes.CLEAR_SERVER_MESSAGE_RESPONSE:
      const currentState = state
      delete currentState['message']
      return currentState
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {}
    default:
      return state
  }
}

export default coursesPageData