import React from "react";
import "./App.css";
import DeviceConfigured from "./components/DeviceConfigured";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <DeviceConfigured></DeviceConfigured>;
  }
}

export default App;
