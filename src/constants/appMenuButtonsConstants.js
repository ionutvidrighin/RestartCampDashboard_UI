import { appRoutes } from "./appRoutesConstants"

export const editWebPagesButtons = [
  {
    id: 0,
    route: appRoutes.pagina_cursuri,
    label: 'Pagina Cursuri'
  },
  {
    id: 1,
    route: appRoutes.formular_inscriere,
    label: 'Alerte Formular Înscriere'
  },
  {
    id: 2,
    route: appRoutes.headerFooter,
    label: 'Header & Footer'
  }
]

export const coursePresencePageDataButtons = [
  {
    id: 18,
    route: appRoutes.confirmare_prezenta_curs_in_prezent,
    label: 'Data Curs/Sesiune in prezent'
  },
  {
    id: 19,
    route: appRoutes.confirmare_prezenta_curs_in_trecut_viitor,
    label: 'Data Curs/Sesiune in trecut si viitor'
  },
  {
    id: 20,
    route: appRoutes.confirmare_prezenta_acces_curs_zoom,
    label: 'Acces Curs/Sesiune Zoom'
  },
]

export const coursesModule1Button = {
  route: appRoutes.cursuri_modul1,
  label: 'Cursuri Modul 1'
}

export const coursesModule2Button = {
  route: appRoutes.cursuri_modul2,
  label: 'Cursuri Modul '
}

export const studentsSectionButtons = [
  {
    id: 5,
    route: appRoutes.cauta_cursant,
    label: 'Caută cursant înscris'
  },
  {
    id: 6,
    route: appRoutes.total_cursanti,
    label: 'Total cursanți înscriși MODUL 1'
  },
  {
    id: 7,
    route: appRoutes.cursanti_per_curs,
    label: 'Cursanți înscriși per curs MODUL 1'
  },
  {
    id: 8,
    route: appRoutes.cursanti_prezenti,
    label: 'Cursanți prezenți cursuri MODUL 1'
  },
  {
    id: 9,
    route: appRoutes.inscriere_cursanti_modul2,
    label: 'Înscriere cursanți MODUL 2'
  }
]

export const emailsSectionButtons = [
  {
    id: 10,
    route: appRoutes.email_registration,
    label: 'E-mail confirmare înscriere'
  },
  {
    id: 11,
    route: appRoutes.email_3days_after_registration_employee,
    label: 'E-mail 3 zile dupa înscriere candidat/angajat'
  },
  {
    id: 12,
    route: appRoutes.email_3days_after_registration_company,
    label: 'E-mail 3 zile dupa înscriere antreprenor/freelancer'
  },
  {
    id: 13,
    route: appRoutes.email_reminder_7days,
    label: 'E-mail reminder 7 zile'
  },
  {
    id: 14,
    route: appRoutes.email_reminder_1day,
    label: 'E-mail reminder 1 zi'
  },
  {
    id: 15,
    route: appRoutes.email_reminder_1hour,
    label: 'E-mail reminder 1 ora'
  },
  {
    id: 16,
    route: appRoutes.email_voucher_4hours,
    label: 'E-mail voucher - 4 ore dupa participare curs'
  },
  {
    id: 17,
    route: appRoutes.email_voucher_18hours,
    label: 'E-mail voucher - 18 ore dupa participare curs'
  }
]