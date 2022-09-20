import * as Yup from "yup";

export const formValues = (coursesPageData) => {
  return {
    stripeInfoCoursesLink: coursesPageData?.stripeInfoCoursesLink,
    stripeInfoPracticeLink: coursesPageData?.stripeInfoPracticeLink,
    infoCoursesModule1: {
      title: coursesPageData?.infoCoursesModule1?.title,
      paragraph1: coursesPageData?.infoCoursesModule1?.paragraph1,
      paragraph2: coursesPageData?.infoCoursesModule1?.paragraph2
    },
    infoCoursesModule2: {
      title: coursesPageData?.infoCoursesModule2?.title,
      paragraph: coursesPageData?.infoCoursesModule2?.paragraph
    }
  }
}

export const formValidation = Yup.object().shape({
  stripeInfoCoursesLink: Yup.string().required("Link Stripe Info Cursuri, lipseşte"),
  stripeInfoPracticeLink: Yup.string().required("Link Stripe Info Practica, lipseşte"),
  infoCoursesModule1: Yup.object().shape({
    title: Yup.string().required("Titlu Info cursuri modul 1, lipseşte"),
    paragraph1: Yup.string().required("Paragraf 1 Info cursuri modul 1, lipseşte"),
    paragraph2: Yup.string().required("Paragraf 2 Info cursuri modul 1, lipseşte")
  }),
  infoCoursesModule2: Yup.object().shape({
    title: Yup.string().required("Titlu Info cursuri modul 2, lipseşte"),
    paragraph: Yup.string().required("Paragraf 1 Info cursuri modul 2, lipseşte")
  })
})