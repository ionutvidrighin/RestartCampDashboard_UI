import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { generateDataBaseToken } from './redux/actions/generateDBToken';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import AppMenu from "./components/AppMenu";
import AdminSection from "./pages/AdminSection/AdminSection";
import SchimbareEmail from "./pages/SchimbareEmail/SchimbareEmail";
import SchimbareParola from "./pages/SchimbareParola/SchimbareParola";
import Placeholder from "./components/Placeholder";
import PaginaCursuri from "./pages/ManipularePaginiWeb/PaginaCursuri/PaginaCursuri";
import FromularInscriere from "./pages/ManipularePaginiWeb/FormularInscriere/FormularInscriere";
import ConfirmarePrezenta from "./pages/ManipularePaginiWeb/ConfirmarePrezenta/ConfirmarePrezenta";
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
import EmailVoucher40oreDupaCurs from "./pages/AdministrareEmails/EmailVoucher40oreDupaCurs";
// import EmailVoucher40oreDupaParticipare from "./pages/AdministrareEmails/EmailVoucher40oreDupaParticipare";

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
              <AppMenu setShowPlaceholder={setShowPlaceholder} />
              { showPlaceholder && <Placeholder /> }

              <Route path="/sectiune-admin">
                <AdminSection setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/schimbare-email">
                <SchimbareEmail setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/schimbare-parola">
                <SchimbareParola setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/editare-pagina-cursuri">
                <PaginaCursuri setShowPlaceholder={setShowPlaceholder} />
              </Route>
              
              <Route path="/editare-formular-inscriere">
                <FromularInscriere setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/editare-confirmare-prezenta">
                <ConfirmarePrezenta setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/editare-header-footer">
                <HeaderFooter setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/cursuri-modul1">
                <CursuriModul1 setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/cursuri-modul2">
                <CursuriModul2 setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/cauta-cursant">
                <CautaCursantInscris setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/total-cursanti">
                <TotalCursantiInscrisi setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/cursanti-per-curs">
                <CursantiPerCurs setShowPlaceholder={setShowPlaceholder} />
              </Route>
              
              <Route path="/cursanti-prezenti">
                <CursantiPrezentiPerCurs setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/cursanti-modul2">
                <InscriereCursantiModul2 setShowPlaceholder={setShowPlaceholder} />
              </Route>
              
              <Route path="/dezabonare-cursanti">
                <DezabonareCursanti setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/email-confirmare-inscriere">
                <EmailConfirmareInscriere setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/email-reminder-7zile">
                <EmailReminderCurs7zile setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/email-reminder-1zi">
                <EmailReminderCurs1zi setShowPlaceholder={setShowPlaceholder} />
              </Route>
              
              <Route path="/email-reminder-1ora">
                <EmailReminderCurs1ora setShowPlaceholder={setShowPlaceholder} />
              </Route>

              {/* <Route path="/email-voucher-4ore">
                <EmailVoucher4oreDupaParticipare setShowPlaceholder={setShowPlaceholder} />
              </Route> */}

              <Route path="/email-voucher-40ore">
                <EmailVoucher40oreDupaCurs setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/email-3-zile-inscriere-angajat">
                <Email3zileAngajat setShowPlaceholder={setShowPlaceholder} />
              </Route>

              <Route path="/email-3-zile-inscriere-antreprenor">
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
