import * as Yup from "yup";

export const formValues = (values) => {
  return Object.fromEntries(values)
}

export const formValidation = Yup.object().shape({
  fullName_error: Yup.string().required("Mesaj eroare Nume şi Prenume, lipseşte"),
  emailAddress_error: Yup.string().required("Mesaj eroare Adresă E-mail, lipseşte"),
  countryPhoneCode_error: Yup.string().required("Mesaj eroare Prefix țară, lipseşte"),
  phoneNumber_error: Yup.string().required("Mesaj eroare Număr telefon, lipseşte"),
  address_error: Yup.string().required("Mesaj eroare Reședință, lipseşte"),
  county_error: Yup.string().required("Mesaj eroare Județ, lipseşte"),
  noCourseSelected_error: Yup.string().required("Mesaj eroare lipsă alegere curs, lipseşte"),
  multipleCoursesSelected_error: Yup.string().required("Mesaj eroare alegere cursuri multiple, lipseşte"),
  profession_error: Yup.string().required("Mesaj eroare activitate profesională, lipseşte"),
  careerAboutProgramIndustry_error: Yup.string().required("Mesaj eroare nivel carieră - despre program - industrie, lipseşte"),
  gdpr_error: Yup.string().required("Mesaj eroare GDPR, lipseşte"),
  submitForm_error: Yup.string().required("Mesaj eroare finalizare înregistrare, lipseşte"),
  submitForm_success: Yup.string().required("Mesaj succes finalizare înregistrare, lipseşte")
})