import { extractUserTablePermissions } from  '../../utils/helperFunctions';
import { appPagesConstants } from '../../constants/userPermissions';
import { ActionTypes } from './action_types';
import { store }  from '../store';
import API from '../../api/api';
import dayjs from 'dayjs';

export const fetchAllStudentsData = () => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async () => {
    try {
      const response = await API.fetchStudents.getAllStudentsData(accessToken)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchStudentsByDate = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      const response = await API.fetchStudents.getStudentsByDate(accessToken, body)
      const returnedData = response.data
      dispatch({
        type: ActionTypes.GET_STUDENTS_IN_COURSES_MOD1_BY_DATE,
        payload: returnedData
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_STUDENTS_IN_COURSES_MOD1_BY_DATE,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_STUDENTS_IN_COURSES_MOD1_BY_DATE,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const fetchStudentsByCourseNameAndCareer = (searchCriteria) => {
  /** @searchCriteria params - is of form Object, containing following data:
   * career - String, determining Student's career type ("angajat" or "antreprenor")
   * courseName - String, determining the selected Course Name for which data is requested
   * registrationYearMonth - String Date of form "YYYY-MM", representing the Year and Month for which data is requested
   * */
   const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      const response = await API.fetchStudents.getStudentsByCourseNameAndCareer(accessToken, searchCriteria)
      const returnedData = response.data
      dispatch({
        type: ActionTypes.GET_STUDENTS_IN_COURSES_MOD1_BY_COURSE_NAME_AND_CAREER,
        payload: returnedData
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_STUDENTS_IN_COURSES_MOD1_BY_COURSE_NAME_AND_CAREER,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_STUDENTS_IN_COURSES_MOD1_BY_COURSE_NAME_AND_CAREER,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const fetchStudentsPresenceByCourseName = (body) => {
  const today = dayjs().format().substring(0, 7)

  const userPagesAccessFromStore = store.getState().authReducer.permissions
  const userTablePermissions = extractUserTablePermissions(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)

  const accessToken = store.getState().generateDBTokenReducer.value
  return async (dispatch) => {
    try {
      if (!body) {
        /* at first, called with default (no body/payload) data (first course in the list + today date) */
        const coursesModule1 = await API.callCourses.getCoursesModule1(accessToken)
        dispatch({
          type: ActionTypes.GET_COURSES_MODULE_1,
          payload: coursesModule1.data
        })

        // prepare payload to make the call for Student Presence Data in Courses Module 1
        const studentsPresencePayload = {
          courseName: coursesModule1.data[0].courseTitle,
          registrationYearMonth: today,
          userTablePermissions
        }
        const response = await API.fetchStudents.getStudentsPresenceByCourseName(accessToken, studentsPresencePayload)
        const returnedData = response.data
        dispatch({
          type: ActionTypes.GET_STUDENTS_PRESENCE_AT_COURSE_MOD1,
          payload: returnedData
        })
      } else {
         /* called with pre-defined payload data from body @param (courseName, registrationYearMonth, userTablePermissions) */
        const response = await API.fetchStudents.getStudentsPresenceByCourseName(accessToken, body)
        const returnedData = response.data
        dispatch({
          type: ActionTypes.GET_STUDENTS_PRESENCE_AT_COURSE_MOD1,
          payload: returnedData
        })
      }
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_STUDENTS_PRESENCE_AT_COURSE_MOD1,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_STUDENTS_PRESENCE_AT_COURSE_MOD1,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const fetchStudentsWhatsappNumbers = (body) => {
  console.log('body', body)
  const today = dayjs().format().substring(0, 7)
  const accessToken = store.getState().generateDBTokenReducer.value

  return async () => {
    try {
      if (!body) {
        const coursesModule1 = await API.callCourses.getCoursesModule1(accessToken)
        const courseName = coursesModule1.data[0].courseTitle
        const payload = { registrationYearMonth: today, courseName }
        const response = await API.fetchStudents.getStudentsWhatsappNumbers(accessToken, payload)
        return response.data
      } else {
        const response = await API.fetchStudents.getStudentsWhatsappNumbers(accessToken, body)
        return response.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchSingleStudentByEmail = (studentEmailAddress) => {
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
      console.log(error)
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

export const fetchSingleStudentByFullName = (studentFullName) => {
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

export const clearSingleStudentData = () => ({ type: ActionTypes.CLEAR_STUDENT_DATA })

export const clearStudentsInCoursesMod1 = () => ({ type: ActionTypes.CLEAR_STUDENTS_IN_COURSES_MOD1 })

export const clearStudentsPresence = () => ({ type: ActionTypes.CLEAR_STUDENTS_PRESENCE_AT_COURSE_MOD1 })