import axios from 'axios'

//const baseUrl = 'http://localhost:4545'
//const baseUrl = 'https://restart-camp-org.herokuapp.com'
const baseUrl = 'https://red-tough-gosling.cyclic.app/'
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
  getData: () => requests.get('/courses-page-data'),
  updateData: (token, body) => tokenizedRequests.put('/courses-page-data', token, body)
}

const CoursePresencePageData = {
  getData: () => requests.get('/course-presence-page-data'),
  updateData: (token, body) => tokenizedRequests.put('/course-presence-page-data', token, body)
}

const HeaderFooterData = {
  getData: () => requests.get('/header-footer-data'),
  updateData: (token, body) => tokenizedRequests.put('/header-footer-data', token, body)
}

const RegistrationFormAlerts = {
  getData: () => requests.get('/registration-form-alerts'),
  updateData: (token, body) => tokenizedRequests.put('/registration-form-alerts', token, body)
}

const callCourses = {
  getCoursesModule1: (token) => tokenizedRequests.get('/courses-module1', token),
  addCourseModule1: (token, body) => tokenizedRequests.post('/courses-module1', token, body),
  toggleCourseModule1State: (token, body) => tokenizedRequests.patch('/courses-module1', token, body),
  updateCourseModule1: (token, body) => tokenizedRequests.put('/courses-module1', token, body),
  deleteCourseModule1: (token, body) => tokenizedRequests.delete('/courses-module1', token, body),
  getCoursesModule2: (token) => tokenizedRequests.get('/courses-module2', token),
  addCourseModule2: (token, body) => tokenizedRequests.post('/courses-module2', token, body),
  toggleCourseModule2State: (token, body) => tokenizedRequests.patch('/courses-module2', token, body),
  updateCourseModule2: (token, body) => tokenizedRequests.put('/courses-module2', token, body),
  deleteCourseModule2: (token, body) => tokenizedRequests.delete('/courses-module2', token, body)
}

const fetchStudents = {
  /* GetAllStudentsData - receives 1 param: token
  *** token - String taken from Redux after user successfully logs in
  */
  getAllStudentsData: (token) => tokenizedRequests.post('/get-all-students-data', token),


  /* GetStudentsByDate - receives 2 params: token & date
  *** token - String taken from Redux after user successfully logs in
  *** body - Object of form { date: 'YYYY-MM', userTablePermissions: [Array of Objects]  }
  */
  getStudentsByDate: (token, body) => tokenizedRequests.post('/get-students-by-year-month', token, body),


  /* GetStudentsByCourseNameAndCareer - receives 2 params: token & body
  *** token - String taken from Redux after user successfully logs in
  *** body - Object of form:
  *   { 
  *     career: String (ex: 'angajat')
  *     courseName: String (ex: 'Cum poți începe o carieră în Social Media')
  *     registrationYearMonth: String (ex: '2022-10')
  *     userTablePermissions: [Array of Objects]
  *   }
  */
  getStudentsByCourseNameAndCareer: (token, body) => tokenizedRequests.post('/get-students-by-course-name-and-career', token, body),
  
  
  /* GetStudentsWithoutUnsubscribedAndDeleted - receives 2 params: token & date
  *** token - String taken from Redux after user successfully logs in
  *** date - Object of form { date: 'YYYY-MM' }
  */
  getStudentsWithoutUnsubscribedAndDeleted: (token, date) => tokenizedRequests.post('/get-students-without-unsubscribed-and-deleted', token, date),
  
  
  /* GetStudentsPresenceByCourseName - receives 2 params: token & body
  *** token - String taken from Redux after user successfully logs in
  *** body - Object of form:
  *   { 
  *     courseName: String (ex: 'Cum poți începe o carieră în Social Media')
  *     registrationYearMonth: String (ex: '2022-10')
  *     userTablePermissions: [Array of Objects]
  *   }
  */
  getStudentsPresenceByCourseName: (token, body) => tokenizedRequests.post('/get-course-presence', token, body),


  /* GetStudentsWhatsappNumbers - receives 2 param: token
  *** token - String taken from Redux after user successfully logs in
  *** body - Object of form { date: 'YYYY-MM' }
  */
  getStudentsWhatsappNumbers: (token, body) => tokenizedRequests.post('/get-students-whatsapp-numbers', token, body)
}

const searchStudent = {
  getStudentDataByEmail: (token, body) => tokenizedRequests.post('/get-student-data-by-email', token, body),
  getStudentDataByName: (token, body) => tokenizedRequests.post('/get-student-data-by-name', token, body)
}

const individualStudent = {
  subscribeToEmails: (studentEmail) => requests.post('/subscribe-student', studentEmail),
  unsubscribeFromEmails: (studentEmail) => requests.post('/unsubscribe-student', studentEmail),
  deleteStudent: (token, studentEmail) => tokenizedRequests.put('/delete-student', token, studentEmail)
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
  searchStudent,
  individualStudent,
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