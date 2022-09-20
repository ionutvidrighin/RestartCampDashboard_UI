import { ActionTypes } from "./action_types";

export const changeAccountEmail = (email) => {
  return {
    type: ActionTypes.UPDATE_USER_EMAIL,
    payload: email
  }
}

