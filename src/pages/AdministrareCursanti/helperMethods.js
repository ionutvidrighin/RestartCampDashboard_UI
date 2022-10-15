import { nanoid } from 'nanoid';
import { tableColumnsConstants } from '../../constants/userPermissions'
import dayjs from "dayjs"

function createEmptyTableRow(tableColumns) {
  let emptyTableRow = []
  tableColumns.forEach(column => emptyTableRow.push({ [column.field]: 'no data', id: nanoid(4) }))
  emptyTableRow = Object.assign({}, ...emptyTableRow)

  return [emptyTableRow]
}

function setupDataForTableAllStudents(rawData, tableColumns) {
  let tableData = rawData.allData.map(item => {
    const tableRow = {
      ...item,
    }

    if (item.hasOwnProperty(tableColumnsConstants.COURSENAME)) {
      Object.assign(tableRow, {
        courseName: item?.courseName[0].title
      })
    }
    if (item.hasOwnProperty(tableColumnsConstants.REGISTRATION_DATE)) {
      Object.assign(tableRow, {
        registrationDate: dayjs(item?.registrationDate).locale('ro').format('LL')
      })
    }
    if (item.hasOwnProperty(tableColumnsConstants.SUBSCRIBED_TO_EMAILS)) {
      Object.assign(tableRow, {
        subscribedToEmails: item?.subscribedToEmails ? 'DA' : 'NU'
      })
    }
    if (item.hasOwnProperty(tableColumnsConstants.ACTIVE_STUDENT)) {
      Object.assign(tableRow, {
        activeStudent: item?.activeStudent ? 'DA' : 'NU'
      })
    }
    return tableRow
  })

  tableData.sort((a, b) => new Date(a.registrationDate) - new Date(b.registrationDate))

  // handling empty Array response from database
  if (tableData.length === 0) {
    tableData = createEmptyTableRow(tableColumns)
  }

  return tableData
}

function setupDataForTableStudentPerCourse(rawData, tableColumns) {
  let tableData = rawData.allData.map(item => ({
    id: item.id,
    registrationDate: dayjs(item?.registrationDate).locale('ro').format('LL'),
    fullName: item?.fullName,
    career: item?.career,
    courseName: item?.courseName[0].title
  }))
  tableData.sort((a,b) => new Date(a.registrationDate) - new Date(b.registrationDate))

  // handling empty Array response from database
  if (tableData.length === 0) {
    tableData = createEmptyTableRow(tableColumns)
  }

  return tableData
}

function setupDataForTableCoursePresence(data, tableColumns) {
  let tableData = data.map(entry => {
    const tableRow = {
      id: entry.id,
      courseName: entry?.course.title,
      date: dayjs(entry?.course.date).locale('ro').format('LL'),
      fullName: entry?.fullName,
      email: entry?.email
    }
    if (entry.hasOwnProperty(tableColumns.PRESENT)) {
      Object.assign(tableRow, {
        present: entry?.course.present ? 'DA' : 'NU',
      })
    }
    return tableRow
  })

  // handling empty Array response from database
  if (tableData.length === 0) {
    tableData = createEmptyTableRow(tableColumns)
  }

  return tableData
}

function setupDataForChart(rawData) {
  console.log(rawData)
  let studentRegistrationsDataForChart = []
  rawData.studentsByDay.forEach(item => {
    const chartItem = {
      date: item,
      înscrieri: rawData.allData.filter(entry => entry.registrationDate === item).length
    }
    studentRegistrationsDataForChart.push(chartItem)
  })
  studentRegistrationsDataForChart = studentRegistrationsDataForChart.filter(({date}, index) => !rawData.studentsByDay.includes(date, index + 1))
  studentRegistrationsDataForChart.sort((a, b) => new Date(a.date) - new Date(b.date))

  return studentRegistrationsDataForChart
}

function setupDataForBarChartCoursePresence(data) {
  const registeredStudents = data.length
  const presentStudents = []
  const absentStudents = []
  data.forEach(student => {
    if (student.course.present) {
      presentStudents.push(student)
    } else {
      absentStudents.push(student)
    }
  })

  return [{
      name: 'Înscriși', 
      inscrisi: registeredStudents
    }, {
      name: 'Prezenți',
      prezenti: presentStudents.length
    }, {
      name: 'Absenți',
      absenti: absentStudents.length
    }
  ]
}

function setupDataForPieChartCoursePresence(data) {
  const presentStudents = []
  const absentStudents = []
  data.forEach(student => {
    if (student.course.present) {
      presentStudents.push(student)
    } else {
      absentStudents.push(student)
    }
  })
  return [{
    name: 'PREZENTI', 
    value: presentStudents.length
  }, {
    name: 'ABSENTI', 
    value: absentStudents.length
  }]
}


export {
  setupDataForTableAllStudents,
  setupDataForTableStudentPerCourse,
  setupDataForTableCoursePresence,
  setupDataForChart,
  setupDataForBarChartCoursePresence,
  setupDataForPieChartCoursePresence
}