import { ActionTypes } from '../action_types'
import API from '../../../api/api'
import { store } from "../../store"


export const fetchStudentsByDate = (date) => {
  /** @date param - is of form Object => {date: 'YYYY-MM'}  */
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      const response = await API.fetchStudents.getStudentsByDate(accessToken, date)
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
          type: ActionTypes.GET_STUDENTS_IN_COURSES_MOD1_BY_COURSE_NAME_AND_CAREER,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.GET_STUDENTS_IN_COURSES_MOD1_BY_COURSE_NAME_AND_CAREER,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const clearStudentsInCoursesMod1State = () => ({
  type: ActionTypes.CLEAR_STUDENTS_IN_COURSES_MOD1_STATE,
})