import React from "react";
import "./styles/DeviceConfigured.css";
import { GetDevice, StartStream, StopStream } from "../http/device.http";
import { Row, Col } from "react-bootstrap";

class DeviceConfigured extends React.Component {
  constructor(props) {
    super(props);
  }

  configureDevice = () => {
    this.props.history.push("/configure-device");
  };

  startStream = () => {
    let devicePassword = localStorage.getItem("devicePassword");
    StartStream(devicePassword)
      .then(res => {})
      .catch(err => {});
  };

  stopStream = () => {
    let devicePassword = localStorage.getItem("devicePassword");
    StopStream(devicePassword)
      .then(res => {})
      .catch(err => {});
  };

  componentWillMount() {
    let deviceMac = localStorage.getItem("deviceMac");
    let devicePassword = localStorage.getItem("devicePassword");
    if (!devicePassword && !deviceMac) {
      this.configureDevice();
    }

    GetDevice(deviceMac, devicePassword)
      .then(res => {
        if (!res["_id"]) {
          this.configureDevice();
        }
      })
      .catch(err => {});

    StartStream(devicePassword)
      .then(res => {})
      .catch(err => {});
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
          <Row>
            <Col>
              <a
                className="App-link"
                onClick={this.startStream}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start
              </a>
            </Col>
            <Col>
              <a
                className="App-link"
                onClick={this.stopStream}
                target="_blank"
                rel="noopener noreferrer"
              >
                Stop
              </a>
            </Col>
          </Row>
        </header>
      </div>
    );
  }
}

export default DeviceConfigured;
