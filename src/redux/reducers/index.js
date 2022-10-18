import { combineReducers } from 'redux'
import authReducer from './authReducer'
import generateDBTokenReducer from './generateDBToken'
import dashboardUserAccounts from "./dashboardUsersReducer"
import courses from './coursesReducer'
import students from './studentsReducer'
import csvDataExport from './csvDataExport'
import coursesPageReducer from './webpagesDataReducers/coursesPageReducer'
import coursePresencePageReducer from './webpagesDataReducers/coursePresencePageReducer'
import registrationFormAlertsReducer from './webpagesDataReducers/registrationFormAlertsReducer'
import headerFooterReducer from './webpagesDataReducers/headerFooterReducer'


export default combineReducers({
  authReducer,
  generateDBTokenReducer,
  dashboardUserAccounts,
  courses,
  students,
  csvDataExport,
  coursesPageReducer,
  coursePresencePageReducer,
  registrationFormAlertsReducer,
  headerFooterReducer
})

