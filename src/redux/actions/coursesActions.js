import { ActionTypes } from './action_types';
import API from '../../api/api';
import { store }  from '../store';

export const fetchCoursesModule1 = () => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      const response = await API.callCourses.getCoursesModule1(accessToken)
      const returnedData = response.data
      dispatch({
        type: ActionTypes.GET_COURSES_MODULE_1,
        payload: returnedData
      })
    } catch (error) {
      console.log(error.response)
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_COURSES_MODULE_1,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_COURSES_MODULE_1,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

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
      console.log(error.response)
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

export const addCourseModule1 = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.callCourses.addCourseModule1(accessToken, body)
      dispatch({
        type: ActionTypes.ADD_COURSE_MODULE_1,
        payload: body
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_ADD_COURSE_MODULE_1,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_ADD_COURSE_MODULE_1,
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

export const toggleCourseModule1State = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.callCourses.toggleCourseModule1State(accessToken, body)
      dispatch({
        type: ActionTypes.TOGGLE_COURSE_MODULE_1_STATE,
        payload: body
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_TOGGLE_COURSE_MODULE_1_STATE,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_TOGGLE_COURSE_MODULE_1_STATE,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const toggleCourseModule2State = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.callCourses.toggleCourseModule2State(accessToken, body)
      dispatch({
        type: ActionTypes.TOGGLE_COURSE_MODULE_2_STATE,
        payload: body
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_TOGGLE_COURSE_MODULE_2_STATE,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_TOGGLE_COURSE_MODULE_2_STATE,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const updateCourseModule1 = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.callCourses.updateCourseModule1(accessToken, body)
      dispatch({
        type: ActionTypes.UPDATE_COURSE_MODULE_1_DATA,
        payload: body
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_COURSE_MODULE_1_DATA,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_COURSE_MODULE_1_DATA,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const updateCourseModule2 = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.callCourses.updateCourseModule2(accessToken, body)
      dispatch({
        type: ActionTypes.UPDATE_COURSE_MODULE_2_DATA,
        payload: body
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_COURSE_MODULE_2_DATA,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_COURSE_MODULE_2_DATA,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const deleteCourseModule1 = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.callCourses.deleteCourseModule1(accessToken, body)
      dispatch({
        type: ActionTypes.DELETE_COURSE_MODULE_1,
        payload: body
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_DELETE_COURSE_MODULE_1,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_DELETE_COURSE_MODULE_1,
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
          type: ActionTypes.ERROR_DELETE_COURSE_MODULE_2,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_DELETE_COURSE_MODULE_2,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const clearCoursesModule1 = () => ({ type: ActionTypes.CLEAR_COURSES_MODULE_1 })

export const clearCoursesModule2 = () => ({ type: ActionTypes.CLEAR_COURSES_MODULE_2 })

export const clearCoursesModule1ServerResponse = () => ({ type: ActionTypes.CLEAR_COURSES_MODULE_1_SERVER_RESPONSE })

export const clearCoursesModule2ServerResponse = () => ({ type: ActionTypes.CLEAR_COURSES_MODULE_2_SERVER_RESPONSE })