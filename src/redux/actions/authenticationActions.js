import { ActionTypes } from "./action_types";

export const logUserIn = (loggedUser) => {
  const userName = loggedUser.username.split('@')[0]
  return {
    type: ActionTypes.LOG_USER_IN,
    payload: { 
      ...loggedUser, 
      username: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: loggedUser.username,
      isLogged: true
    }
  }
}

export const logUserOut = () => {
  return {
    type: ActionTypes.LOG_USER_OUT,
    payload: {
      username: null,
      access: null,
      pagesPermission: [],
      isLogged: false
    }
  }
}

export const clearAllState = () => {
  return {
    type: ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT
  }
}
