
const getStudentNameAndEmail = (data) => {
  if (Object.keys(data).length !== 0) {

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

const getStudentReferenceIDsByEmail = (data, studentEmail) => {
  console.log('studentEmail', studentEmail)
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

export {
  getStudentNameAndEmail,
  getStudentReferenceIDsByEmail
}