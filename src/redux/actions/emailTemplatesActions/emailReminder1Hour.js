import { ActionTypes } from "../action_types"
import API from '../../../api/api'

/** EMAIL REMINDER 7 DAYS  =GET= */
export const fetchEmailTemplateContent = () => {
  //const accessKey = sessionStorage.getItem('accessKey')
  const accessKey = "RESTARTCAMP_2022"
  return async (dispatch) => {
    try {
      const response = await API.emailReminder1Hour.getEmailTemplateContent(accessKey)
      const returnedData = response.data

      dispatch({
        type: ActionTypes.GET_EMAIL_REMINDER_1HOUR,
        payload: returnedData
      })
    } catch (error) {
      console.log(error)
    }
  }
}


/** EMAIL REMINDER 7 DAYS  =POST= */
export const changeEmailTemplateContent = (body) => {
  //const accessKey = sessionStorage.getItem('accessKey')
  const accessKey = "RESTARTCAMP_2022"
  return async (dispatch) => {
    try {
      const response = await API.emailReminder1Hour.changeEmailTemplateContent(accessKey, body)
      const returnedData = response.data
      dispatch({
        type: ActionTypes.CHANGE_EMAIL_REMINDER_1HOUR,
        payload: returnedData
      })
    } catch (error) {
      const payload = {
        template: body,
        serverResponse: error.response.data
      }
      dispatch({
        type: ActionTypes.ERROR_EMAIL_REMINDER_1HOUR,
        payload
      })
    }
  }
}


/** SEND TEST EMAIL REMINDER 7 DAYS  =POST= */
export const sendTestEmailTemplateContent = (body) => {
  //const accessKey = sessionStorage.getItem('accessKey')
  const accessKey = "RESTARTCAMP_2022"
  return async (dispatch) => {
    try {
      const response = await API.emailReminder1Hour.changeEmailTemplateContent(accessKey, body)
      const returnedData = response.data

      const payload = {
        success: returnedData.success,
        message: returnedData.message,
        emailResponse: returnedData.emailResponse,
        emailTemplate: body
      }

      dispatch({
        type: ActionTypes.SEND_TEST_EMAIL_REMINDER_1_HOUR,
        payload
      })
    } catch (error) {
      const payload = {
        template: body,
        serverResponse: error.response.data
      }
      dispatch({
        type: ActionTypes.ERROR_SEND_TEST_EMAIL_REMINDER_1_HOUR,
        payload
      })
    }
  }
}

export const clearEmailReminder1HourState = () => {
  return {
    type: ActionTypes.CLEAR_EMAIL_REMINDER_1_HOUR_STATE
  }
}

export const storeLinkWordsEmailReminder1HourPar1 = (payload) => {
  return {
    type: ActionTypes.ADD_LINK_WORDS_EMAIL_REMINDER_1_HOUR_PAR_1,
    payload
  }
}

export const removeLinkWordEmailReminder1HourPar1 = (payload) => {
  return {
    type: ActionTypes.REMOVE_LINK_WORDS_EMAIL_REMINDER_1_HOUR_PAR_1,
    payload
  }
}

export const storeLinkWordsEmailReminder1HourPar2 = (payload) => {
  return {
    type: ActionTypes.ADD_LINK_WORDS_EMAIL_REMINDER_1_HOUR_PAR_2,
    payload
  }
}

export const removeLinkWordEmailReminder1HourPar2 = (payload) => {
  return {
    type: ActionTypes.REMOVE_LINK_WORDS_EMAIL_REMINDER_1_HOUR_PAR_2,
    payload
  }
}