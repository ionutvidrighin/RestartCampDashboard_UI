import { ActionTypes } from "../action_types";
import API from '../../../api/api';
import { store }  from '../../store';


export const fetchCoursesModule2 = () => {
  const accessToken = store.getState().generateDBTokenReducer.value
  
  return async (dispatch) => {
    try {
      const response = await API.callCourses.getCoursesModule2(accessToken)
      const returnedData = response.data
      dispatch({
        type: ActionTypes.GET_COURSES_MODULE_2,
        payload: returnedData
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_COURSES_MODULE_2,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_COURSES_MODULE_2,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const addCourseModule2 = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.callCourses.addCourseModule2(accessToken, body)
      dispatch({
        type: ActionTypes.ADD_COURSE_MODULE_2,
        payload: body
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_ADD_COURSE_MODULE_2,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_ADD_COURSE_MODULE_2,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const updateCourseModule2State = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.callCourses.updateCourseModule2State(accessToken, body)
      dispatch({
        type: ActionTypes.UPDATE_COURSE_MODULE_2_STATE,
        payload: body
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_COURSE_MODULE_2_STATE,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_COURSE_MODULE_2_STATE,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const changeCourseModule2 = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.callCourses.changeCourseModule2(accessToken, body)
      dispatch({
        type: ActionTypes.CHANGE_COURSE_MODULE_2,
        payload: body
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_CHANGE_COURSE_MODULE_2,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_CHANGE_COURSE_MODULE_2,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const deleteCourseModule2 = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.callCourses.deleteCourseModule2(accessToken, body)
      dispatch({
        type: ActionTypes.DELETE_COURSE_MODULE_2,
        payload: body
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.DELETE_COURSE_MODULE_2,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.DELETE_COURSE_MODULE_2,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const clearCoursesModule2 = () => ({
  type: ActionTypes.CLEAR_COURSES_MODULE_2
})

export const clearCoursesModule2ServerResponse = () => ({
  type: ActionTypes.CLEAR_COURSES_MODULE_2_SERVER_RESPONSE
})