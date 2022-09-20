const permissionConstants = {
  ADMIN: "Admin",
  TRAINER: "Trainer",
  MARKETING: "Marketing",
  ANALYTICS: "Analytics",
  EMAILS_ADMINISTRATOR: "Emails Administrator"
}

const permissionsList = [
  {name: 'Admin'},
  {name: 'Trainer'},
  {name: 'Marketing'},
  {name: 'Analytics'},
  {name: 'Emails Administrator'}
]

const pagesAccess = [
  {id: 1, name: 'editare-pagina-cursuri', hasPermission: false, label: 'Editare Pagina Cursuri'},
  {id: 2, name: 'editare-formular-inscriere', hasPermission: false, label: 'Editare Pagina Formular Înscriere'},
  {id: 3, name: 'editare-confirmare-prezenta', hasPermission: false, label: 'Editare Pagina Confirmare Prezenta'},
  {id: 4, name: 'editare-header-footer', hasPermission: false, label: 'Editare Header & Footer Pagini'},
  {id: 5, name: 'cursuri-modul1', hasPermission: false, label: 'Manipulare Cursuri Modul 1'},
  {id: 6, name: 'cursuri-modul2', hasPermission: false, label: 'Manipulare Cursuri Modul 2'},
  {id: 7, name: 'total-cursanti', hasPermission: false, label: 'Administrare Cursanti - Total cursanți înscriși'},
  {id: 8, name: 'cursanti-per-curs', hasPermission: false, label: 'Administrare Cursanti - Cursanți înscriși per curs'},
  {id: 9, name: 'cursanti-prezenti', hasPermission: false, label: 'Administrare Cursanti - Cursanți prezenți per curs'},
  {id: 10, name: 'cursanti-modul2', hasPermission: false, label: 'Administrare Cursanti - Înscriere cursanți Modul 2'},
  {id: 11, name: 'dezabonare-cursanti', hasPermission: false, label: 'Dezabonare Cursanți'},
  {id: 12, name: 'email-confirmare-inscriere', hasPermission: false, label: 'Administrare E-mails - E-mail confirmare înscriere'},
  {id: 13, name: 'email-reminder-7zile', hasPermission: false, label: 'Administrare E-mails - E-mail reminder 7 zile'},
  {id: 14, name: 'email-reminder-1zi', hasPermission: false, label: 'Administrare E-mails - E-mail reminder 1 zi'},
  {id: 15, name: 'email-reminder-1ora', hasPermission: false, label: 'Administrare E-mails - E-mail reminder 1 ora'},
  {id: 16, name: 'email-voucher-4ore', hasPermission: false, label: 'Administrare E-mails - E-mail voucher 4 ore'},
  {id: 17, name: 'email-voucher-40ore', hasPermission: false, label: 'Administrare E-mails - E-mail voucher 40 ore'},
  {id: 18, name: 'email-3-zile-inscriere-angajat', hasPermission: false, label: 'Administrare E-mails - E-mail 3 dupa înscriere angajat'},
  {id: 19, name: 'email-3-zile-inscriere-antreprenor', hasPermission: false, label: 'Administrare E-mails - E-mail 3 dupa înscriere antreprenor'}
]

export {permissionConstants, permissionsList, pagesAccess}