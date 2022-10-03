import { permissionConstants } from "../constants/userPermissions"
import adminIcon from "../assets/access-icons/admin.png";
import trainerIcon from "../assets/access-icons/trainer.png";
import marketingIcon from "../assets/access-icons/marketing.png";
import analyticsIcon from "../assets/access-icons/analytics.png";
import emailAdminIcon from "../assets/access-icons/email.png";


export const capitalizeWord = (string) => {
  return string && string[0].toUpperCase() + string.slice(1)
}

export const doesUserHavePermission = (pageRoute, userPagesPermission) => {
  pageRoute = pageRoute.substring(1)
  const userPagesAccess = userPagesPermission.map(page => page.name)
  
  return userPagesAccess.includes(pageRoute)
}

export const isAdmin = (userAccess) => {
  return userAccess === permissionConstants.ADMIN
}

export const isAnalytics = (userAccess) => {
  return userAccess === permissionConstants.ANALYTICS
}

export const isEmailsAdmin = (userAccess) => {
  return userAccess === permissionConstants.EMAILS_ADMINISTRATOR
}

export const isMarketing = (userAccess) => {
  return userAccess === permissionConstants.MARKETING
}

export const isTrainer = (userAccess) => {
  return userAccess === permissionConstants.TRAINER
}

export const displayAccountTypeIcon = (userAccess) => {
  let iconSrc
  switch(userAccess) {
    case permissionConstants.ADMIN:
      iconSrc = adminIcon
    break;
    case permissionConstants.TRAINER:
      iconSrc = trainerIcon
    break;
    case permissionConstants.MARKETING:
      iconSrc = marketingIcon
    break;
    case permissionConstants.ANALYTICS:
      iconSrc = analyticsIcon
    break;
    case permissionConstants.EMAILS_ADMINISTRATOR:
      iconSrc = emailAdminIcon
    break;
    default:
      iconSrc = null
  }

  return iconSrc
}

export const getStudentNameAndEmail = (data) => {
  if (data) {

    let studentName;
    let studentEmail;

    if (data.hasOwnProperty('studentInCoursesModule1') && data.studentInCoursesModule1.length !== 0 ) {
      studentName = data.studentInCoursesModule1[0].fullName
      studentEmail = data.studentInCoursesModule1[0].email
    } else if (data.hasOwnProperty('studentInCoursesModule2') && data.studentInCoursesModule2.length !== 0 ) {
      studentName = data.studentInCoursesModule2[0].fullName
      studentEmail = data.studentInCoursesModule2[0].email
    } else if (data.hasOwnProperty('studentPresenceInCoursesModule1') && data.studentPresenceInCoursesModule1.length !== 0 ) {
      studentName = data.studentPresenceInCoursesModule1[0].fullName
      studentEmail = data.studentPresenceInCoursesModule1[0].email
    }

    return `${studentName} - ${studentEmail}`
  }

  return "Error - Missing Student Name"
}

export const getStudentReferenceIDsByEmail = (data, studentEmail) => {
  const referenceIDs = []
  Object.entries(data).forEach(dataSet => {
    if (dataSet[0] === 'studentInCoursesModule1') {
      referenceIDs.push({"registerStudentCourseModule1": []})
      dataSet[1].forEach(entry => {
        if (entry.email === studentEmail) {
          referenceIDs[0].registerStudentCourseModule1.push(entry.refId)
        }
      })
    }
    if (dataSet[0] === 'studentInCoursesModule2') {
      referenceIDs.push({"registerStudentCourseModule2": []})
      dataSet[1].forEach(entry => {
        if (entry.email === studentEmail) {
          referenceIDs[1].registerStudentCourseModule2.push(entry.refId)
        }
      })
    }
    if (dataSet[0] === 'studentPresenceInCoursesModule1') {
      referenceIDs.push({"coursesModule1Presence": []})
      dataSet[1].forEach(entry => {
        if (entry.email === studentEmail) {
          referenceIDs[2].coursesModule1Presence.push(entry.refId)
        }
      })
    }
  })

  return referenceIDs
}