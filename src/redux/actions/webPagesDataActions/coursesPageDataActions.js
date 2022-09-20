import { ActionTypes } from "../action_types"
import API from '../../../api/api'
import { store } from "../../store"


export const fetchCoursesPageData = () => {
  return async (dispatch) => {
    try {
      const response = await API.CoursesPageData.getData()
      dispatch({
        type: ActionTypes.GET_COURSES_PAGE_DATA,
        payload: response.data
      })
    } catch (error) {
      console.log(error)
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_COURSES_PAGE_DATA,
          payload: 'Server Error - No response'
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_COURSES_PAGE_DATA,
          payload: error.response.data.message
        })
      }
    }
  }
}

export const updateCoursesPageData = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value
  return async (dispatch) => {
    try {
      const response = await API.CoursesPageData.updateData(accessToken, body)
      console.log(response)
      dispatch({
        type: ActionTypes.UPDATE_COURSES_PAGE_DATA,
        payload: response.data.newCoursesPageData
      })
    } catch (error) {
      console.log(error)
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_COURSES_PAGE_DATA,
          payload: 'Server Error - No response'
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_COURSES_PAGE_DATA,
          payload: error.response.data.message
        })
      }
    }
  }
}

export const addWordsWithLinkOnCoursesPageData = (payload) => {
  return {
    type: ActionTypes.ADD_LINK_WORDS_COURSES_PAGE,
    payload
  }
}

export const removeWordsWithLinkOnCoursesPageData = (payload) => {
  return {
    type: ActionTypes.REMOVE_LINK_WORDS_COURSES_PAGE,
    payload
  }
}

export const clearCoursesPageDataState = () => {
  return {
    type: ActionTypes.CLEAR_COURSES_PAGE_DATA_STATE
  }
}
