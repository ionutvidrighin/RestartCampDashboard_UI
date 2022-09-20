import * as Yup from "yup";

export const formValues = (coursePresencePageData) => {
  return {
    moreThan30Min: {
      paragraph1: coursePresencePageData?.moreThan30Min?.paragraph1,
      paragraph2: coursePresencePageData?.moreThan30Min?.paragraph2
    },
    lessThan30Min: {
      formTitle: coursePresencePageData?.lessThan30Min?.formTitle,
      paragraph1: coursePresencePageData?.lessThan30Min?.paragraph1,
      paragraph2: coursePresencePageData?.lessThan30Min?.paragraph2
    }
  }
}

export const formValidation = Yup.object().shape({
  moreThan30Min: Yup.object().shape({
    paragraph1: Yup.string().required("Paragraf 1, secțiunea 'Acces Pagina > 30min.', lipseşte"),
    paragraph2: Yup.string().required("Paragraf 2, secțiunea 'Acces Pagina > 30min.', lipseşte")
  }),
  lessThan30Min: Yup.object().shape({
    formTitle: Yup.string().required("Titlu secțiunea 'Acces Pagina < 30min.'"),
    paragraph1: Yup.string().required("Paragraf 1, secțiunea 'Acces Pagina < 30min.'"),
    paragraph2: Yup.string().required("Paragraf 1, secțiunea 'Acces Pagina < 30min.'")
  })
})