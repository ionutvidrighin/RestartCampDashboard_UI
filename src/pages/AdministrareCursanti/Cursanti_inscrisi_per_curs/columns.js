
const columns = [
  { field: "registrationDate", headerName: "Data Înscriere", width: 150, sortable: true },
  { field: "fullName", headerName: "Nume si Prenume", width: 250, sortable: false },
  { field: "career", headerName: "Angajat / Antreprenor", width: 200, sortable: false },
  { field: "course", headerName: "Curs", width: 420, sortable: false },
]

export const CSV_HEADERS_STUDENTS_BY_COURSE = [
  { label: "Data inscriere", key: "registrationDate" },
  { label: "Nume si Prenume", key: "fullName" },
  { label: "Angajat/Antreprenor", key: "career" },
  { label: "Curs/Cursuri", key: "course" }
];

export default columns