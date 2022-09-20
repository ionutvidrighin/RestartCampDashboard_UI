import { ActionTypes } from "./action_types";
import API from "../../api/api";

export const toggleGenerateDBTokenDialog = (payload) => {
  return {
    type: ActionTypes.TOGGLE_GENERATE_DATABASE_TOKEN_DIALOG,
    payload
  }
}

export const generateDataBaseToken = (username) => {
  return async (dispatch) => {
    try {
      const response = await API.DatabaseAccess.generateToken(username)
      console.log(response.data)
      const generatedToken = response.data.token
      dispatch({
        type: ActionTypes.GENERATE_DATABASE_TOKEN,
        payload: generatedToken
      })
    } catch (error) {
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_GENERATE_DATABASE_TOKEN,
          payload: "Server Error - No response"
        })
      } else {
        const errorMessage = error.response.data.message
        dispatch({
          type: ActionTypes.ERROR_GENERATE_DATABASE_TOKEN,
          payload: errorMessage
        })
      }
    }
  }
}