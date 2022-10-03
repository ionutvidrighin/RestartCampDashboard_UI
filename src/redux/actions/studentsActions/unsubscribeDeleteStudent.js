import { ActionTypes } from '../action_types';
import { store }  from '../../store';
import API from '../../../api/api';

export const unsubscribeStudent = (studentEmailAddress) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    const response = await API.unsubscribeOrDeleteStudent.unsubscribeStudent(accessToken, studentEmailAddress)
    console.log(response)
  }
}

export const deleteStudent = (studentEmailAddress) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    const response = await API.unsubscribeOrDeleteStudent.deleteStudent(accessToken, studentEmailAddress)
    console.log(response)
  }
}