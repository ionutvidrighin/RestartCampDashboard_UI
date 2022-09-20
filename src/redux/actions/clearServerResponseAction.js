import { ActionTypes } from "./action_types"

export const clearServerResponse = () => {
  return {
    type: ActionTypes.CLEAR_SERVER_MESSAGE_RESPONSE
  }
}