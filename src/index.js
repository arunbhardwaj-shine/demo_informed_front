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

// ----------START-------Webinar routes------------------------

// Dashboard
import Dashboard from "./Components/Webinar/Dashboard";
import WebinarDashboard from "./Components/Webinar/WebinarDashboard";

// Event
import Add from "./Components/Webinar/Event/Add";
import EventList from "./Components/Webinar/Event/List";

// RegionStat
import Home from "./Components/Webinar/Regionstats/Home";

// Rehearsal
import Rehearsal from "./Components/Webinar/Rehearsal/Rehearsal";
// import Rehearsal1 from "./Components/Webinar/Rehearsal/Rehearsal1";
import RehearsalList from "./Components/Webinar/Rehearsal/RehearsalList";

// Layout
import SidebarWebinar from "./Components/Webinar/Layout/Sidebar";
import HeaderWebinar from "./Components/Webinar/Layout/Header";

// Registration
import Registration from "./Components/Webinar/Registration/Registration";
import Preview from "./Components/Webinar/Registration/Preview";
import EditorEmail from "./Components/Webinar/Registration/EditorEmail";
import RegistraionDetails from "./Components/Webinar/Registration/RegistrationDetails";

//Email Stats
import EmailStats from "./Components/Webinar/Email Stats/EmailStats";
import EmailSend from "./Components/Webinar/Email Stats/EmailSend";

// Emails
import SendEmails from "./Components/Webinar/Emails/Emails";
import CreateEmailWebinar from "./Components/Webinar/Emails/Create";
import CreateSmartListWebinar from "./Components/Webinar/Emails/SmartList";
import SmartListUsersWebinar from "./Components/Webinar/Emails/SmartListUsers";

// Readers
import Readers from "./Components/Webinar/Readers/Readers";

// Templates
import Template from "./Components/Webinar/Template/Template";

// SmartList
import WebinarSmartList from "./Components/Webinar/SmartList/WebinarSmartList";
import ViewSmartListWebinar from "./Components/Webinar/SmartList/ViewSmartListWebinar";

// More
import StpDetails from "./Components/Webinar/Smtp/StpDetails";
import Contacts from "./Components/Webinar/Contacts/List";

// -------END----------Webinar routes------------------------

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
import TemplateBuilder from "./Components/Emails/TemplateBuilder";
import EmailArticleSelect from "./Components/Emails/EmailArticleSelect";
import CreateEmail from "./Components/Emails/CreateEmail";
import VerifyHCP from "./Components/Emails/VerifyHCP";
import SelectHCP from "./Components/Emails/SelectHCP";
import VerifyMAIL from "./Components/Emails/VerifyMAIL";
import VerifyHcpMAIL from "./Components/Emails/VerifyHcpMAIL";
import SelectSmartList from "./Components/Emails/SelectSmartList";
import SelectSmartListUsers from "./Components/Emails/SelectSmartListUsers";
import UploadExcel from "./Components/Distributes/SmartListComponent/UploadExcel";
import Proctected from "./Auth/Proctected ";
import ResetPassword from "./Auth/ResetPassword";
import ForgotPassword from "./Auth/ForgotPassword";
import ForgotResetPassword from "./Auth/ForgotResetPassword";

// import Rehearsal1 from "./Components/Webinar/Rehearsal/Rehearsal1";
// import WebinarSmartList from "./Components/Webinar/SmartList/WebinarSmartList";
// import RegistraionDetails from "./Components/Webinar/Registration/RegistrationDetails";
// import RehearsalList from "./Components/Webinar/Rehearsal/RehearsalList";
// import ViewSmartListWebinar from "./Components/Webinar/SmartList/ViewSmartListWebinar";
// import WebinarDashboard from "./Components/Webinar/WebinarDashboard";
import RegistrationDetailsList from "./Components/Webinar/Registration/RegistraionDetailsList";

import SmartListCreate from "./Components/Webinar/SmartList/SmartListCreate";
import FilterList from "./Components/Webinar/SmartList/FilterList";

import ExcelUpload from "./Components/Webinar/SmartList/ExcelUpload";
import CustomizeRehearsalInvites from "./Components/Webinar/Rehearsal/CustomizeRehearsalInvites";
import PortalPreparation from "./Components/Webinar/PortalPreparation/PortalPreparation";
import Polls from "./Components/Webinar/PortalPreparation/Polls";
import EmailsAnalaytics from "./Components/Webinar/Emails/EmailsAnalaytics";
import LiveTools from "./Components/Webinar/LiveTools/LiveTools";
import Analytics from "./Components/Webinar/Analytics/Analytics";
import Files from "./Components/Webinar/File/Files";
import SmartListUsers from "./Components/Webinar/Emails/SmartListUsers";
import CreateRegistration from "./Components/Webinar/Registration/CreateRegistration";
import NewRegistration from "./Components/Webinar/Registration/NewRegistration";

