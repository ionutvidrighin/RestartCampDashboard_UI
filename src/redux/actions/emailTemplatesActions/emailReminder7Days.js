import { ActionTypes } from "../action_types"
import API from '../../../api/api'

/** EMAIL REMINDER 7 DAYS  =GET= */
export const fetchEmailTemplateContent = () => {
  const accessKey = sessionStorage.getItem('accessKey')
  //const accessKey = "RESTARTCAMP_2022"
  return async (dispatch) => {
    try {
      const response = await API.emailReminder7Days.getEmailTemplateContent(accessKey)
      const returnedData = response.data

      dispatch({
        type: ActionTypes.GET_EMAIL_REMINDER_7DAYS,
        payload: returnedData
      })
    } catch (error) {
      console.log(error)
    }
  }
}


/** EMAIL REMINDER 7 DAYS  =POST= */
export const changeEmailTemplateContent = (body) => {
  const accessKey = sessionStorage.getItem('accessKey')
  //const accessKey = "RESTARTCAMP_2022"
  return async (dispatch) => {
    try {
      const response = await API.emailReminder7Days.changeEmailTemplateContent(accessKey, body)
      const returnedData = response.data
      dispatch({
        type: ActionTypes.CHANGE_EMAIL_REMINDER_7DAYS,
        payload: returnedData
      })
    } catch (error) {
      const payload = {
        template: body,
        serverResponse: error.response.data
      }
      dispatch({
        type: ActionTypes.ERROR_EMAIL_REMINDER_7DAYS,
        payload
      })
    }
  }
}


/** SEND TEST EMAIL REMINDER 7 DAYS  =POST= */
export const sendTestEmailTemplateContent = (body) => {
  const accessKey = sessionStorage.getItem('accessKey')
  //const accessKey = "RESTARTCAMP_2022"
  return async (dispatch) => {
    try {
      const response = await API.emailReminder7Days.changeEmailTemplateContent(accessKey, body)
      const returnedData = response.data

      const payload = {
        success: returnedData.success,
        message: returnedData.message,
        emailResponse: returnedData.emailResponse,
        emailTemplate: body
      }

      dispatch({
        type: ActionTypes.SEND_TEST_EMAIL_REMINDER_7_DAYS,
        payload
      })
    } catch (error) {
      const payload = {
        template: body,
        serverResponse: error.response.data
      }
      dispatch({
        type: ActionTypes.ERROR_SEND_TEST_EMAIL_REMINDER_7_DAYS,
        payload
      })
    }
  }
}

export const clearEmailReminder7DaysState = () => {
  return {
    type: ActionTypes.CLEAR_EMAIL_REMINDER_7_DAYS_STATE
  }
}