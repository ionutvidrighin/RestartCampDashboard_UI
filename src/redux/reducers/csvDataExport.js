import { ActionTypes } from '../actions/action_types'

const intialState = {
  allData: [],
  monthlyData: [],
  whatsappData: []
}

const csvDataExport = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.STORE_ALL_EXPORT_DATA:
      return {
        ...state,
        allData: payload,
      }
    case ActionTypes.STORE_MONTHLY_EXPORT_DATA:
      return {
        ...state,
        monthlyData: payload,
      }
    case ActionTypes.STORE_WHATSAPP_EXPORT_DATA:
      return {
        ...state,
        whatsappData: payload,
      }
    case ActionTypes.CLEAR_ALL_EXPORT_DATA:
      return {
        ...state,
        allData: []
      }
    case ActionTypes.CLEAR_MONTHLY_EXPORT_DATA:
      return {
        ...state,
        monthlyData: []
      }
    case ActionTypes.CLEAR_WHATSAPP_EXPORT_DATA:
      return {
        ...state,
        whatsappData: []
      }
    case ActionTypes.CLEAR_ALL_STATE_AT_LOGOUT: 
      return {
        allData: [],
        monthlyData: [],
        whatsappData: []
      }
    default:
      return state
  }
}

export default csvDataExport