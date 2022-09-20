import { ActionTypes } from "../action_types"
import API from '../../../api/api'
import { store } from "../../store"

export const fetchRegistrationFormAlerts = () => {
  return async (dispatch) => {
    try {
      const response = await API.RegistrationFormAlerts.getData()
      dispatch({
        type: ActionTypes.GET_REGISTRATION_FORM_ALERTS,
        payload: response.data.alerts
      })
    } catch (error) {
      console.log(error)
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_REGISTRATION_FORM_ALERTS,
          payload: 'Server Error - No response'
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_REGISTRATION_FORM_ALERTS,
          payload: error.response.data.message
        })
      }
    }
  }
}

export const updateRegistrationFormAlerts = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value
  return async (dispatch) => {
    try {
      const response = await API.RegistrationFormAlerts.updateData(accessToken, body)
      dispatch({
        type: ActionTypes.UPDATE_REGISTRATION_FORM_ALERTS,
        payload: response.data.newRegistrationFormAlerts
      })
    } catch (error) {
      console.log(error)
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_REGISTRATION_FORM_ALERTS,
          payload: 'Server Error - No response'
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_REGISTRATION_FORM_ALERTS,
          payload: error.response.data.message
        })
      }
    }
  }
}

export const clearRegistrationFormAlertsState = () => {
  return {
    type: ActionTypes.CLEAR_REGISTRATION_FORM_ALERTS_STATE
  }
}

