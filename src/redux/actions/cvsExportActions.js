import { ActionTypes } from "./action_types";

export const storeAllStudentsExportData = payload => ({
  type: ActionTypes.STORE_ALL_EXPORT_DATA,
  payload
})

export const storeMonthlyStudentsExportData = payload => ({
  type: ActionTypes.STORE_MONTHLY_EXPORT_DATA,
  payload
})

export const storeStudentsWhatsappNumbersExportData = payload => ({
  type: ActionTypes.STORE_WHATSAPP_EXPORT_DATA,
  payload
})

export const clearStudentsWhatsappNumbersExportData = () => ({type: ActionTypes.CLEAR_WHATSAPP_EXPORT_DATA})

export const clearAllStudentsExportData = () => ({type: ActionTypes.CLEAR_ALL_EXPORT_DATA})

export const clearMonthlyStudentsExportData = () => ({type: ActionTypes.CLEAR_MONTHLY_EXPORT_DATA})