import defaultTableRowAllStudents from "./Total_cursanti_inscrisi/defaultTableRow"
import defaultTableRowStudentPerCourse from "./Cursanti_inscrisi_per_curs/defaultTableRow"
import defaultTableRowCoursePresence from "./Cursanti_prezenti_per_curs/defaultTableRow"
import dayjs from "dayjs"

function setupDataForTableAllStudents(rawData) {
  let tableData = rawData.allData.map(item => {
    const tableRow = {
      ...item,
      course: item.course[0].title,
      activity: item.career,
      registrationDate: dayjs(item.registrationDate).locale('ro').format('LL')
    }
    return tableRow
  })
  tableData.sort((a, b) => new Date(a.registrationDate) - new Date(b.registrationDate))

  // handling empty Array response from database
  if (tableData.length === 0) tableData = defaultTableRowAllStudents

  return tableData
}

function setupDataForTableStudentPerCourse(rawData) {
  let tableData = rawData.allData.map(item => ({
    id: item.id,
    registrationDate: dayjs(item.registrationDate).locale('ro').format('LL'),
    fullName: item.fullName,
    career: item.career,
    course: item.course[0].title
  }))
  tableData.sort((a,b) => new Date(a.registrationDate) - new Date(b.registrationDate))

  // handling empty Array response from database
  if (tableData.length === 0) tableData = defaultTableRowStudentPerCourse

  return tableData
}

function setupDataForTableCoursePresence(data) {
  let tableData = data.map(entry => ({
    id: entry.id,
    courseName: entry.course.title,
    date: dayjs(entry.course.date).locale('ro').format('LL'),
    fullName: entry.fullName,
    present: entry.course.present ? 'DA' : 'NU',
    email: entry.email
  }))

  // handling empty Array response from database
  if (tableData.length === 0) tableData = defaultTableRowCoursePresence

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