import { ActionTypes } from "../action_types"
import API from '../../../api/api'
import { store } from "../../store"

export const fetchCoursePresencePageData = () => {
  return async (dispatch) => {
    try {
      const response = await API.CoursePresencePageData.getData()
      console.log(response)
      dispatch({
        type: ActionTypes.GET_COURSE_PRESENCE_PAGE_DATA,
        payload: response.data.coursePresencePageData
      })
    } catch (error) {
      console.log(error)
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_COURSE_PRESENCE_PAGE_DATA,
          payload: 'Server Error - No response'
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_COURSE_PRESENCE_PAGE_DATA,
          payload: error.response.data.message
        })
      }
    }
  }
}

export const updateCoursePresencePageData = (body) => { 
  const accessToken = store.getState().generateDBTokenReducer.value
  return async (dispatch) => {
    try {
      const response = await API.CoursePresencePageData.updateData(accessToken, body)
      dispatch({
        type: ActionTypes.UPDATE_COURSE_PRESENCE_PAGE_DATA,
        payload: response.data.newCoursePresencePageData
      })
    } catch (error) {
      console.log(error)
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_COURSE_PRESENCE_PAGE_DATA,
          payload: 'Server Error - No response'
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_COURSE_PRESENCE_PAGE_DATA,
          payload: error.response.data.message
        })
      }
    }
  }
}

export const addWordsWithLinkOnCoursePresencePageData = (payload) => {
  return {
    type: ActionTypes.ADD_LINK_WORDS_COURSE_PRESENCE_PAGE,
    payload
  }
}

export const removeWordsWithLinkOnCoursePresencePageData = (payload) => {
  return {
    type: ActionTypes.REMOVE_LINK_WORDS_COURSE_PRESENCE_PAGE,
    payload
  }
}

export const clearCoursePresencePageDataState = () => {
  return {
    type: ActionTypes.CLEAR_COURSE_PRESENCE_PAGE_STATE
  }
}
