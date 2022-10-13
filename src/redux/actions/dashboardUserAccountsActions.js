import { ActionTypes } from "./action_types";
import API from '../../api/api';
import { store } from '../store';


export const fetchDashboardUsers = () => {
  const accessToken = store.getState().generateDBTokenReducer.value
  return async (dispatch) => {
    try {
      const response = await API.dashboardUsersAccounts.getAllUsers(accessToken)
      const returnedData = response.data
      
      dispatch({
        type: ActionTypes.GET_DASHBOARD_USERS,
        payload: returnedData
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_DASHBOARD_USERS,
          payload: error.response.data.message
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_DASHBOARD_USERS,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const createDashboardUser = (user) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.dashboardUsersAccounts.createNewUser(accessToken, user)
      dispatch({
        type: ActionTypes.CREATE_DASHBOARD_USER,
        payload: user
      })
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error.message
        dispatch({
          type: ActionTypes.ERROR_CREATE_DASHBOARD_USER,
          payload: errorMessage
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_CREATE_DASHBOARD_USER,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const updateDashboardUserPermissions = (user) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.dashboardUsersAccounts.updateUserPermissions(accessToken, user)
      dispatch({
        type: ActionTypes.UPDATE_DASHBOARD_USER,
        payload: user
      })
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message
        dispatch({
          type: ActionTypes.ERROR_UPDATE_DASHBOARD_USER,
          payload: errorMessage
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_DASHBOARD_USER,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const deleteDashboardUserAccount = (user) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.dashboardUsersAccounts.deleteUser(accessToken, user)
      dispatch({
        type: ActionTypes.DELETE_DASHBOARD_USER,
        payload: user
      })
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message
        dispatch({
          type: ActionTypes.ERROR_DELETE_DASHBOARD_USER,
          payload: errorMessage
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_DELETE_DASHBOARD_USER,
          payload: 'Server Error - No response'
        })
      }
    }
  }
}

export const clearDashboardUserServerResponse = () => ({
  type: ActionTypes.CLEAR_DASHBOARD_USER_SERVER_RESPONSE
})