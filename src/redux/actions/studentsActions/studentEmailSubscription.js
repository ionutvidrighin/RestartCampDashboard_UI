// import { ActionTypes } from '../action_types';
import { store }  from '../../store';
import API from '../../../api/api';

/* Left this option too in case needed in future

export const subscribeStudentToNewsletter = async (studentEmailAddress) => {
  try {
    const payload = {studentEmail: studentEmailAddress}
    return await API.individualStudent.subscribeToEmails(payload)
  } catch (error) {
    return error
  }
}*/

export const unsubscribeStudentFromNewsLetter = async (studentEmailAddress) => {
  try {
    const payload = {studentEmail: studentEmailAddress}
    return await API.individualStudent.unsubscribeFromEmails(payload)
  } catch (error) {
    return error
  }
}

export const deleteStudent = async (studentEmailAddress) => {
  const accessToken = store.getState().generateDBTokenReducer.value
  try {
    const payload = {studentEmail: studentEmailAddress}
    return await API.individualStudent.deleteStudent(accessToken, payload)
  } catch (error) {
    return error
  }
}