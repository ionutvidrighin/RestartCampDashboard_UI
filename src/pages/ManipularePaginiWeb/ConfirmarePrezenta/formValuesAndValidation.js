import * as Yup from "yup";

export const formValuesCourseDateInPresent = (pageData) => {
  return {
    moreThan30min: {
      paragraph1: pageData?.moreThan30min?.paragraph1,
      paragraph2: pageData?.moreThan30min?.paragraph2,
      paragraph3: pageData?.moreThan30min?.paragraph3,
      linkWords: pageData?.moreThan30min?.linkWords
    },
    lessThan30min: {
      formTitle: pageData?.lessThan30min?.formTitle,
      paragraph1: pageData?.lessThan30min?.paragraph1,
      paragraph2: pageData?.lessThan30min?.paragraph2,
      textFieldLabel1: pageData?.lessThan30min?.textFieldLabel1,
      textFieldLabel2: pageData?.lessThan30min?.textFieldLabel2,
      submitButtonLabel: pageData?.lessThan30min?.submitButtonLabel,
      successAlertMessage: pageData?.lessThan30min?.successAlertMessage,
      errorAlertMessage: pageData?.lessThan30min?.errorAlertMessage,
      linkWords: pageData?.lessThan30min?.linkWords
    }
  }
}

export const formValuesCourseDateInPast = (pageData) => {
  return {
    paragraph: pageData?.paragraph,
    linkWords: pageData?.linkWords
  }
}

export const formValuesCourseDateInFuture = (pageData) => {
  return {
    paragraph: pageData?.paragraph,
    linkWords: pageData?.linkWords
  }
}

export const formValuesForCourseZoomAccess = (pageData) => {
  return {
    paragraph: pageData?.paragraph,
    submitButtonLabel: pageData?.submitButtonLabel,
    linkWords: pageData?.linkWords
  }
}

export const formValidation = {
  courseInPresent: Yup.object().shape({
    moreThan30min: Yup.object().shape({
      paragraph1: Yup.string().required("Paragraf 1, secțiunea 'Acces Pagina > 30min.', lipseşte"),
      paragraph2: Yup.string().required("Paragraf 2, secțiunea 'Acces Pagina > 30min.', lipseşte"),
      paragraph3: Yup.string().required("Paragraf 3, secțiunea 'Acces Pagina > 30min.', lipseşte")
    }),
    lessThan30min: Yup.object().shape({
      formTitle: Yup.string().required("Titlu formular, secțiunea 'Acces Pagina < 30min.', lipseşte"),
      paragraph1: Yup.string().required("Paragraf 1, secțiunea 'Acces Pagina < 30min.', lipseşte"),
      paragraph2: Yup.string().required("Paragraf 1, secțiunea 'Acces Pagina < 30min.', lipseşte"),
      textFieldLabel1: Yup.string().required("Eticheta 1 formular, secțiunea 'Acces Pagina < 30min.', lipseşte"),
      textFieldLabel2: Yup.string().required("Eticheta 2 formular, secțiunea 'Acces Pagina < 30min.', lipseşte"),
      submitButtonLabel: Yup.string().required("Text buton formular, secțiunea 'Acces Pagina < 30min.', lipseşte"),
      successAlertMessage: Yup.string().required("Mesaj Alerta Succes, secțiunea 'Acces Pagina < 30min.', lipseşte"),
      errorAlertMessage: Yup.string().required("Mesaj Alerta Eroare, secțiunea 'Acces Pagina < 30min.', lipseşte")
    })
  }),
  courseInFuture: Yup.object().shape({
    paragraph: Yup.string().required("Paragraf, lipseşte"),
  }),
  courseInPast: Yup.object().shape({
    paragraph: Yup.string().required("Paragraf, lipseşte"),
  }),
  zoomAccess: Yup.object().shape({
    paragraph: Yup.string().required("Paragraf, lipseşte"),
    submitButtonLabel: Yup.string().required("Text buton, lipseşte"),
  })
}