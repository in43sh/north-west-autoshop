import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { urlsend } from "../../../redux/ducks/reducer";
import "./AddNewCar.css";

import Uploader from "../../Uploader/Uploader";

class AddNewCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "",
      model: "",
      price: "",
      color: "",
      year: "",
      mileage: "",
      description: ""
    };
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { brand, model, price, color, year, mileage, description } = this.state;
    axios
      .post("/cars/new", {
        brand,
        model,
        price,
        color,
        year,
        mileage,
        description
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="addnewcar-container">
        <h2>Add a new car</h2>
        <form
          className="addnewcar-form"
          onSubmit={event => this.handleSubmit(event)}
        >
          <table>
            <tbody>
              <tr>
                <th>Options</th>
                <th>Parametres</th>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Brand:</p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("brand", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Model: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("model", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Price: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("price", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Color: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("color", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Year: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("year", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Mileage: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("mileage", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Description: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("description", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Photo: </p>
                </td>
                <td>
                  <Uploader />
                </td>
              </tr>
              <tr><td><input type="submit" className="btn btn-primary input" /></td></tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    url: state.url
  };
};

export default connect(mapStateToProps, null)(AddNewCar);
