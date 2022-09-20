import * as Yup from "yup";

export const formValues = (headerFooterData) => {
  return {
    pageHeader: {
      backButtonLink: headerFooterData?.pageHeader?.backButtonLink,
      companyLogoLink: headerFooterData?.pageHeader?.companyLogoLink
    },
    contactInformation: {
      title: headerFooterData?.contactInformation?.title,
      paragraph: headerFooterData?.contactInformation?.paragraph
    },
    pageFooter: {
      facebookPageLink: headerFooterData?.pageFooter?.facebookPageLink,
      linkedinPageLink: headerFooterData?.pageFooter?.linkedinPageLink,
      instagramPageLink: headerFooterData?.pageFooter?.instagramPageLink,
      whatsappNumber: headerFooterData?.pageFooter?.whatsappNumber,
      emailAddress: headerFooterData?.pageFooter?.emailAddress,
      newsLetterLink: headerFooterData?.pageFooter?.newsLetterLink,
      termsConditionsLink: headerFooterData?.pageFooter?.termsConditionsLink,
      gdprLink: headerFooterData?.pageFooter?.gdprLink
    },
  }
}

export const formValidation = Yup.object().shape({
  pageHeader: Yup.object().shape({
    backButtonLink: Yup.string().required("Link inapoi la site, lipseşte"),
    companyLogoLink: Yup.string().required("Link LOGO Restartcamp, lipseşte")
  }),
  contactInformation: Yup.object().shape({
    title: Yup.string().required("Titlu Informatii Contact, lipseşte"),
    paragraph: Yup.string().required("Paragraf Informatii Contact, lipseşte")
  }),
  pageFooter: Yup.object().shape({
    facebookPageLink: Yup.string().required("Link Pagina Facebook, lipseşte"),
    linkedinPageLink: Yup.string().required("Link Pagina Linkedin, lipseşte"),
    instagramPageLink: Yup.string().required("Link Pagina Instagram, lipseşte"),
    whatsappNumber: Yup.string().required("Tel. contact Whatsapp, lipseşte"),
    emailAddress: Yup.string().required("Adresa E-mail contact, lipseşte"),
    newsLetterLink: Yup.string().required("Link Abonare NewsLetter, lipseşte"),
    termsConditionsLink: Yup.string().required("Link Pagina T&C, lipseşte"),
    gdprLink: Yup.string().required("Link Pagina GDPR, lipseşte")
  })
})