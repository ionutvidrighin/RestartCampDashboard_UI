import { ActionTypes } from '../actions/action_types';

const intialState = {
  users: []
}

const dashboardUserAccounts = (state = intialState, { type, payload }) => {
  switch(type) {
    case ActionTypes.GET_DASHBOARD_USERS:
      return {
        users: payload
      }
    case ActionTypes.CREATE_DASHBOARD_USER:
      return {
        users: [...state.users, payload],
        success: true
      }
    case ActionTypes.UPDATE_DASHBOARD_USER:
      const userToUpdate = state.users.findIndex(user => user.id === payload.id)
      const updatedUsersList = [...state.users]
      updatedUsersList[userToUpdate].permissions = payload.permissions
      updatedUsersList[userToUpdate].role = payload.role
      return {
        users: updatedUsersList,
        success: true
      }
    case ActionTypes.DELETE_DASHBOARD_USER:
      const allUsers = [...state.users]
      const newUsersList = allUsers.filter(user => user.id !== payload.id)
      return {
        users: newUsersList,
        success: true
      }
    case ActionTypes.ERROR_CREATE_DASHBOARD_USER:
    case ActionTypes.ERROR_UPDATE_DASHBOARD_USER:
    case ActionTypes.ERROR_DELETE_DASHBOARD_USER:
      return {
        users: state.users,
        error: payload
      }
    case ActionTypes.CLEAR_DASHBOARD_USER_SERVER_RESPONSE:
      return {
        users: state.users
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT:
      return {
        users: []
      }
    default:
      return state
  }
}

export default dashboardUserAccounts;