let platform = 0;
let show = 0;
if (window.location.href.indexOf("/webinar") > -1) {
  require("./Components/Webinar/assets/css/webinar-style.css");
  require("./Components/assets/fonts/fonts.css");
  platform = 1;
  show = 1;
} else {
  require("./Components/assets/css/style.css");
  require("./Components/assets/css/responsive.css");
  require("./Components/assets/css/custom.css");
  require("./Components/assets/fonts/fonts.css");
  require("./Components/assets/css/video.css");
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
                    <Route path="/TemplateBuilder" element={<TemplateBuilder />} />
                    <Route
                      path="/EmailArticleSelect"
                      element={<EmailArticleSelect />}
                    />
                    <Route path="/CreateEmail" element={<CreateEmail />} />
                    <Route path="/FilterSegment" element={<FilterSegment />} />
                    <Route path="/SelectHCP" element={<SelectHCP />} />
                    <Route path="/VerifyHCP" element={<VerifyHCP />} />
                    <Route path="/VerifyMAIL" element={<VerifyMAIL />} />
                    <Route path="/VerifyHcpMAIL" element={<VerifyHcpMAIL />} />
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
                        <Route
                          path="/webinar/dashboard"
                          element={<WebinarDashboard />}
                        />
                        <Route path="/webinar/regionstats" element={<Home />} />
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
                        <Route
                          path="/webinar/portal/portalpreparation"
                          element={<PortalPreparation />}
                        />
                        <Route
                          path="/webinar/portal/portalfeatures"
                          element={<PortalPreparation />}
                        />
                        <Route
                          path="/webinar/customizerehearsalinvites"
                          element={<CustomizeRehearsalInvites />}
                        />
                        <Route path="/webinar/readers" element={<Readers />} />
                        <Route
                          path="/webinar/email/template"
                          element={<Template />}
                        />
                        <Route path="/webinar/events" element={<EventList />} />
                        <Route
                          path="/webinar/registration"
                          element={<Registration />}
                        />
                        <Route
                          path="/webinar/portal/createRegistration"
                          element={<CreateRegistration />}
                        />
                        <Route
                          path="/webinar/portal/NewRegistration"
                          element={<NewRegistration />}
                        />
                        <Route
                          path="/webinar/portal/Registrations"
                          element={<Registration />}
                        />
                        <Route
                          path="/webinar/portal/polls"
                          element={<Polls />}
                        />
                        <Route
                          path="/webinar/emailstats"
                          element={<EmailStats />}
                        />
                        <Route
                          path="/webinar/email/emails"
                          element={<SendEmails />}
                        />
                        <Route
                          path="/webinar/email/smart-list-users/:id"
                          element={<SmartListUsers />}
                        />
                        <Route
                          path="/webinar/email/EmailsAnalaytics"
                          element={<EmailsAnalaytics />}
                        />
                        <Route
                          path="/webinar/email/create"
                          element={<CreateEmailWebinar />}
                        />
                        <Route
                          path="/webinar/email/smart-list"
                          element={<CreateSmartListWebinar />}
                        />
                        <Route
                          path="/webinar/emails/smart-list-users"
                          element={<SmartListUsersWebinar />}
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
                          path="/webinar/contacts"
                          element={<Contacts />}
                        />
                        <Route
                          path="/webinar/LiveTools"
                          element={<LiveTools />}
                        />
                        <Route
                          path="/webinar/analytics"
                          element={<Analytics />}
                        />
                        <Route path="/webinar/files" element={<Files />} />
                        <Route
                          path="/webinar/email/WebinarSmartList"
                          element={<WebinarSmartList />}
                        />
                        <Route
                          path="/webinar/email/ViewSmartListWebinar"
                          element={<ViewSmartListWebinar />}
                        />
                        <Route
                          path="/webinar/portal/registrationDetails"
                          element={<RegistraionDetails />}
                        />
                        <Route
                          path="/webinar/portal/registrationDetailslist"
                          element={<RegistrationDetailsList />}
                        />
                        <Route
                          path="/webinar/email/SmartListCreate"
                          element={<SmartListCreate />}
                        />
                        <Route
                          path="/webinar/email/SmartListCreate/FilterList"
                          element={<FilterList />}
                        />
                        <Route
                          path="/webinar/email/SmartListCreate/ExcelUpload"
                          element={<ExcelUpload />}
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
