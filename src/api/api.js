import axios from 'axios'

const baseUrl = 'http://localhost:4545'
//const baseUrl = 'https://restart-camp-org.herokuapp.com'
const responseBody = response => response

// public requests
const requests = {
  get: (route) => axios.get(`${baseUrl}${route}`).then(responseBody),
  post: (route, body) => axios.post(`${baseUrl}${route}`, body).then(responseBody),
  put: (route, body) => axios.put(`${baseUrl}${route}`, body).then(responseBody)
}

// private requests (with token)
export const tokenizedRequests = {
  get: (route, token) => axios.get(`${baseUrl}${route}`, { headers: { Authorization: `Bearer ${token}`}}).then(responseBody),
  post: (route, token, body) => axios.post(`${baseUrl}${route}`, body, { headers: { Authorization: `Bearer ${token}`}}).then(responseBody),
  put: (route, token, body) => axios.put(`${baseUrl}${route}`, body, { headers: { Authorization: `Bearer ${token}`}}).then(responseBody),
  patch: (route, token, body) => axios.patch(`${baseUrl}${route}`, body, { headers: { Authorization: `Bearer ${token}`}}).then(responseBody),
  delete: (route, token, element) => axios.delete(`${baseUrl}${route}`, { headers: { Authorization: `Bearer ${token}`}, data: element}).then(responseBody)
}

export const tokenizedUpload = {
  post: (route, formData, token) => axios.post(`${baseUrl}${route}`, formData, { headers: { Authorization: `Bearer ${token}`}}, )
}

export const tokenizedDownload = async (route, token) => {
  return await axios({
    url: `${baseUrl}${route}`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}`},
    responseType: "blob"
  })
}

const Authentication = {
  generateAccessToken: (credentials) => requests.post('/generate-token', credentials),
  logUserIn: (token) => tokenizedRequests.get('/login', token)
}

const DatabaseAccess = {
  generateToken: (username) => requests.post('/generate-database-token', username)
}

const userAccount = {
  changeEmail: (token, body) => tokenizedRequests.put('/change-email', body, token),
  changePassword: (token, body) => tokenizedRequests.put('/change-password', body, token)
}

const dashboardUsersAccounts = {
  getAllUsers: (token) => tokenizedRequests.get('/get-dashboard-users', token),
  createNewUser: (token, body) => tokenizedRequests.post('/create-dashboard-user', token, body),
  updateUserPermissions: (token, body) => tokenizedRequests.put('/change-user-permission', token, body),
  deleteUser: (token, body) => tokenizedRequests.delete('/delete-dashboard-user', token, body)
}

const CoursesPageData = {
  getData: () => tokenizedRequests.get('/courses-page-data'),
  updateData: (body) => tokenizedRequests.put('/courses-page-data', body)
}

const CoursePresencePageData = {
  getData: () => tokenizedRequests.get('/course-presence-page-data'),
  updateData: (body) => tokenizedRequests.put('/course-presence-page-data', body)
}

const HeaderFooterData = {
  getData: () => tokenizedRequests.get('/header-footer-data'),
  updateData: (body) => tokenizedRequests.put('/header-footer-data', body)
}

const RegistrationFormAlerts = {
  getData: () => tokenizedRequests.get('/registration-form-alerts'),
  updateData: (body) => tokenizedRequests.put('/registration-form-alerts', body)
}

const callCourses = {
  getCoursesModule1: (token) => tokenizedRequests.get('/courses-module1', token),
  addCourseModule1: (token, body) => tokenizedRequests.post('/courses-module1', token, body),
  updateCourseModule1State: (token, body) => tokenizedRequests.patch('/courses-module1', token, body),
  changeCourseModule1: (token, body) => tokenizedRequests.put('/courses-module1', token, body),
  deleteCourseModule1: (token, body) => tokenizedRequests.delete('/courses-module1', token, body),
  getCoursesModule2: (token) => tokenizedRequests.get('/courses-module2', token),
  addCourseModule2: (token, body) => tokenizedRequests.post('/courses-module2', token, body),
  updateCourseModule2State: (token, body) => tokenizedRequests.patch('/courses-module2', token, body),
  changeCourseModule2: (token, body) => tokenizedRequests.put('/courses-module2', token, body),
  deleteCourseModule2: (token, body) => tokenizedRequests.delete('/courses-module2', token, body)
}

const fetchStudents = {
  getStudentsByDate: (token, body) => tokenizedRequests.post('/get-students-by-year-month', token, body),
  getStudentsByCourseNameAndCareer: (token, body) => tokenizedRequests.post('/get-students-by-course-name-and-career', token, body),
  getStudentsPresenceByCourseName: (token, body) => tokenizedRequests.post('/get-course-presence', token, body) 
}

const unsubscribeOrRemoveStudent = {
  getStudentDataByName: (token, body) => tokenizedRequests.post('/get-student-data-by-name', token, body),
  getStudentDataByEmail: (token, body) => tokenizedRequests.post('/get-student-data-by-email', token, body),
  unsubscribeStudent: (token, body) => tokenizedRequests.put('/unsubscribe-student', token, body),
  removeStudent: (token, body) => tokenizedRequests.put('/remove-student', token, body)
}

const emailAfter3DaysRegistration = {
  getEmailTemplateEmployee: (token) => tokenizedRequests.get('/email-3days-after-registration-employee', token),
  changeEmailTemplateEmployee: (token, body) => tokenizedRequests.post('/email-3days-after-registration-employee', token, body),
  sendTestEmailEmployee: (token, body) => tokenizedRequests.post('/test-email-3days-after-registration-employee', token, body),
  getEmailTemplateCompany: (token) => tokenizedRequests.get('/email-3days-after-registration-company', token),
  changeEmailTemplateCompany: (token, body) => tokenizedRequests.post('/email-3days-after-registration-company', token, body),
  sendTestEmailCompany: (token, body) => tokenizedRequests.post('/test-email-3days-after-registration-company', token, body)
}

const emailReminder7Days = {
  getEmailTemplateContent: (token) => tokenizedRequests.get('/email-reminder-7days', token),
  changeEmailTemplateContent: (token, body) => tokenizedRequests.post('/email-reminder-7days', token, body)
}

const emailReminder1Day = {
  getEmailTemplateContent: (token) => tokenizedRequests.get('/email-reminder-1day', token),
  changeEmailTemplateContent: (token, body) => tokenizedRequests.post('/email-reminder-1day', token, body)
}

const emailReminder1Hour = {
  getEmailTemplateContent: (token) => tokenizedRequests.get('/email-reminder-1hour', token),
  changeEmailTemplateContent: (token, body) => tokenizedRequests.post('/email-reminder-1hour', token, body)
}

const API = {
  Authentication,
  DatabaseAccess,
  userAccount,
  dashboardUsersAccounts,
  callCourses,
  fetchStudents,
  unsubscribeOrRemoveStudent,
  CoursesPageData,
  CoursePresencePageData,
  HeaderFooterData,
  RegistrationFormAlerts,
  emailAfter3DaysRegistration,
  emailReminder7Days,
  emailReminder1Day,
  emailReminder1Hour
}

export default API