import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";

import Home from "./Dashboard/Home";
import Add from "./Pages/Webinar/Event/Add";
import Dashboard from "./Pages/Webinar/Dashboard";

import Header from "./Components/Distributes/CommonComponent/HeaderComponent/Header";
import Sidebar from "./Components/Distributes/CommonComponent/SidebarComponent/Sidebar";
import Table from "./Components/Distributes/SmartListComponent/Table";
import SmartList from "./Components/Distributes/SmartListComponent/SmartList";
import EditList from "./Components/Distributes/SmartListComponent/EditList";
import CreateSmartList from "./Components/Distributes/SmartListComponent/CreateSmartList";
import SmartListFilter from "./Components/Distributes/SmartListComponent/SmartListFilter";
import FilterSegment from "./Components/Distributes/SmartListComponent/FilterSegment";
import VerifySmartList from "./Components/Distributes/SmartListComponent/VerifySmartList";
import EmailLisitng from "./Components/Emails/EmailListing";

let platform = 1;
if (window.location.href.indexOf("webinar") > -1) {
      platform = 0;
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducers)}>
      {platform == 1
        ? <div className="wrapper">
          <Header />
          <Sidebar />
          <div className="content">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/SmartList" element={<SmartList />} />
                <Route path="/EditList" element={<EditList />} />
                <Route path="/CreateSmartList" element={<CreateSmartList />} />
                <Route path="/EmailLisitng" element={<EmailLisitng />} />
                <Route path="/SmartListFilter" element={<SmartListFilter />} />
                <Route path="/EmailLisitng" element={<EmailLisitng />} />
                <Route path="/FilterSegment" element={<FilterSegment />} />
                <Route path="/VerifySmartList" element={<VerifySmartList />} />

                <Route path="/UpdatedTable" element={<Table />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      :
        <BrowserRouter>
          <Routes>
            <Route path="/webinar" element={<Home />} />
            <Route path="/Webinar/dashboard" element={<Dashboard />} />
            <Route path="/Webinar/Event/Add" element={<Add />} />
          </Routes>
        </BrowserRouter>
      }

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
