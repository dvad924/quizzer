import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Router } from "react-router-dom";
import { browserHistory } from "react-router";
import createStore from "./stores/createStore";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
const store = createStore({});

ReactDOM.render(
  <Provider store={store}>
    <div style={{ height: "100%" }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
