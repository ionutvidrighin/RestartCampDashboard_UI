import { ActionTypes } from "../action_types"
import API from '../../../api/api'
import { store } from "../../store"


export const fetchHeaderFooterData = () => {
  return async (dispatch) => {
    try {
      const response = await API.HeaderFooterData.getData()
      dispatch({
        type: ActionTypes.GET_HEADER_FOOTER_DATA,
        payload: response.data
      })
    } catch (error) {
      console.log(error)
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_GET_HEADER_FOOTER_DATA,
          payload: 'Server Error - No response'
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_GET_HEADER_FOOTER_DATA,
          payload: error.response.data.message
        })
      }
    }
  }
}

export const updateHeaderFooterData = (body) => {
  const accessToken = store.getState().generateDBTokenReducer.value
  return async (dispatch) => {
    try {
      const response =await API.HeaderFooterData.updateData(accessToken, body)
      dispatch({
        type: ActionTypes.UPDATE_HEADER_FOOTER_DATA,
        payload: response.data.newHeaderFooterData
      })
    } catch (error) {
      console.log(error)
      if (!error.response) {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_HEADER_FOOTER_DATA,
          payload: 'Server Error - No response'
        })
      } else {
        dispatch({
          type: ActionTypes.ERROR_UPDATE_HEADER_FOOTER_DATA,
          payload: error.response.data.message
        })
      }
    }
  }
}

export const addWordsWithLinkOnHeaderFooter = (payload) => {
  return {
    type: ActionTypes.ADD_LINK_WORDS_HEADER_FOOTER,
    payload
  }
}

export const removeWordsWithLinkOnHeaderFooter = (payload) => {
  return {
    type: ActionTypes.REMOVE_LINK_WORDS_HEADER_FOOTER,
    payload
  }
}

export const clearHeaderFooterDataState = () => {
  return {
    type: ActionTypes.CLEAR_HEADER_FOOTER_DATA_STATE
  }
}
