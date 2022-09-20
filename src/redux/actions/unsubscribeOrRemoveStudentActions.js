import { ActionTypes } from "./action_types"
import API from '../../api/api'
import { store } from "../store"


export const searchStudentForUnsubscribeByEmail = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value
  return async (dispatch) => {
    try {
      const response = await API.unsubscribeOrRemoveStudent.getStudentDataByEmail(accessToken, body)
      dispatch({
        type: ActionTypes.GET_STUDENT_DATA_FOR_UNSUBSCRIBE_OR_REMOVE,
        payload: response
      })
    } catch (error) {
      const serverResponse = error.response
      dispatch({
        type: ActionTypes.STUDENT_NOT_FOUND,
        payload: serverResponse
      })
    }
  }
}

export const searchStudentForUnsubscribeByName = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value
  return async (dispatch) => {
    try {
      const response = await API.unsubscribeOrRemoveStudent.getStudentDataByName(accessToken, body)
      dispatch({
        type: ActionTypes.GET_STUDENT_DATA_FOR_UNSUBSCRIBE_OR_REMOVE,
        payload: response
      })
    } catch (error) {
      const serverResponse = error.response
      dispatch({
        type: ActionTypes.STUDENT_NOT_FOUND,
        payload: serverResponse
      })
    }
  }
}

export const unsubscribeStudent = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value
  return async (dispatch) => {
    try {
      const response = await API.unsubscribeOrRemoveStudent.unsubscribeStudent(accessToken, body)
      dispatch({
        type: ActionTypes.UNSUBSCRIBED_OR_REMOVED_STUDENT,
        payload: response
      })
    } catch (error) {
      const serverResponse = error.response
      dispatch({
        type: ActionTypes.STUDENT_NOT_UNSUBSCRIBED_OR_REMOVED,
        payload: serverResponse
      })
    }
  }
}

export const removeStudent = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value
  return async (dispatch) => {
    try {
      const response = await API.unsubscribeOrRemoveStudent.removeStudent(accessToken, body)
      dispatch({
        type: ActionTypes.UNSUBSCRIBED_OR_REMOVED_STUDENT,
        payload: response
      })
    } catch (error) {
      const serverResponse = error.response
      dispatch({
        type: ActionTypes.STUDENT_NOT_UNSUBSCRIBED_OR_REMOVED,
        payload: serverResponse
      })
    }
  }
}

