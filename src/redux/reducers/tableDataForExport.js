import { ActionTypes } from '../actions/action_types'

const intialState = {
  selectedTableRows: []
}

const tableDataForExport = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.STORE_TABLE_DATA_FOR_EXPORT:
      return {
        selectedTableRows: payload
      }
    case ActionTypes.CLEAR_TABLE_DATA_FOR_EXPORT:
      return {
        selectedTableRows: []
      }
    default:
      return state;
  }
}

export default tableDataForExport;