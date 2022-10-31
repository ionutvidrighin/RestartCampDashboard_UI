
export const formDataForMoreThan30min = (data, errors) => {
  return [
  {
    id: 15,
    label: 'Paragraf 1',
    name: "moreThan30min.paragraph1",
    value: data?.paragraph1,
    error: errors.moreThan30min?.paragraph1,
    touched: data.moreThan30min?.paragraph1,
    multiline: true,
    maxRows: 3,
    minRows: 3,
    wordsWithLink: true,
    linkWords: data.linkWords.paragraph1,
    open: false
  },
  {
    id: 16,
    label: 'Paragraf 2',
    name: "moreThan30min.paragraph2",
    value: data?.paragraph2,
    error: errors.moreThan30min?.paragraph2,
    touched: data.moreThan30min?.paragraph2,
    multiline: true,
    maxRows: 3,
    minRows: 3,
    wordsWithLink: true,
    linkWords: data.linkWords.paragraph2,
    open: false
  },
  {
    id: 17,
    label: 'Paragraf 3',
    name: "moreThan30min.paragraph3",
    value: data?.paragraph3,
    error: errors.moreThan30min?.paragraph3,
    touched: data.moreThan30min?.paragraph3,
    multiline: true,
    maxRows: 3,
    minRows: 3,
    wordsWithLink: true,
    linkWords: data.linkWords.paragraph3,
    open: false
  }]
}

export const formDataForLessThan30min = (data, errors) => {
  return [
    {
      id: 1,
      label: 'Titlu Formular',
      name: "lessThan30min.formTitle",
      value: data?.formTitle,
      error: errors.lessThan30min?.formTitle,
      touched: data.lessThan30min?.formTitle,
      multiline: true,
      maxRows: 2,
      minRows: 2
    },
    {
      id: 2,
      label: 'Paragraf 1',
      name: "lessThan30min.paragraph1",
      value: data?.paragraph1,
      error: errors.lessThan30min?.paragraph1,
      touched: data.lessThan30min?.paragraph1,
      multiline: true,
      maxRows: 3,
      minRows: 3,
      wordsWithLink: true,
      linkWords: data.linkWords.paragraph1,
      open: false
    },
    {
      id: 3,
      label: 'Paragraf 2',
      name: "lessThan30min.paragraph2",
      value: data?.paragraph2,
      error: errors.lessThan30min?.paragraph2,
      touched: data.lessThan30min?.paragraph2,
      multiline: true,
      maxRows: 3,
      minRows: 3,
      wordsWithLink: true,
      linkWords: data.linkWords.paragraph2,
      open: false
    },
    {
      id: 4,
      label: 'Adresa e-mail',
      name: "lessThan30min.textFieldLabel1",
      value: data?.textFieldLabel1,
      error: errors.lessThan30min?.textFieldLabel1,
      touched: data.lessThan30min?.textFieldLabel1,
    },
    {
      id: 5,
      label: 'ID acces sesiune',
      name: "lessThan30min.textFieldLabel2",
      value: data?.textFieldLabel2,
      error: errors.lessThan30min?.textFieldLabel2,
      touched: data.lessThan30min?.textFieldLabel2,
    },
    {
      id: 6,
      label: 'Text Buton Formular',
      name: "lessThan30min.submitButtonLabel",
      value: data?.submitButtonLabel,
      error: errors.lessThan30min?.submitButtonLabel,
      touched: data.lessThan30min?.submitButtonLabel,
    },
    {
      id: 7,
      label: 'Mesaj Alerta Succes',
      name: "lessThan30min.successAlertMessage",
      value: data?.successAlertMessage,
      error: errors.lessThan30min?.successAlertMessage,
      touched: data.lessThan30min?.successAlertMessage,
      multiline: true,
      maxRows: 3,
      minRows: 3
    },
    {
      id: 8,
      label: 'Mesaj Alerta Eroare',
      name: "lessThan30min.errorAlertMessage",
      value: data?.errorAlertMessage,
      error: errors.lessThan30min?.errorAlertMessage,
      touched: data.lessThan30min?.errorAlertMessage,
      multiline: true,
      maxRows: 3,
      minRows: 3
    }
  ]
}

export const formDataCourseDateInPast = (data, errors) => {
  return [
    {
      id: 25,
      label: 'Paragraf',
      name: "paragraph",
      value: data?.paragraph,
      error: errors?.paragraph,
      touched: data?.paragraph,
      multiline: true,
      maxRows: 3,
      minRows: 3,
      wordsWithLink: true,
      linkWords: data.linkWords.paragraph,
      open: false
    }
  ]
}

export const formDataCourseDateInFuture = (data, errors) => {
  return [
    {
      id: 32,
      label: 'Paragraf',
      name: "paragraph",
      value: data?.paragraph,
      error: errors?.paragraph,
      touched: data?.paragraph,
      multiline: true,
      maxRows: 3,
      minRows: 3,
      wordsWithLink: true,
      linkWords: data.linkWords.paragraph,
      open: false
    }
  ]
}

export const formDataCourseZoomAccess = (data, errors) => {
  return [
    {
      id: 33,
      label: 'Paragraf',
      name: "paragraph",
      value: data?.paragraph,
      error: errors?.paragraph,
      touched: data?.paragraph,
      multiline: true,
      maxRows: 3,
      minRows: 3,
      wordsWithLink: true,
      linkWords: data.linkWords.paragraph,
      open: false
    },
    {
      id: 36,
      label: 'Text Buton',
      name: "submitButtonLabel",
      value: data?.submitButtonLabel,
      error: errors?.submitButtonLabel,
      touched: data?.submitButtonLabel,
    }
  ]
}

export const constructSentenceOn2rows = (sentence) => {
  let finalSentence;
  if (sentence.includes('[break]')) {
    finalSentence = sentence.split('[break]')
  }
  return finalSentence
}