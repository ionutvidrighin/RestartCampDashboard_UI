import { ActionTypes } from "../action_types"
import API from "../../../api/api"
import { store } from "../../store"

export const fetchEmailTemplateContent = () => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      const response = await API.emailAfter3DaysRegistration.getEmailTemplateEmployee(accessToken)
      const returnedData = response.data
      dispatch({
        type: ActionTypes.SUCCESS_GET_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE,
        payload: returnedData
      })
    } catch (error) {
      console.log(error)
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE,
          payload: 'Server Error - No response'
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE,
          payload: error.response.data.message
        })
      }
    }
  }
}

export const updateEmailTemplateContent = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      await API.emailAfter3DaysRegistration.changeEmailTemplateEmployee(accessToken, body)
      dispatch({
        type: ActionTypes.SUCCESS_UPDATE_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE,
        payload: body
      })
    } catch (error) {
      console.log(error)
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE,
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE,
        })
      }
    }
  }
}

export const sendTestEmailTemplateContent = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value

  return async (dispatch) => {
    try {
      const response = await API.emailAfter3DaysRegistration.sendTestEmailEmployee(accessToken, body)
      const returnedData = response.data

      const payload = {
        message: returnedData.message,
        emailResponse: returnedData.emailResponse,
      }

      dispatch({
        type: ActionTypes.SUCCESS_SEND_TEST_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE,
        payload
      })
    } catch (error) {
      console.log(error)
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_SEND_TEST_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE,
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_SEND_TEST_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE,
        })
      }
    }
  }
}

export const clearServerResponse = () => {
  return {
    type: ActionTypes.CLEAR_SERVER_MESSAGE_RESPONSE
  }
}

export const clearReducerState = () => {
  return {
    type: ActionTypes.CLEAR_EMAIL_3DAYS_AFTER_REGISTRATION_EMPLOYEE_TEMPLATE_STATE,
  }
}