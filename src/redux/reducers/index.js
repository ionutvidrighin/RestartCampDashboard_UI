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
import emailConfirmationRegistrationTemplate from './emailTemplates/emailConfirmationStudentRegistration';
import email3DaysAfterRegistrationEmployee from './emailTemplates/email3DaysAfterRegistrationEmployee'
import email3DaysAfterRegistrationCompany from './emailTemplates/email3DaysAfterRegistrationCompany'
import emailReminder7Days from './emailTemplates/emailReminder7Days'
import emailReminder1Day from "./emailTemplates/emailReminder1Day"
import emailReminder1Hour from './emailTemplates/emailReminder1Hour'


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
  headerFooterReducer,
  emailConfirmationRegistrationTemplate,
  email3DaysAfterRegistrationEmployee,
  email3DaysAfterRegistrationCompany,
  emailReminder7Days,
  emailReminder1Day,
  emailReminder1Hour
})

