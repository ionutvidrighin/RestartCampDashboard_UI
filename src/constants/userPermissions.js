const rolesConstants = {
  ADMIN: "Admin",
  TRAINER: "Trainer",
  MARKETING: "Marketing",
  ANALYTICS: "Analytics",
  EMAILS_ADMINISTRATOR: "Emails Administrator"
}

const userRoles = [
  {name: 'Admin'},
  {name: 'Trainer'},
  {name: 'Marketing'},
  {name: 'Analytics'}
]

const appPagesConstants = {
  PAGINA_CURSURI: "Pagina Cursuri",
  PAGINA_FORMULAR_INSCRIERE: "Pagina Formular Inscriere",
  PAGINA_CONFIRMARE_PREZENTA: "Pagina Confirmare Prezenta",
  CONTENT_HEADER_FOOTER: "Content Header & Footer",
  MANIPULARE_CURSURI_MODUL1: "Manipulare Cursuri Modul 1",
  MANIPULARE_CURSURI_MODUL2: "Manipulare Cursuri Modul 2",
  CAUTA_CURSANT_INSCRIS: "Cauta Cursant Inscris",
  TOTAL_CURSANTI_INSCRISI: "Total Cursanti Inscrisi",
  CURSANTI_INSCRISI_PER_CURS: "Cursanti Inscrisi per Curs",
  CURSANTI_PREZENTI_PER_CURS: "Cursanti Prezenti per Curs",
  INSCRIERE_CURSANTI_MODUL2: "Inscriere Cursanti Modul 2",
  DEZABONARE_STERGERE_CURSANTI: "Dezabonare/Stergere Cursanti",
  EMAIL_CONFIRMARE_INSCRIERE: "Email Confirmare Inscriere",
  EMAIL_REMINDER_7_ZILE: "Email Reminder 7 zile",
  EMAIL_REMINDER_1_ZI: "Email Reminder 1 zi",
  EMAIL_REMINDER_1_ORA: "Email Reminder 1 ora",
  EMAIL_VOUCHER_4_ORE: "Email Voucher 4 ore",
  EMAIL_VOUCHER_18_ORE: "Email Voucher 18 ore",
  EMAIL_3_ZILE_ANGAJAT: "Email 3 zile dupa inscriere - angajat",
  EMAIL_3_ZILE_COMPANIE: "Email 3 zile dupa inscriere - companie"
}

const permissions = [
  {
    id: 1,
    label: "Pagina Cursuri",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 2,
    label: "Pagina Formular Inscriere",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 3,
    label: "Pagina Confirmare Prezenta",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 4,
    label: "Content Header & Footer",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 5,
    label: "Manipulare Cursuri Modul 1",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 6,
    label: "Manipulare Cursuri Modul 2",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 7,
    label: "Cauta Cursant Inscris",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 8,
    label: "Total Cursanti Inscrisi",
    access: {
      view: false,
      edit: false,
      monthlyExport: false,
      viewTimeLimit: {label: 'Nelimitat', value: "unlimited"},
      viewDataLimit: [{
        id: 0,
        label: 'Dl./Dna.',
        value: 'appellation',
        selected: false
      }, {
        id: 21,
        label: 'Nume si Prenume',
        value: 'fullName',
        selected: false
      }, {
        id: 22,
        label: 'Dată înscriere',
        value: 'registrationDate',
        selected: false
      }, {
        id: 23,
        label: 'Reședință',
        value: 'address',
        selected: false
      }, {
        id: 24,
        label: 'Județ',
        value: 'county',
        selected: false
      }, {
        id: 25,
        label: 'Înscris la',
        value: 'courseName',
        selected: false
      }, {
        id: 26,
        label: 'Nr. Telefon',
        value: 'phoneNo',
        selected: false
      }, {
        id: 27,
        label: 'Adresă E-mail',
        value: 'email',
        selected: false
      }, {
        id: 28,
        label: 'Nivel Carieră',
        value: 'job',
        selected: false
      }, {
        id: 29,
        label: 'Domeniu Activitate',
        value: 'domain',
        selected: false
      }, {
        id: 30,
        label: 'Abonat Newsletters',
        value: 'subscribedToEmails',
        selected: false
      }, {
        id: 31,
        label: 'Cursant Activ',
        value: 'activeStudent',
        selected: false
      }, {
        id: 32,
        label: 'Carieră',
        value: 'career',
        selected: false
      }, {
        id: 33,
        label: 'Unde ne-a găsit',
        value: 'reference',
        selected: false
      }]
    }
  },
  {
    id: 9,
    label: "Cursanti Inscrisi per Curs",
    access: {
      view: false,
      edit: false,
      monthlyExport: false,
      viewTimeLimit: {label: 'Nelimitat', value: "unlimited"},
      viewDataLimit: [{
        id: 34,
        label: 'Dată înscriere',
        value: 'registrationDate',
        selected: false
      }, {
        id: 35,
        label: 'Nume si Prenume',
        value: 'fullName',
        selected: false
      }, {
        id: 36,
        label: 'Carieră',
        value: 'career',
        selected: false
      }, {
        id: 37,
        label: 'Înscris la',
        value: 'courseName',
        selected: false
      }]
    }
  },
  {
    id: 10,
    label: "Cursanti Prezenti per Curs",
    access: {
      view: false,
      edit: false,
      monthlyExport: false,
      whatsappExport: false,
      viewTimeLimit: {label: 'Nelimitat', value: "unlimited"},
      viewDataLimit: [{
        id: 38,
        label: 'Nume si Prenume',
        value: 'fullName',
        selected: false
      }, {
        id: 39,
        label: 'Dată Curs',
        value: 'date',
        selected: false
      }, {
        id: 40,
        label: 'Adresă E-mail',
        value: 'email',
        selected: false
      }, {
        id: 41,
        label: 'Prezent',
        value: 'present',
        selected: false
      }, {
        id: 42,
        label: 'Curs',
        value: 'courseName',
        selected: false
      }]
    }
  },
  {
    id: 11,
    label: "Inscriere Cursanti Modul 2",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 12,
    label: "Dezabonare/Stergere Cursanti",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 13,
    label: "Email Confirmare Inscriere",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 14,
    label: "Email Reminder 7 zile",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 15,
    label: "Email Reminder 1 zi",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 16,
    label: "Email Reminder 1 ora",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 17,
    label: "Email Voucher 4 ore",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 18,
    label: "Email Voucher 18 ore",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 19,
    label: "Email 3 zile dupa inscriere - angajat",
    access: {
      view: false,
      edit: false
    }
  },
  {
    id: 20,
    label: "Email 3 zile dupa inscriere - companie",
    access: {
      view: false,
      edit: false
    }
  }
]

