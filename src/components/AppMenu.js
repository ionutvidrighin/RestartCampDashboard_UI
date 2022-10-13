import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import { appRoutes } from "../constants/appRoutesConstants";
import DisplayLoggedUser from "./DisplayLoggedUser";
import DisplayDateAndTime from "./DisplayDateAndTime";
import Button from '@material-ui/core/Button';
import MyAccount from "./MyAccount";

const useStyles = makeStyles({
  outlined: {
    fontSize: '.8rem',
    color: 'white',
    width: '90%',
    padding: 10,
    margin: '1rem 0',
    backgroundColor: '#509ecc',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#c23a6a',
    },
    '&:focus': {
      backgroundColor: '#c23a6a'
    }
  },
  contained: {
    color: 'white',
    margin: '.4rem 0',
    width: '250px',
    padding: '6px',
    backgroundColor: '#509ecc',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#509ecc',
    },
  },
  emailsTemplateBtn: {
    color: 'white',
    margin: '.4rem 0',
    width: '200px',
    padding: '6px',
    backgroundColor: '#509ecc',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#509ecc',
    },
  }
})

const AppMenu = () => {
  const localStyles = useStyles()
  const history = useHistory()
  const route = useLocation()
  const { pathname } = route

  const [showCoursesSubMenu, setShowCoursesSubMenu] = useState(true)
  const [showStudentSubMenu, setShowStudentSubMenu] = useState(false)
  const [showEmailsSubMenu, setShowEmailsSubMenu] = useState(false)
  const [showEmailsModule1, setShowEmailsModule1] = useState(false)
  const [showEmailsModule2, setShowEmailsModule2] = useState(false)
  const [showCommonEmails, setShowCommonEmails] = useState(false)
  const [showWebPageManipulation, setShowWebPageManipulation] = useState(false)


  return (
    <div className="dashboard p-2">
      <div className="sidebar px-4 py-1 d-flex flex-column align-items-start justify-content-start">
        
        <MyAccount />

        <div className="d-flex flex-column align-items-center">
          <div className="app-logo pb-1">
            <img src="./imgs/logo.png" alt="logo" width="60%" />
          </div>
          <hr className="m-0" style={{color: 'white', width: '100%'}} />

          <DisplayLoggedUser />

          <hr className="m-0" style={{color: 'white', width: '80%'}} />

          <div className="menu-buttons">
            <Button 
              variant="outlined"
              className={localStyles.outlined}
              onClick={() => {
                  setShowCoursesSubMenu(!showCoursesSubMenu)
                  setShowStudentSubMenu(false)
                  setShowEmailsSubMenu(false)
                  setShowEmailsModule1(false)
                  setShowEmailsModule2(false)
                }
              }>
            Cursuri Restart Camp
            </Button>
              { showCoursesSubMenu &&
                <div className="sub-menu-items">
                  <Button
                    variant="contained" 
                    onClick={() => setShowWebPageManipulation(!showWebPageManipulation)} 
                    style={ showWebPageManipulation ? { background: '#c23a6a'} : {background: ''} }
                    className={localStyles.contained}> 
                    Manipulare Pagini Website
                  </Button>

                  { showWebPageManipulation &&
                    <div className="sub-menu-items mt-1">
                      <Button
                        variant="contained"
                        className={localStyles.emailsTemplateBtn}
                        style={ (pathname === appRoutes.pagina_cursuri) ? { background: '#c23a6a'} : {background: ''} }
                        onClick={() => history.push('/editare-pagina-cursuri')} > 
                        Pagina Cursuri
                      </Button>
                      <Button
                        variant="contained"
                        className={localStyles.emailsTemplateBtn}
                        style={ (pathname === appRoutes.formular_inscriere) ? { background: '#c23a6a'} : {background: ''} }
                        onClick={() => history.push('/editare-formular-inscriere')} > 
                        Alerte Formular Înscriere
                      </Button>
                      <Button
                        variant="contained"
                        className={localStyles.emailsTemplateBtn}
                        style={ (pathname === appRoutes.confirmare_prezenta) ? { background: '#c23a6a'} : {background: ''} }
                        onClick={() => history.push('/editare-confirmare-prezenta')} > 
                        Pagina Confirmare Prezență
                      </Button>
                      <Button
                        variant="contained"
                        className={localStyles.emailsTemplateBtn}
                        style={ (pathname === appRoutes.headerFooter) ? { background: '#c23a6a'} : {background: ''} }
                        onClick={() => history.push('/editare-header-footer')} > 
                        Header & Footer
                      </Button>
                    </div>
                  }

                  <Button
                    variant="contained" 
                    onClick={() => {
                        history.push('/cursuri-modul1')
                        setShowWebPageManipulation(false)
                      } 
                    } 
                    style={ (pathname === appRoutes.cursuri_modul1) ? { background: '#c23a6a'} : {background: ''} }
                    className={localStyles.contained}> 
                    Cursuri MODUL 1
                  </Button>
                  <Button 
                    variant="contained"
                    onClick={() => {
                        history.push('/cursuri-modul2')
                        setShowWebPageManipulation(false)
                      } 
                    } 
                    style={ (pathname === appRoutes.cursuri_modul2) ? { background: '#c23a6a'} : {background: ''} }
                    className={localStyles.contained}> 
                    Cursuri MODUL 2
                  </Button>
                </div>
              }
            <hr className="m-0" style={{color: 'white', width: '80%'}} />

            <Button 
              variant="outlined"
              className={localStyles.outlined}
              onClick={() => {
                  setShowStudentSubMenu(!showStudentSubMenu)
                  setShowCoursesSubMenu(false)
                  setShowEmailsSubMenu(false)
                  setShowEmailsModule1(false)
                  setShowEmailsModule2(false)
                }
              }>
            Administrare Cursanti
            </Button>
              { showStudentSubMenu &&
                <div className="sub-menu-items">
                  <Button
                    variant="contained" 
                    className={localStyles.contained} 
                    style={ (pathname === appRoutes.cauta_cursant) ? { background: '#c23a6a'} : {background: ''} }
                    onClick={() => history.push('/cauta-cursant')}> 
                    Caută <span className="text-lowercase mx-1"> cursant înscris </span>
                  </Button>

                  <Button
                    variant="contained" 
                    className={localStyles.contained} 
                    style={ (pathname === appRoutes.total_cursanti) ? { background: '#c23a6a'} : {background: ''} }
                    onClick={() => history.push('/total-cursanti')}> 
                    Total <span className="text-lowercase mx-1"> cursanți înscriși </span> MODUL 1
                  </Button>

                  <Button 
                    variant="contained" 
                    className={localStyles.contained}
                    style={ (pathname === appRoutes.cursanti_per_curs) ? { background: '#c23a6a'} : {background: ''} }
                    onClick={() => history.push('/cursanti-per-curs')}> 
                    Cursanți <span className="text-lowercase mx-1"> înscriși per curs </span> MODUL 1
                  </Button>

                  <Button 
                    variant="contained" 
                    className={localStyles.contained}
                    style={ (pathname === appRoutes.cursanti_prezenti) ? { background: '#c23a6a'} : {background: ''} }
                    onClick={() => history.push('/cursanti-prezenti')}> 
                    Cursanți <span className="text-lowercase mx-1">prezenți cursuri</span> MODUL 1
                  </Button>

                  <Button 
                    variant="contained" 
                    className={localStyles.contained}
                    style={ (pathname === appRoutes.cursanti_modul2) ? { background: '#c23a6a'} : {background: ''} }
                    onClick={() => history.push('/cursanti-modul2')}> 
                    Înscriere <span className="text-lowercase me-1 ms-1">cursanți</span> MODUL 2
                  </Button>
                </div>
              }

            {/* Separator */}
            <hr className="m-0" style={{color: 'white', width: '80%'}} />

            <Button 
              variant="outlined" 
              className={localStyles.outlined}
              onClick={() => {
                setShowEmailsSubMenu(!showEmailsSubMenu)
                setShowCoursesSubMenu(false)
                setShowStudentSubMenu(false)
              }}>
              Administrare Emails
            </Button>

            { showEmailsSubMenu && 
              <div className="sub-menu-items">

                {/* Sectiunea CURSURI MODUL 1 */}
                <Button 
                  variant="contained"
                  className={localStyles.contained}
                  onClick={() => {
                    setShowEmailsModule1(!showEmailsModule1)
                    setShowEmailsModule2(false)
                    setShowCommonEmails(false)
                  }}
                  style={ showEmailsModule1 ? { background: '#c23a6a'} : {background: ''} }>
                  <span className="fst-italic">
                    E-mails Cursuri MODUL 1
                  </span>
                </Button>

                { showEmailsModule1 && 
                  <div className="sub-menu-items mt-1">
                    <Button
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}
                      style={ (pathname === appRoutes.email_reminder_7days) ? { background: '#c23a6a'} : {background: ''} }
                      onClick={() => history.push('/email-reminder-7zile')} > 
                      E-mail <span className="text-lowercase ms-1"> reminder 7 zile </span> 
                    </Button>
                    <Button
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}
                      style={ (pathname === appRoutes.email_reminder_1day) ? { background: '#c23a6a'} : {background: ''} }
                      onClick={() => history.push('/email-reminder-1zi')}>
                      E-mail <span className="text-lowercase ms-1"> reminder 1 zi </span>
                    </Button>
                    <Button
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}
                      style={ (pathname === appRoutes.email_reminder_1hour) ? { background: '#c23a6a'} : {background: ''} }
                      onClick={() => history.push('/email-reminder-1ora')}>
                      E-mail <span className="text-lowercase ms-1"> reminder 1 ora </span>
                    </Button>
                    <Button
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}
                      style={ (pathname === appRoutes.email_voucher_4hours) ? { background: '#c23a6a'} : {background: ''} }
                      onClick={() => history.push('/email-voucher-4ore')}>
                      <span>
                        E-mail <span className="text-lowercase"> voucher - 4 ore dupa confirmare participare </span> 
                      </span>
                    </Button>
                    <Button
                    variant="contained"
                    className={localStyles.emailsTemplateBtn}                      
                    style={ (pathname === appRoutes.email_voucher_40hours) ? { background: '#c23a6a'} : {background: ''} }
                    onClick={() => history.push('/email-voucher-40ore')}>
                      <span>
                        E-mail <span className="text-lowercase"> voucher - 40 ore dupa confirmare participare </span> 
                      </span>
                    </Button>
                  </div>
                }

                {/* Sectiunea E-mails CURSURI MODUL 2 */}
                <Button 
                  variant="contained"
                  className={localStyles.contained}
                  onClick={() => {
                    setShowEmailsModule2(!showEmailsModule2)
                    setShowEmailsModule1(false)
                    setShowCommonEmails(false)
                  }}
                  style={ showEmailsModule2 ? { background: '#c23a6a'} : {background: ''} }>
                  <span className="fst-italic">
                  E-mails Cursuri MODUL 2
                  </span>
                </Button>
                
                {/* Access spre sectiunea E-mails CURSURI MODUL 2 */}
                { showEmailsModule2 &&
                  <div className="sub-menu-items mt-1">
                    <Button
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}> 
                      E-mail <span className="text-lowercase ms-1"> reminder 7 zile </span> 
                    </Button>
                    <Button
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}>
                      E-mail <span className="text-lowercase ms-1"> reminder 1 zi </span>
                    </Button>
                    <Button
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}>
                      E-mail <span className="text-lowercase ms-1"> reminder 1 ora </span>
                    </Button>
                    <Button
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}>
                      <span>
                      E-mail <span className="text-lowercase"> voucher - 4 ore dupa confirmare participare </span> 
                      </span>
                    </Button>
                    <Button
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}>
                      <span>
                      E-mail <span className="text-lowercase"> voucher - 40 ore dupa confirmare participare </span> 
                      </span>
                    </Button>
                  </div>
                }

                {/* sub-Sectiunea EMAIL Templates comune */}
                <Button 
                  variant="contained"
                  className={localStyles.contained}
                  onClick={() => {
                    setShowCommonEmails(!showCommonEmails)
                    setShowEmailsModule1(false)
                    setShowEmailsModule2(false)
                  }}
                  style={ showCommonEmails ? { background: '#c23a6a'} : {background: ''} }>
                  <span className="fst-italic">
                  E-mail Templates Comune
                  </span>
                </Button>

                {/* Access spre template-uri comune */}
                { showCommonEmails &&
                  <>
                    <Button 
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}
                      style={ (pathname === appRoutes.email_registration) ? { background: '#c23a6a'} : {background: ''} }
                      onClick={() => history.push('/email-confirmare-inscriere')} > 
                      E-mail <span className="text-lowercase ms-1"> confirmare înscriere </span> 
                    </Button>

                    <Button
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}
                      style={ (pathname === appRoutes.email_3days_after_registration_employee) ? { background: '#c23a6a'} : {background: ''} }
                      onClick={() => history.push('/email-3-zile-inscriere-angajat')} > 
                        <span className="text-lowercase">
                          <span className="text-capitalize">E-mail</span> 3 zile dupa înscriere candidat/angajat 
                        </span>
                    </Button>

                    <Button
                      variant="contained"
                      className={localStyles.emailsTemplateBtn}
                      style={ (pathname === appRoutes.email_3days_after_registration_freelancer) ? { background: '#c23a6a'} : {background: ''} }
                      onClick={() => history.push('/email-3-zile-inscriere-antreprenor')} > 
                        <span className="text-lowercase">
                          <span className="text-capitalize">E-mail</span> 3 zile dupa înscriere antreprenor/freelancer 
                        </span>
                    </Button>
                  </>
                }
              </div> 
            }

            {/* Separator */}
            <hr className="m-0" style={{color: 'white', width: '80%'}} />

            <Button 
              variant="contained"
              className={localStyles.outlined}
              onClick={() => {
                setShowEmailsSubMenu(false)
                setShowCoursesSubMenu(false)
                setShowStudentSubMenu(false)
                history.push('/dezabonare-cursanti')
              }}
              style={ (pathname === appRoutes.dezabonare_cursanti) ? { background: '#c23a6a'} : {background: ''} }>
              <span className="fw-bold">
                DEZABONARE / ȘTERGERE CURSANȚI
              </span>
            </Button>
          </div>
        </div>

        <DisplayDateAndTime />
      </div>
    </div>
  )
}

export default AppMenu;
