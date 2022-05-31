import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  Routes,
  Route,
  MemoryRouter as Router,
} from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";

import Add from "./Components/Webinar/Event/Add";
import Home from "./Components/Webinar/Regionstats/Home";
import Dashboard from "./Components/Webinar/Dashboard";
import EventData from "./Components/Webinar/Event/EventData";
import Rehearsal from "./Components/Webinar/Rehearsal/Rehearsal";
import SidebarWebinar from "./Components/Webinar/Layout/Sidebar";
import HeaderWebinar from "./Components/Webinar/Layout/Header";

import Header from "./Components/CommonComponent/HeaderComponent/Header";
import Sidebar from "./Components/CommonComponent/SidebarComponent/Sidebar";
import Table from "./Components/Distributes/SmartListComponent/Table";
import ViewTable from "./Components/Distributes/SmartListComponent/ViewTable";
import SmartList from "./Components/Distributes/SmartListComponent/SmartList";
import EditList from "./Components/Distributes/SmartListComponent/EditList";
import CreateSmartList from "./Components/Distributes/SmartListComponent/CreateSmartList";
import SmartListFilter from "./Components/Distributes/SmartListComponent/SmartListFilter";
import FilterSegment from "./Components/Distributes/SmartListComponent/FilterSegment";
import VerifySmartList from "./Components/Distributes/SmartListComponent/VerifySmartList";
import ViewList from "./Components/Distributes/SmartListComponent/ViewList";
import EmailList from "./Components/Emails/EmailListing";
import EmailArticleSelect from "./Components/Emails/EmailArticleSelect";
import CreateEmail from "./Components/Emails/CreateEmail";
import VerifyHCP from "./Components/Emails/VerifyHCP";
import SelectHCP from "./Components/Emails/SelectHCP";
import VerifyMAIL from "./Components/Emails/VerifyMAIL";
import SelectSmartList from "./Components/Emails/SelectSmartList";
import SelectSmartListUsers from "./Components/Emails/SelectSmartListUsers";
import UploadExcel from "./Components/Distributes/SmartListComponent/UploadExcel";
import Proctected from "./Auth/Proctected ";
import ResetPassword from "./Auth/ResetPassword";
import ForgotPassword from "./Auth/ForgotPassword";
import ForgotResetPassword from "./Auth/ForgotResetPassword";
import Template from "./Components/Webinar/Template/Template";
import Registration from "./Components/Webinar/Registration/Registration";
import Preview from "./Components/Webinar/Registration/Preview";
import EditorEmail from "./Components/Webinar/Registration/EditorEmail";
import Readers from "./Components/Webinar/Readers/Readers";
import EmailStats from "./Components/Webinar/Email Stats/EmailStats";
import EmailSend from "./Components/Webinar/Email Stats/EmailSend";
import StpDetails from "./Components/Webinar/Smtp/StpDetails";
// import Rehearsal1 from "./Components/Webinar/Rehearsal/Rehearsal1";
import WebinarSmartList from "./Components/Webinar/SmartList/WebinarSmartList";
import RegistraionDetails from "./Components/Webinar/Registration/RegistrationDetails";
import RehearsalList from "./Components/Webinar/Rehearsal/RehearsalList";

let platform = 0;
let show = 0;
if (window.location.href.indexOf("/webinar") > -1) {
  platform = 1;
  show = 1;
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducers)}>
      {platform == 0 ? (
        <>
          <BrowserRouter>
            <Header />
            <div className="warpper">
              <div className="container-fluid">
                <div className="row">
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/SmartList" element={<SmartList />} />
                    <Route path="/EditList" element={<EditList />} />
                    <Route
                      path="/CreateSmartList"
                      element={<CreateSmartList />}
                    />
                    <Route
                      path="/SmartListFilter"
                      element={<SmartListFilter />}
                    />
                    <Route
                      path="/SelectSmartList"
                      element={<SelectSmartList />}
                    />
                    <Route path="/EmailList" element={<EmailList />} />
                    <Route
                      path="/EmailArticleSelect"
                      element={<EmailArticleSelect />}
                    />
                    <Route path="/CreateEmail" element={<CreateEmail />} />
                    <Route path="/FilterSegment" element={<FilterSegment />} />
                    <Route path="/SelectHCP" element={<SelectHCP />} />
                    <Route path="/VerifyHCP" element={<VerifyHCP />} />
                    <Route path="/VerifyMAIL" element={<VerifyMAIL />} />
                    <Route
                      path="/SelectSmartListUsers"
                      element={<SelectSmartListUsers />}
                    />
                    <Route
                      path="/VerifySmartList"
                      element={<VerifySmartList />}
                    />
                    <Route path="/ViewSmartList" element={<ViewList />} />
                    <Route path="/UploadExcel" element={<UploadExcel />} />
                    <Route path="/UpdatedTable" element={<Table />} />
                    <Route path="/ViewTable" element={<ViewTable />} />
                  </Routes>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </>
      ) : (
        <BrowserRouter>
          <HeaderWebinar />
          <div className="warpper">
            <div className="container-fluid">
              <div className="row">
                <SidebarWebinar />
                <>
                  {" "}
                  <Routes>
                    <Route path="/webinar" element={<Dashboard />} />
                    <Route
                      path="/webinar/register/:code/:url/:stats"
                      element={<Preview />}
                    />
                    <Route
                      path="/webinar/Forgotpassword"
                      element={<ForgotPassword />}
                    />
                    <Route
                      path="/webinar/forgot-password/:id"
                      element={<ForgotResetPassword />}
                    />
                    <React.Fragment>
                      {/* <Route path="/webinar" element={<App />} /> */}
                      <Route path="/" element={<Proctected />}>
                        <Route path="/webinar/dashboard" element={<Home />} />
                        <Route
                          path="/webinar/resetpassword"
                          element={<ResetPassword />}
                        />
                        <Route path="/webinar/event/add" element={<Add />} />
                        <Route
                          path="/webinar/rehearsal"
                          element={<Rehearsal />}
                        />
                        <Route
                          path="/webinar/rehearsallist"
                          element={<RehearsalList />}
                        />
                        <Route path="/webinar/readers" element={<Readers />} />
                        <Route
                          path="/webinar/template"
                          element={<Template />}
                        />
                        <Route
                          path="/webinar/event/edit"
                          element={<EventData />}
                        />
                        <Route
                          path="/webinar/registration"
                          element={<Registration />}
                        />
                        <Route
                          path="/webinar/emailstats"
                          element={<EmailStats />}
                        />
                        <Route
                          path="/webinar/sendemail"
                          element={<EmailSend />}
                        />
                        <Route
                          path="/webinar/stpdetails"
                          element={<StpDetails />}
                        />
                        <Route
                          path="/webinar/WebinarSmartList"
                          element={<WebinarSmartList />}
                        />
                        <Route
                          path="/webinar/RegistrationDetails"
                          element={<RegistraionDetails />}
                        />
                      </Route>
                    </React.Fragment>
                  </Routes>
                  {/* {localStorage.getItem("Token")?<Routes>
            <Route path="/webinar" element={<Home />} />
            <Route path="/webinar/dashboard" element={<Dashboard />} />
            <Route path="/webinar/event/add" element={<Add />} />
            <Route path="/webinar/event/edit" element={<EventData />} />
            <Route path="/webinar/rehearsal" element={<Rehearsal />} />
          </Routes>:null} */}
                </>
              </div>
            </div>
          </div>
        </BrowserRouter>
      )}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
