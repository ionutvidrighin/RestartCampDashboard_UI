import * as Yup from "yup";

export const formValues = (input) => {
  const values = {
    topSection: {
      templateLogo: input?.topSection.templateLogo,
      emailTitle: input?.topSection.emailTitle,
      paragraph: input?.topSection.paragraph
    },
    centerSection: {
      logoLink: input?.centerSection.logoLink,
      title: input?.centerSection.title,
      paragraph: input?.centerSection.paragraph,
      title2: input?.centerSection.title2
    },
    contactSection: {
      title: input?.contactSection.title,
      phone: input?.contactSection.phone,
      email: input?.contactSection.email,
      paragraph: input?.contactSection.paragraph,
      aboutRestartCamp: {
        text: input?.contactSection.aboutRestartCamp.text,
        link: input?.contactSection.aboutRestartCamp.link
      }
    }
  }
  return values
}

export const formValidation = Yup.object().shape({
  topSection: Yup.object().shape({
    templateLogo: Yup.string().required("Logo E-mail Template lipseşte"),
    emailTitle: Yup.string().required("Titlu E-mail lipseşte"),
    paragraph: Yup.string().required("Paragraf lipseşte")
  }),
  centerSection: Yup.object().shape({
    logoLink: Yup.string().required("Link logo curs lipseşte"),
    title: Yup.string().required("Titlu lipseşte"),
    paragraph: Yup.string().required("Paragraf lipseşte"),
    title2: Yup.string().required("Titlu 2  lipseşte")
  }),
  contactSection: Yup.object().shape({
    title: Yup.string().required("Titlu contact lipseşte"),
    phone: Yup.string().required("Telefon contact lipseşte"),
    email: Yup.string().required("Email contact lipseşte"),
    paragraph: Yup.string().required("Paragraf lipseşte"),
    aboutRestartCamp: Yup.object().shape({
      text: Yup.string().required("Text Despre R.C. lipseşte"),
      link: Yup.string().required("Link Despre R.C. lipseşte"),
    })
  })
})
