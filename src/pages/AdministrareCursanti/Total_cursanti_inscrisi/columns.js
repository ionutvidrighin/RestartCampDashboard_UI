const columns = [
  { field: "appellation", headerName: "Dl./Dna.", width: 120, sortable: true },
  { field: "fullName", headerName: "Nume si Prenume", width: 200, sortable: false },
  { field: "registrationDate", headerName: "Dată înscriere", width: 150, sortable: true },
  { field: "address", headerName: "Reședință", width: 150, sortable: true },
  { field: "county", headerName: "Județ", width: 150, sortable: true },
  { field: "course", headerName: "Înscris la", width: 400, sortable: false },
  { field: "phoneNo", headerName: "Nr. Telefon", width: 150, sortable: false },
  { field: "email", headerName: "Adresă E-mail", width: 250, sortable: false },
  { field: "job", headerName: "Nivel Carieră", width: 200, sortable: true },
  { field: "domain", headerName: "Domeniu Activitate", width: 200, sortable: true },
  { field: "subscribedToEmails", headerName: "Abonat Newsletters", width: 200, sortable: true },
  { field: "activeStudent", headerName: "Cursant Activ", width: 150, sortable: true },
  { field: "activity", headerName: "Activitate Profesionala", width: 220, sortable: true },
  { field: "reference", headerName: "Unde ne-a gasit", width: 170, sortable: true }
]

export const CSV_HEADERS_ALL_STUDENTS = [ 
  { label: "Dl./Dna.", key: "appellation" },
  { label: "Reședință", key: "address" },
  { label: "Județ", key: "county" },
  { label: "Data inscriere", key: "registrationDate" },
  { label: "Nume si Prenume", key: "fullName" },
  { label: "Nr. Telefon", key: "phoneNo" },
  { label: "E-mail", key: "email" },
  { label: "Job", key: "job" },
  { label: "Domeniu activitate", key: "domain" },
  { label: "Abonat Newsletters", key: "subscribedToEmails" },
  { label: "Cursant Activ", key: "activeStudent" },
  { label: "Curs", key: "course" },
  { label: "Activitate profesionala", key: "activity" },
  { label: "Unde ne-a gasit", key: "reference" }
]

export const CSV_HEADERS_ALL_STUDENT_TRAINER_ACCOUNT_TYPE = [
  { label: "Nr. Telefon", key: "phoneNo" },
  { label: "Curs", key: "course" }
]

export default columns