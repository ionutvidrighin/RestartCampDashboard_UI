import { ActionTypes } from "./action_types"

export const resetServerResponseInStore = () => {
  return {
    type: ActionTypes.RESET_SERVER_RESPONSE
  }
}