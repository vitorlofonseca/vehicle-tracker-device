import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import DeviceConfigured from "./components/DeviceConfigured";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import ConfigureDevice from "./components/ConfigureDevice";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={DeviceConfigured} />
        <Route path="/configure-device" component={ConfigureDevice} />
        <Route component={NotFound} />
      </Switch>
    </div>
    <ToastContainer />
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
