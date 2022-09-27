import { combineReducers } from 'redux'
import authReducer from './authReducer'
import generateDBTokenReducer from './generateDBToken'
import dashboardUserAccounts from "./dashboardUserAccounts"
import coursesModule1 from './coursesReducers/coursesModule1'
import coursesModule2 from './coursesReducers/coursesModule2'
import coursePresence from './coursesReducers/coursePresenceModule1'
import registeredStudentsModule1 from './registerStudentsReducers/registeredStudentsModule1'
import tableDataForExport from './tableDataForExport'
import coursesPageReducer from './webpagesDataReducers/coursesPageReducer';
import coursePresencePageReducer from './webpagesDataReducers/coursePresencePageReducer';
import unsubscribeOrRemoveStudentReducer from './unsubscribeOrRemoveStudentReducer';
import registrationFormAlertsReducer from './webpagesDataReducers/registrationFormAlertsReducer';
import headerFooterReducer from './webpagesDataReducers/headerFooterReducer';


export default combineReducers({
  authReducer,
  generateDBTokenReducer,
  dashboardUserAccounts,
  coursesModule1,
  coursesModule2,
  registeredStudentsModule1,
  coursePresence,
  tableDataForExport,
  coursesPageReducer,
  coursePresencePageReducer,
  unsubscribeOrRemoveStudentReducer,
  registrationFormAlertsReducer,
  headerFooterReducer
})

