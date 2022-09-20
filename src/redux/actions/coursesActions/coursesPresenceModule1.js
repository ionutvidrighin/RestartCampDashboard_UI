import { ActionTypes } from '../action_types'
import API from '../../../api/api'
import { store }  from '../../store';

export const fetchStudentsPresenceByCourseName = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      const response = await API.fetchStudents.getStudentsPresenceByCourseName(accessToken, body)
      const returnedData = response.data
      dispatch({
        type: ActionTypes.GET_COURSE_PRESENCE,
        payload: returnedData
      })
    } catch (error) {
      console.log(error)
    }
  }
}