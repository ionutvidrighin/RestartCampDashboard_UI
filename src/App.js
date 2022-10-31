import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { generateDataBaseToken } from './redux/actions/generateDBToken';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { appRoutes } from "./constants/appRoutesConstants";
import LoginPage from "./pages/Login/LoginPage";
import AppMenu from "./components/AppMenu";
import AdminSection from "./pages/AdminSection/AdminSection";
import SchimbareEmail from "./pages/SchimbareEmail/SchimbareEmail";
import SchimbareParola from "./pages/SchimbareParola/SchimbareParola";
import Placeholder from "./components/Placeholder";
import PaginaCursuri from "./pages/ManipularePaginiWeb/PaginaCursuri/PaginaCursuri";
import FromularInscriere from "./pages/ManipularePaginiWeb/FormularInscriere/FormularInscriere";
import ConfirmarePrezentaCursInPrezent from "./pages/ManipularePaginiWeb/ConfirmarePrezenta/ConfirmarePrezentaCursInPrezent";
import ConfirmarePrezentaCursInTrecutSiViitor from "./pages/ManipularePaginiWeb/ConfirmarePrezenta/ConfirmarePrezentaCursInTrecutSiViitor";
import ConfirmarePrezentaAccesCursZoom from "./pages/ManipularePaginiWeb/ConfirmarePrezenta/ConfirmarePrezentaAccesCursZoom";
import HeaderFooter from "./pages/ManipularePaginiWeb/Header&Footer/HeaderFooter";
import CursuriModul1 from "./pages/CursuriModul1/CursuriModul1";
import CursuriModul2 from "./pages/CursuriModul2/CursuriModul2";
import CautaCursantInscris from "./pages/AdministrareCursanti/Cauta_cursant_inscris/CautaCursantInscris";
import TotalCursantiInscrisi from "./pages/AdministrareCursanti/Total_cursanti_inscrisi/TotalCursantiInscrisi";
import CursantiPerCurs from "./pages/AdministrareCursanti/Cursanti_inscrisi_per_curs/CursantiPerCurs";
import CursantiPrezentiPerCurs from "./pages/AdministrareCursanti/Cursanti_prezenti_per_curs/CursantiPrezentiPerCurs";
import InscriereCursantiModul2 from "./pages/AdministrareCursanti/Inscriere_cursanti_modul2/InscriereCursantiModul2";
import DezabonareCursanti from "./pages/DezabonareCursanti/DezabonareCursanti";
import EmailConfirmareInscriere from "./pages/AdministrareEmails/EmailConfirmareInscriere";
import Email3zileAngajat from "./pages/AdministrareEmails/Email3zileAngajat"
import Email3zileCompanie from "./pages/AdministrareEmails/Email3zileCompanie"
import EmailReminderCurs1ora from "./pages/AdministrareEmails/EmailReminderCurs1ora";
import EmailReminderCurs1zi from "./pages/AdministrareEmails/EmailReminderCurs1zi";
import EmailReminderCurs7zile from "./pages/AdministrareEmails/EmailReminderCurs7zile";
import EmailVoucher4oreDupaCurs from "./pages/AdministrareEmails/EmailVoucher4oreDupaCurs";
import EmailVoucher18oreDupaCurs from "./pages/AdministrareEmails/EmailVoucher18oreDupaCurs";

function App() {
  const dispatch = useDispatch()

  const isUserLoggedIn = useSelector(state => state.authReducer.isLogged)
  const currentlyLoggedUser = useSelector(state => state.authReducer.username)
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(generateDataBaseToken(currentlyLoggedUser))
    }
  }, [isUserLoggedIn])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          { !isUserLoggedIn ? 
            <LoginPage /> 
            :
            <>
              <AppMenu />
              { showPlaceholder && <Placeholder /> }

              <Route path={appRoutes.sectiune_admin}>
                <AdminSection setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/schimbare-email">
                <SchimbareEmail setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/schimbare-parola">
                <SchimbareParola setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.pagina_cursuri}>
                <PaginaCursuri setShowPlaceholder={setShowPlaceholder} />
              </Route>
              
              <Route path={appRoutes.formular_inscriere}>
                <FromularInscriere setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.confirmare_prezenta_curs_in_prezent}>
                <ConfirmarePrezentaCursInPrezent setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.confirmare_prezenta_curs_in_trecut_viitor}>
                <ConfirmarePrezentaCursInTrecutSiViitor setShowPlaceholder={setShowPlaceholder} />
              </Route>
              
              <Route path={appRoutes.confirmare_prezenta_acces_curs_zoom}>
                <ConfirmarePrezentaAccesCursZoom setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.headerFooter}>
                <HeaderFooter setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.cursuri_modul1}>
                <CursuriModul1 setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.cursuri_modul2}>
                <CursuriModul2 setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.cauta_cursant}>
                <CautaCursantInscris setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.total_cursanti}>
                <TotalCursantiInscrisi setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.cursanti_per_curs}>
                <CursantiPerCurs setShowPlaceholder={setShowPlaceholder} />
              </Route>
              
              <Route path={appRoutes.cursanti_prezenti}>
                <CursantiPrezentiPerCurs setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.inscriere_cursanti_modul2}>
                <InscriereCursantiModul2 setShowPlaceholder={setShowPlaceholder} />
              </Route>
              
              <Route path={appRoutes.dezabonare_cursanti}>
                <DezabonareCursanti setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.email_registration}>
                <EmailConfirmareInscriere setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.email_reminder_7days}>
                <EmailReminderCurs7zile setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.email_reminder_1day}>
                <EmailReminderCurs1zi setShowPlaceholder={setShowPlaceholder} />
              </Route>
              
              <Route path={appRoutes.email_reminder_1hour}>
                <EmailReminderCurs1ora setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.email_voucher_4hours}>
                <EmailVoucher4oreDupaCurs setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.email_voucher_18hours}>
                <EmailVoucher18oreDupaCurs setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.email_3days_after_registration_employee}>
                <Email3zileAngajat setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path={appRoutes.email_3days_after_registration_company}>
                <Email3zileCompanie setShowPlaceholder={setShowPlaceholder} />
              </Route>
            </>
          }
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
