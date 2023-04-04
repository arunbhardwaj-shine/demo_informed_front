import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';


import "./index.scss";
import App from "./App";
import * as PDFJS from 'pdfjs-dist';
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import Routing from "./routes";
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={createStore(reducers)}>
      <Routing />
    </Provider>
  </React.StrictMode>,
  // document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
