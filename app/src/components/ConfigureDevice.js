import React from "react";
import "./styles/ConfigureDevice.css";
import { Form, Button } from "react-bootstrap";
import { Save, GetDevice } from "../http/device.http";
import { sha256 } from "js-sha256";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

class ConfigureDevice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      device: {
        password: "",
        inUse: true,
        vehicle: {
          manufacturer: "",
          model: "",
          year: "",
          plate: ""
        }
      }
    };
  }

  getDeviceByMac = () => {
    let deviceMac = localStorage.getItem("deviceMac");
    let devicePassword = localStorage.getItem("devicePassword");
    if (!deviceMac && !devicePassword) {
      return;
    }

    GetDevice(deviceMac, devicePassword)
      .then(res => {
        let device = {
          password: res.password,
          inUse: res.inUse,
          vehicle: {
            manufacturer: res.vehicle.manufacturer,
            model: res.vehicle.model,
            year: res.vehicle.year,
            plate: res.vehicle.plate
          }
        };

        this.setState({ device });
      })
      .catch(err => {});
  };

  componentWillMount() {
    this.getDeviceByMac();
  }

  encryptPassword = () => {
    return sha256(this.state.device.password);
  };

  sendData = () => {
    let newDevice = this.state;
    newDevice.device.password = this.encryptPassword();
    localStorage.setItem("devicePassword", newDevice.device.password);
    Save(newDevice)
      .then(res => {
        localStorage.setItem("deviceMac", res.data.macAddress);
        this.props.history.push("/");
        toast("Your device is configured!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  changePassword = newValue => {
    let device = this.state.device;
    device.password = newValue.target.value;
    this.setState({ device });
  };

  changeManufacturer = newValue => {
    let device = this.state.device;
    device.vehicle.manufacturer = newValue.target.value;
    this.setState({ device });
  };

  changeModel = newValue => {
    let device = this.state.device;
    device.vehicle.model = newValue.target.value;
    this.setState({ device });
  };

  changeYear = newValue => {
    let device = this.state.device;
    device.vehicle.year = newValue.target.value;
    this.setState({ device });
  };

  changePlate = newValue => {
    let device = this.state.device;
    device.vehicle.plate = newValue.target.value;
    this.setState({ device });
  };

  render() {
    return (
      <div className="container">
        <Form>
          <Form.Group controlId="deviceForm.password">
            <Form.Label>Device password</Form.Label>
            <Form.Control
              type="password"
              placeholder="************"
              value={this.state.device.password}
              onChange={newValue => this.changePassword(newValue)}
            />
          </Form.Group>
          <Form.Group controlId="deviceForm.vehicle.manufacturer">
            <Form.Label>Manufacturer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Manufacturer"
              value={this.state.device.vehicle.manufacturer}
              onChange={newValue => this.changeManufacturer(newValue)}
            />
          </Form.Group>
          <Form.Group controlId="deviceForm.vehicle.model">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Model"
              value={this.state.device.vehicle.model}
              onChange={newValue => this.changeModel(newValue)}
            />
          </Form.Group>
          <Form.Group controlId="deviceForm.vehicle.year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="text"
              placeholder="Year"
              value={this.state.device.vehicle.year}
              onChange={newValue => this.changeYear(newValue)}
            />
          </Form.Group>
          <Form.Group controlId="deviceForm.vehicle.plate">
            <Form.Label>Plate</Form.Label>
            <Form.Control
              type="text"
              placeholder="Plate"
              value={this.state.device.vehicle.plate}
              onChange={newValue => this.changePlate(newValue)}
            />
          </Form.Group>
        </Form>
        <Button onClick={this.sendData}>Send</Button>
      </div>
    );
  }
}

export default withRouter(ConfigureDevice);
