import { extractUserTablePermissions } from  '../../../utils/helperFunctions'
import { appPagesConstants } from '../../../constants/userPermissions';
import { ActionTypes } from '../action_types';
import { store }  from '../../store';
import API from '../../../api/api';
import dayjs from 'dayjs';

export const fetchStudentsPresenceByCourseName = (body) => {
  const today = dayjs().format().substring(0, 7)

  const userPagesAccessFromStore = store.getState().authReducer.permissions
  const userTablePermissions = extractUserTablePermissions(appPagesConstants.CURSANTI_PREZENTI_PER_CURS, userPagesAccessFromStore)

  const accessToken = store.getState().generateDBTokenReducer.value
  return async (dispatch) => {
    try {
      if (!body) {
        /* called with default payload data (first course in the list + today date) */
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
          type: ActionTypes.GET_COURSE_MODULE_1_PRESENCE,
          payload: returnedData
        })
      } else {
         /* called with pre-defined payload data from body @param (selected course + selected date) */
        const response = await API.fetchStudents.getStudentsPresenceByCourseName(accessToken, body)
        const returnedData = response.data
        dispatch({
          type: ActionTypes.GET_COURSE_MODULE_1_PRESENCE,
          payload: returnedData
        })
      }
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_COURSE_MODULE_1_PRESENCE,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_COURSE_MODULE_1_PRESENCE,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const clearCourseModule1Presence = () => ({
  type: ActionTypes.CLEAR_COURSE_MODULE_1_PRESENCE
})