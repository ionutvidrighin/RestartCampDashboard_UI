import { rolesConstants, tableColumnsConstants } from "../constants/userPermissions"
import { CSV_HEADERS_ALL_STUDENTS_DATA } from "./csvHeaders";
import adminIcon from "../assets/access-icons/admin.png";
import trainerIcon from "../assets/access-icons/trainer.png";
import marketingIcon from "../assets/access-icons/marketing.png";
import analyticsIcon from "../assets/access-icons/analytics.png";
import emailAdminIcon from "../assets/access-icons/email.png";


export const capitalizeWord = (string) => {
  return string && string[0].toUpperCase() + string.slice(1)
}

export const extractUserTablePermissions = (page, userPagesPermission) => {
  const visitedSection = userPagesPermission.find(element => element.label === page)
  return visitedSection.access.viewDataLimit
}

export const doesUserHaveViewPermission = (page, userPagesPermission) => {
  const visitedPagePermission = userPagesPermission.find(element => element.label === page)
  return visitedPagePermission.access.view
}

export const doesUserHaveEditPermission = (page, userPagesPermission) => {
  const visitedPagePermission = userPagesPermission.find(element => element.label === page)
  return visitedPagePermission.access.edit
}

export const doesUserHaveMonthlyCSVExportPermission = (page, userPagesPermission) => {
  const visitedPagePermission = userPagesPermission.find(element => element.label === page)
  return visitedPagePermission.access.download
}

export const doesUserHaveWhatsappCSVExportPermission = (page, userPagesPermission) => {
  const visitedSection = userPagesPermission.find(element => element.label === page)
  return visitedSection.access.downloadWhatsapp
}

export const checkUserAccessOnPastDataLimit = (page, userPagesPermission) => {
  const visitedPage = userPagesPermission.find(element => element.label === page)
  return visitedPage.access.viewTimeLimit.value
}

export const createTableColumnsAccordingToPermission = (page, userPagesPermission) => {
  const visitedSection = userPagesPermission.find(element => element.label === page)

  const tableColumns = []
  visitedSection.access.viewDataLimit.forEach(tableColumn => {
    if (!tableColumn.selected) {
      const column = {
        field: tableColumn.value,
        headerName: tableColumn.label,
        sortable: true,
        width: 150
      }

      if (tableColumn.value === tableColumnsConstants.APPELLATION) {
        column.width = 120
      }
      if (tableColumn.value === tableColumnsConstants.FULL_NAME) {
        column.width = 200
        column.sortable = false
      }
      if (tableColumn.value === tableColumnsConstants.COURSENAME) {
        column.width = 400
        column.sortable = false
      }
      if (tableColumn.value === tableColumnsConstants.EMAIL) {
        column.width = 250
        column.sortable = false
      }
      if (tableColumn.value === tableColumnsConstants.JOB) {
        column.width = 200
      }
      if (tableColumn.value === tableColumnsConstants.SUBSCRIBED_TO_EMAILS) {
        column.width = 200
      }
      if (tableColumn.value === tableColumnsConstants.CAREER) {
        column.width = 220
      }
      if (tableColumn.value === tableColumnsConstants.REFERENCE) {
        column.width = 170
        column.sortable = false
      }

      tableColumns.push(column)
    }
  })

  return tableColumns
}

export const createAllStudentsDataCSVheaders = () => {
  return CSV_HEADERS_ALL_STUDENTS_DATA
}

export const createMonthlyCSVheadersAccordingToPermission = (page, userPagesPermission) => {
  const visitedSection = userPagesPermission.find(element => element.label === page)

  const CSVheaders = []
  visitedSection.access.viewDataLimit.forEach(tableColumn => {
    if (!tableColumn.selected) {
      CSVheaders.push({
        label: tableColumn.label,
        key: tableColumn.value
      })
    }
  })
  return CSVheaders
}

export const createWhatsappNumbersCSVheaders = () => {
  return [{
    label: 'Data inscriere',
    key: 'registrationDate'
  }, {
    label: 'Numar tel.',
    key: 'phoneNo'
  }, {
    label: 'Nume Curs',
    key: 'courseName'
  }]
}

export const isAdmin = (userRole) => {
  return userRole === rolesConstants.ADMIN
}

export const isAnalytics = (userRole) => {
  return userRole === rolesConstants.ANALYTICS
}

export const isMarketing = (userRole) => {
  return userRole === rolesConstants.MARKETING
}

export const isTrainer = (userRole) => {
  return userRole === rolesConstants.TRAINER
}

export const calculateMonthsDifference = (dateFrom, dateTo) => {
  return dateTo.getMonth() - dateFrom.getMonth() + 
    (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

export const displayAccountTypeIcon = (userRole) => {
  let iconSrc
  switch(userRole) {
    case rolesConstants.ADMIN:
      iconSrc = adminIcon
    break;
    case rolesConstants.TRAINER:
      iconSrc = trainerIcon
    break;
    case rolesConstants.MARKETING:
      iconSrc = marketingIcon
    break;
    case rolesConstants.ANALYTICS:
      iconSrc = analyticsIcon
    break;
    case rolesConstants.EMAILS_ADMINISTRATOR:
      iconSrc = emailAdminIcon
    break;
    default:
      iconSrc = null
  }

  return iconSrc
}

export const extractStudentNameAndEmail = (data) => {
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

export const extractStudentDBentryRefID = (data, studentEmail) => {
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