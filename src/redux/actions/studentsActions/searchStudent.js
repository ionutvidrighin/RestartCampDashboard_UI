import { ActionTypes } from '../action_types';
import { store }  from '../../store';
import API from '../../../api/api';

export const getStudentDataByEmail = (studentEmailAddress) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      const response = await API.searchStudent.getStudentDataByEmail(accessToken, studentEmailAddress)
      const returnedData = response.data
      dispatch({
        type: ActionTypes.GET_STUDENT_DATA,
        payload: returnedData
      })
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message
        dispatch({
          type: ActionTypes.ERROR_GET_STUDENT_DATA,
          payload: errorMessage
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_STUDENT_DATA,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const getStudentDataByFullName = (studentFullName) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      const response = await API.searchStudent.getStudentDataByName(accessToken, studentFullName)
      const returnedData = response.data
      dispatch({
        type: ActionTypes.GET_STUDENT_DATA,
        payload: returnedData
      })
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message
        dispatch({
          type: ActionTypes.ERROR_GET_STUDENT_DATA,
          payload: errorMessage
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_STUDENT_DATA,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const clearStudentData = () => ({
  type: ActionTypes.CLEAR_STUDENT_DATA
})