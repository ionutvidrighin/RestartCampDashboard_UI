import * as Yup from "yup";

export const formValues = (input) => {
  const values = {
    topSection: {
      emailTitle: input?.topSection.emailTitle,
      subtitle: input?.topSection.subtitle,
      paragraph: input?.topSection.paragraph
    },
    centerSection: {
      row1: {
        courseLogoLink: input?.centerSection.row1.courseLogoLink,
        title1: input?.centerSection.row1.title1,
        paragraph1: input?.centerSection.row1.paragraph1,
        title2: input?.centerSection.row1.title2,
        paragraph2: input?.centerSection.row1.paragraph2
      },
      row2: {
        title1: input?.centerSection.row2.title1,
        paragraph1: input?.centerSection.row2.paragraph1,
        title2: input?.centerSection.row2.title2,
        paragraph2: input?.centerSection.row2.paragraph2,
        title3: input?.centerSection.row2.title3,
        paragraph3: input?.centerSection.row2.paragraph3,
        title4: input?.centerSection.row2.title4,
        paragraph4: input?.centerSection.row2.paragraph4
      }
    },
    buttonsSection: {
      button1: {
        text: input?.buttonsSection.button1.text,
        link: input?.buttonsSection.button1.link
      },
      button2: {
        text: input?.buttonsSection.button2.text,
        link: input?.buttonsSection.button2.link
      }
    },
    contestLogoSection: input?.contestLogoSection,
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
    emailTitle: Yup.string().required("Titlu E-mail lipseşte"),
    subtitle: Yup.string().required("Subtitlu lipseşte"),
    paragraph: Yup.string().required("Paragraf lipseşte")
  }),
  centerSection: Yup.object().shape({
    row1: Yup.object().shape({
      courseLogoLink: Yup.string().required("Link logo curs lipseşte"),
      title1: Yup.string().required("Titlu 1 lipseşte"),
      paragraph1: Yup.string().required("Paragraf 1 lipseşte"),
      title2: Yup.string().required("Titlu 2  lipseşte"),
      paragraph2: Yup.string().required("Paragraf 2 lipseşte")
    }),
    row2: Yup.object().shape({
      title1: Yup.string().required("Titlu 1 lipseşte"),
      paragraph1: Yup.string().required("Paragraf 1 lipseşte"),
      title2:Yup.string().required("Titlu 2 lipseşte"),
      paragraph2: Yup.string().required("Paragraf 2 lipseşte"),
      title3: Yup.string().required("Titlu 3 lipseşte"),
      paragraph3: Yup.string().required("Paragraf 3 lipseşte"),
      title4: Yup.string().required("Titlu 4 lipseşte"),
      paragraph4: Yup.string().required("Paragraf 4 lipseşte"),
    })
  }),
  buttonsSection: Yup.object().shape({
    button1: Yup.object().shape({
      text: Yup.string().required("Text buton 1 lipseşte"),
      link: Yup.string().required("Link buton 1 lipseşte"),
    }),
    button2: Yup.object().shape({
      text: Yup.string().required("Text buton 2 lipseşte"),
      link: Yup.string().required("Link buton 2 lipseşte"),
    })
  }),
  contestLogoSection: Yup.string().required("Link logo concurs, lipseşte"),
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