const viewTimeLimit = [{
  label: '1',
  value: 1
}, {
  label: '2',
  value: 2
}, {
  label: '3',
  value: 3
}, {
  label: '4',
  value: 4
}, {
  label: '5',
  value: 5
}, {
  label: '6',
  value: 6
}, {
  label: 'Nelimitat',
  value: 'unlimited'
}]

const viewDataLimit = [{
  id: 1,
  label: 'Nume si Prenume',
  value: 'fullName',
  selected: false
}, {
  id: 2,
  label: 'Dată înscriere',
  value: 'registrationDate',
  selected: false
}, {
  id: 3,
  label: 'Reședință',
   value: 'address',
  selected: true
}, {
  id: 4,
  label: 'Județ',
   value: 'county',
  selected: false
}, {
  id: 5,
  label: 'Înscris la',
   value: 'course',
  selected: false
}, {
  id: 6,
  label: 'Nr. Telefon',
   value: 'phoneNo',
  selected: false
}, {
  id: 7,
  label: 'Adresă E-mail',
   value: 'email',
  selected: false
}, {
  id: 8,
  label: 'Nivel Carieră',
   value: 'job',
  selected: false
}, {
  id: 9,
  label: 'Domeniu Activitate',
   value: 'domain',
  selected: false
}, {
  id: 10,
  label: 'Abonat Newsletters',
   value: 'subscribedToEmails',
  selected: false
}, {
  id: 11,
  label: 'Cursant Activ',
   value: 'activeStudent',
  selected: false
}, {
  id: 12,
  label: 'Activitate Profesionala',
   value: 'activity',
  selected: false
}, {
  id: 13,
  label: 'Unde ne-a gasit',
   value: 'reference',
  selected: false
}]

const tableColumnsConstants = {
  APPELLATION: 'appellation',
  FULL_NAME: 'fullName',
  REGISTRATION_DATE: 'registrationDate',
  COUNTY: 'county',
  COURSENAME: 'courseName',
  PHONE_NUMBER: 'phoneNo',
  EMAIL: 'email',
  JOB: 'job',
  DOMAIN: 'domain',
  SUBSCRIBED_TO_EMAILS: 'subscribedToEmails',
  ACTIVE_STUDENT: 'activeStudent',
  CAREER: 'career',
  REFERENCE: 'reference',
  PRESENT: 'present'
}

export { 
  rolesConstants,
  permissions,
  userRoles, 
  appPagesConstants, 
  viewTimeLimit,
  viewDataLimit,
  tableColumnsConstants
}