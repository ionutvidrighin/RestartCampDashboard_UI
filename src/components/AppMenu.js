import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import { appRoutes } from "../constants/appRoutesConstants";
import { editWebPagesButtons, coursePresencePageDataButtons, 
  studentsSectionButtons, emailsSectionButtons } from "../constants/appMenuButtonsConstants";
import DisplayLoggedUser from "./DisplayLoggedUser";
import DisplayDateAndTime from "./DisplayDateAndTime";
import Button from '@material-ui/core/Button';
import MyAccount from "./MyAccount";
import ApplicationSubMenuButton from "./ReusableComponents/ApplicationSubMenuButton";

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
  subMenuBtn: {
    color: 'white',
    margin: '.4rem 0',
    width: '250px',
    padding: '6px',
    backgroundColor: '#509ecc',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#509ecc',
    }
  }
})

const AppMenu = () => {
  const localStyles = useStyles()
  const history = useHistory()
  const route = useLocation()
  const { pathname } = route

  const [showEditWebPagesSubMenu, setShowEditWebPagesSubMenu] = useState(false)
  const [coursePresencePageSubMenu, setCoursePresencePageSubMenu] = useState(false)
  const [showCoursesSubMenu, setShowCoursesSubMenu] = useState(false)
  const [showStudentSubMenu, setShowStudentSubMenu] = useState(false)
  const [showEmailsSubMenu, setShowEmailsSubMenu] = useState(false)

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
                setShowEditWebPagesSubMenu(!showEditWebPagesSubMenu)
                setShowCoursesSubMenu(false)
                setShowStudentSubMenu(false)
                setShowEmailsSubMenu(false)
              }}>
            Manipulare Pagini Web
            </Button>
            { showEditWebPagesSubMenu &&
              <div className="sub-menu-items mt-1">
                { editWebPagesButtons.map(button => (
                  <div key={button.id}>
                    <ApplicationSubMenuButton
                      appRoute={button.route}
                      buttonLabel={button.label}
                    />
                  </div>
                ))}

                <Button 
                  variant="contained"
                  className={localStyles.subMenuBtn}
                  onClick={() => {
                    setCoursePresencePageSubMenu(!coursePresencePageSubMenu)
                    setShowCoursesSubMenu(false)
                    setShowStudentSubMenu(false)
                    setShowEmailsSubMenu(false)
                  }}>
                Pagina Confirmare Prezență
                </Button>
                { coursePresencePageSubMenu &&
                  <>
                  { coursePresencePageDataButtons.map(button => (
                    <div key={button.id}>
                      <ApplicationSubMenuButton
                        appRoute={button.route}
                        buttonLabel={button.label}
                        buttonWidth={'200px'}
                      />
                    </div>
                  ))}
                  </>
                }
              </div>
            }

            <Button 
              variant="outlined"
              className={localStyles.outlined}
              onClick={() => {
                setShowCoursesSubMenu(!showCoursesSubMenu)
                setShowEditWebPagesSubMenu(false)
                setShowStudentSubMenu(false)
                setShowEmailsSubMenu(false)
              }}>
            Cursuri Restart Camp
            </Button>
              { showCoursesSubMenu &&
                <div className="sub-menu-items">
                  <Button
                    variant="contained" 
                    onClick={() => history.push(appRoutes.cursuri_modul1)} 
                    style={ (pathname === appRoutes.cursuri_modul1) ? { background: '#c23a6a'} : {background: ''} }
                    className={localStyles.contained}> 
                    Cursuri MODUL 1
                  </Button>
                  <Button 
                    variant="contained"
                    onClick={() => history.push(appRoutes.cursuri_modul2)} 
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
                setShowEditWebPagesSubMenu(false)
                setShowCoursesSubMenu(false)
                setShowEmailsSubMenu(false)
              }}>
            Administrare Cursanti
            </Button>
            { showStudentSubMenu &&
              <div className="sub-menu-items">
                { studentsSectionButtons.map(button => (
                  <div key={button.id}>
                    <ApplicationSubMenuButton
                      appRoute={button.route}
                      buttonLabel={button.label}
                    />
                  </div>
                ))}
              </div>
            }

            <hr className="m-0" style={{color: 'white', width: '80%'}} />

            <Button 
              variant="outlined" 
              className={localStyles.outlined}
              onClick={() => {
                setShowEmailsSubMenu(!showEmailsSubMenu)
                setShowEditWebPagesSubMenu(false)
                setShowCoursesSubMenu(false)
                setShowStudentSubMenu(false)
              }}>
            Administrare Emails
            </Button>
            { showEmailsSubMenu && 
              <div className="sub-menu-items">
                { emailsSectionButtons.map(button => (
                  <div key={button.id}>
                    <ApplicationSubMenuButton
                      appRoute={button.route}
                      buttonLabel={button.label}
                    />
                  </div>
                ))}
              </div> 
            }

            <hr className="m-0" style={{color: 'white', width: '80%'}} />

            <Button
              variant="contained"
              className={localStyles.outlined}
              onClick={() => {
                setShowEditWebPagesSubMenu(false)
                setShowEmailsSubMenu(false)
                setShowCoursesSubMenu(false)
                setShowStudentSubMenu(false)
                history.push(appRoutes.dezabonare_cursanti)
              }}
              style={ (pathname === appRoutes.dezabonare_cursanti) ? { background: '#c23a6a'} : {background: ''} }>
              <span className="fw-bold"> DEZABONARE / ȘTERGERE CURSANȚI </span>
            </Button>
          </div>
        </div>

        <DisplayDateAndTime />

      </div>
    </div>
  )
}

export default AppMenu;
