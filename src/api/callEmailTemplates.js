import { tokenizedRequests, tokenizedUpload, tokenizedDownload } from './api';

const getEmailTemplateSubject = async (route, token) => {
  return await tokenizedRequests.get(route, token)
}

const updateEmailTemplateSubject = async (route, token, body) => {
  return await tokenizedRequests.post(route, token, body)
}

const uploadEmailTemplateFile = async (route, formData, token) => {
  return await tokenizedUpload.post(route, formData, token)
}

const downloadEmailTemplateFile = async (route, token) => {
  return await tokenizedDownload(route, token)
}

const sendTestEmailTemplate = async (route, token, recipientEmail) => {
  return await tokenizedRequests.post(route, token, recipientEmail)
}

const getEmailTemplateHTML = async (route, token) => {
  return await tokenizedRequests.get(route, token)
}

export {
  getEmailTemplateSubject,
  updateEmailTemplateSubject,
  uploadEmailTemplateFile,
  downloadEmailTemplateFile,
  sendTestEmailTemplate,
  getEmailTemplateHTML
}