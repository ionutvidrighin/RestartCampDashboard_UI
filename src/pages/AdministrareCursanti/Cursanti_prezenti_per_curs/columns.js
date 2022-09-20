
const columns = [
  { field: "date", headerName: "Data Curs", width: 120, sortable: false },
  { field: "fullName", headerName: "Nume si Prenume", width: 200, sortable: false },
  { field: "present", headerName: "Prezent", width: 120, sortable: true },
  { field: "email", headerName: "E-mail", width: 220, sortable: false },
  { field: "courseName", headerName: "Curs", width: 400, sortable: false }
]

export const CSV_HEADERS_STUDENTS_PRESENCE = [
  { label: "Data curs", key: "registrationDate" },
  { label: "Nume si Prenume", key: "fullName" },
  { label: "Prezenta curs", key: "present" },
  { label: "E-mail", key: "email" },
  { label: "Denumire curs", key: "courseName" }
];

export default columns