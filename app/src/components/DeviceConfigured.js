import React from "react";
import "./styles/DeviceConfigured.css";

class DeviceConfigured extends React.Component {
  constructor(props) {
    super(props);
  }

  configureDevice = () => {
    this.props.history.push("/configure-device");
  };

  componentWillMount() {
    let deviceMac = localStorage.getItem("deviceMac");
    let devicePassword = localStorage.getItem("devicePassword");
    if (!devicePassword && !deviceMac) {
      this.props.history.push("/configure-device");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Device configured</p>
          <a
            className="App-link"
            onClick={this.configureDevice}
            target="_blank"
            rel="noopener noreferrer"
          >
            Configure
          </a>
        </header>
      </div>
    );
  }
}

export default DeviceConfigured;
