import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
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

//Library routes
import LibraryContent from "./Components/Library/Content/LibraryContent";
import LibraryCreate from "./Components/Library/CreateChange/LibraryCreate";
import LibraryCampaign from "./Components/Library/LibraryCampaign";
import Spc from "./Components/Library/Spc";

//Analytics routes
import AnalyticsHeader from "./Components/Analytics/Layout/Header";
import Totalhcp from "./Components/Analytics/TotalHCP/Totalhcp";
import AnalyticsSidebar from "./Components/Analytics/Layout/Sidebar";
//Readers routes
import NewReaders from "./Components/Readers/ReadersView/ReadersList";
import ReaderEdit from "./Components/Readers/ReaderEdit/ReaderEdit";
import ReaderAdd from "./Components/Readers/AddReader/AddReader";
import SmartListAdd from "./Components/Readers/SmartList/SmartList";
import ReaderReview from "./Components/Readers/ReaderReview/ReaderReview";
import TimelineDetail from "./Components/Readers/Timeline/TimelineDetail";

// ----------START-------Webinar routes------------------------
import WebinarHeader from "./Components/NewWebinar/Layout/Header";
import WebinarSidebar from "./Components/NewWebinar/Layout/Sidebar";
import DefaultWebinar from "./Components/NewWebinar/WebinarFiles/Webinar";
import ContactForm from "./Components/NewWebinar/WebinarFiles/ContactForm";
import EmailStatsss from "./Components/NewWebinar/WebinarFiles/EmailStatsss";

// Dashboard

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
import AutoEmail from "./Components/Emails/AutoEmail";
import EmailArticleSelect from "./Components/Emails/EmailArticleSelect";
import CreateEmail from "./Components/Emails/CreateEmail";
import VerifyHCP from "./Components/Emails/VerifyHCP";
import SelectHCP from "./Components/Emails/SelectHCP";
import VerifyMAIL from "./Components/Emails/VerifyMAIL";
import VerifyHcpMAIL from "./Components/Emails/VerifyHcpMAIL";
import SelectSmartList from "./Components/Emails/SelectSmartList";
import SelectSmartListUsers from "./Components/Emails/SelectSmartListUsers";
import UploadExcel from "./Components/Distributes/SmartListComponent/UploadExcel";
import EmailStatss from "./Components/Distributes/EmailStatss";
import GetDetails from "./Components/Distributes/GetDetails";
import StatsWebinar from "./Components/NewWebinar/WebinarFiles/StatsWebinar";
import AutoMail from "./Components/NewWebinar/WebinarFiles/AutoMail";
import EventCreate from "./Components/NewWebinar/WebinarFiles/EventCreate";
import SettingWebinar from "./Components/NewWebinar/WebinarFiles/SettingWebinar";
import LibraryCreateUser from "./Components/Library/CreateChange/LibraryCreateUser";

let platform = 0;
let show = 0;
// if (window.location.href.indexOf("/webinar") > -1) {
//   console.log("in if if")
//   require("./Components/Webinar/assets/css/webinar-style.css");
//   require("./Components/assets/fonts/fonts.css");
//   platform = 1;
//   show = 1;
// }
if (
  window.location.pathname == "/new-webinar" ||
  window.location.pathname == "/contact-form" ||
  window.location.pathname == "/email-statsss" ||
  window.location.pathname == "/stats-webinar" ||
  window.location.pathname == "/event-create" ||
  window.location.pathname == "/setting-webinar"
) {
  console.log("in if");
  require("./Components/assets/css/style.css");
  require("./Components/assets/fonts/fonts.css");
  platform = 0;
  show = 0;
} else {
  console.log("in else");
  // require("./Components/NewWebinar/assets/css/webinar.css");
  require("./Components/assets/css/library.scss");
  require("./Components/assets/css/style.css");
  require("./Components/assets/css/responsive.css");
  require("./Components/assets/css/custom.css");
  require("./Components/assets/fonts/fonts.css");
  require("./Components/assets/css/video.css");
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducers)}>
      <>
        <BrowserRouter>
          {[
            "/new-webinar",
            "/contact-form",
            "/email-statsss",
            "/stats-webinar",
            "/auto-mail",
            "/event-create",
            "/setting-webinar",
          ].includes(window.location.pathname) ? (
            <WebinarHeader />
          ) : ["/library-content", "/library-create"].includes(
              window.location.pathname
            ) ? (
            <Header />
          ) : [
              "/readers-view",
              "/reader-add",
              "/reader-edit",
              "/smart-list-add",
              "/reader-review",
              "/timeline-detail",
            ].includes(window.location.pathname) ? (
            <Header />
          ) : ["/Analytics"].includes(window.location.pathname) ? (
            <Header />
          ) : window.location.pathname !== "/" ? (
            <Header />
          ) : null}
          {/* {window.location.pathname !== "/" ? <WebinarHeader /> : null} */}
          <div className="warpper">
            <div className="container-fluid">
              <div className="row">
                {[
                  "/new-webinar",
                  "/contact-form",
                  "/email-statsss",
                  "/stats-webinar",
                  "/auto-mail",
                  "/event-create",
                  "/setting-webinar",
                ].includes(window.location.pathname) ? (
                  <WebinarSidebar />
                ) : ["/totalhcp"].includes(window.location.pathname) ? (
                  <AnalyticsSidebar />
                ) : window.location.pathname !== "/" ? (
                  <Sidebar />
                ) : null}
                {/* {window.location.pathname !== "/" ? <Sidebar /> : null} */}
                <Routes>
                  {/* New webinar */}
                  {/* <Route path="/new-webinar" element={<WebinarHeader />} /> */}
                  {/* end webinar */}
                  <Route path="/totalhcp" element={<Totalhcp />} />
                  <Route path="/readers-view" element={<NewReaders />} />
                  <Route path="/reader-edit" element={<ReaderEdit />} />
                  <Route path="/reader-add" element={<ReaderAdd />} />
                  <Route path="/smart-list-add" element={<SmartListAdd />} />
                  <Route path="/reader-review" element={<ReaderReview />} />
                  <Route path="/timeline-detail" element={<TimelineDetail />} />

                  <Route path="/library-content" element={<LibraryContent />} />
                  <Route path="/library-edit" element={<LibraryContent />} />
                  <Route path="/library-create" element={<LibraryCreate />} />
                  <Route
                    path="/library-create-user"
                    element={<LibraryCreateUser />}
                  />
                  <Route
                    path="/library-campaign"
                    element={<LibraryCampaign />}
                  />
                  <Route path="/spc" element={<Spc />} />

                  <Route path="/new-webinar" element={<DefaultWebinar />} />
                  <Route path="/contact-form" element={<ContactForm />} />
                  <Route path="/email-statsss" element={<EmailStatsss />} />
                  <Route path="/stats-webinar" element={<StatsWebinar />} />
                  <Route path="/auto-mail" element={<AutoMail />} />

                  <Route path="/event-create" element={<EventCreate />} />
                  <Route path="/setting-webinar" element={<SettingWebinar />} />

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
                    path="/TemplateBuilder"
                    element={<TemplateBuilder />}
                  />
                  <Route path="/AutoEmail" element={<AutoEmail />} />
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
                  <Route path="/EmailStatss" element={<EmailStatss />} />
                  <Route path="/get-details" element={<GetDetails />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
