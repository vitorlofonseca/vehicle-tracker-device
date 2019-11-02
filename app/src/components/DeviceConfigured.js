import React from "react";
import "./styles/DeviceConfigured.css";

class DeviceConfigured extends React.Component {
  constructor(props) {
    super(props);
  }

  configureDevice = () => {
    this.props.history.push("/configure-device");
  };

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
            Reconfigure
          </a>
        </header>
      </div>
    );
  }
}

export default DeviceConfigured;
