import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";

import Add from './Components/Webinar/Event/Add'
import Home from './Components/Webinar/Dashboard/Home'
import Dashboard from './Components/Webinar/Dashboard'
import EventData from './Components/Webinar/Event/EventData'
import Rehearsal from './Components/Webinar/Rehearsal/Rehearsal'
import HeaderWebinar from './Components/Webinar/Layout/Header'
import SidebarWebinar from './Components/Webinar/Layout/Sidebar'

import Header from "./Components/CommonComponent/HeaderComponent/Header";
import Sidebar from "./Components/CommonComponent/SidebarComponent/Sidebar";
import Table from "./Components/Distributes/SmartListComponent/Table";
import SmartList from "./Components/Distributes/SmartListComponent/SmartList";
import EditList from "./Components/Distributes/SmartListComponent/EditList";
import CreateSmartList from "./Components/Distributes/SmartListComponent/CreateSmartList";
import SmartListFilter from "./Components/Distributes/SmartListComponent/SmartListFilter";
import FilterSegment from "./Components/Distributes/SmartListComponent/FilterSegment";
import VerifySmartList from "./Components/Distributes/SmartListComponent/VerifySmartList";
import ViewList from "./Components/Distributes/SmartListComponent/ViewList";
import EmailList from "./Components/Emails/EmailListing";
import UploadExcel from "./Components/Distributes/SmartListComponent/UploadExcel";

let platform = 1;
let show=0
if (window.location.href.indexOf("webinar") > -1) {
  platform = 0;
  show=1
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducers)}>
      {platform === 1
        ? ( <>
            <Header />
            <div className="warpper">
              <div className="container-fluid">
                <div className="row">
                <Sidebar />
                <BrowserRouter>
                    <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/SmartList" element={<SmartList />} />
                    <Route path="/EditList" element={<EditList />} />
                    <Route path="/CreateSmartList" element={<CreateSmartList />} />
                    <Route path="/SmartListFilter" element={<SmartListFilter />} />
                    <Route path="/EmailList" element={<EmailList />} />
                    <Route path="/FilterSegment" element={<FilterSegment />} />
                    <Route path="/VerifySmartList" element={<VerifySmartList />} />
                    <Route path="/ViewSmartList" element={<ViewList />} />
                    <Route path="/UploadExcel" element={<UploadExcel />} />
                    <Route path="/UpdatedTable" element={<Table />} />
                    </Routes>
                  </BrowserRouter>
                </div>
              </div>
            </div>	
        </>
        )  : (
          <BrowserRouter>
          <HeaderWebinar/> 
          {show==1?<SidebarWebinar/>:null}
            <Routes>
              <Route path="/webinar" element={<Home />} />
              <Route path="/webinar/dashboard" element={<Dashboard />} />
              <Route path="/webinar/event/add" element={<Add />} />
              <Route path="/webinar/event/edit" element={<EventData />} />
              <Route path="/webinar/rehearsal" element={<Rehearsal />} />
            </Routes>
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
