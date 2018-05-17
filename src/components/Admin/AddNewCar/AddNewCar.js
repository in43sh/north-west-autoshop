import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
// import { urlsend } from "../../../redux/ducks/reducer";
import "./AddNewCar.css";
import { getPhotos, savePhotos } from "../../../redux/ducks/reducer"


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
      description: "",
      photos: []
    };
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { brand, model, price, color, year, mileage, description } = this.state;
    let photos = this.props.getPhotos();
    if(photos==null){
      photos = [];
    }
    axios
      .post("/cars/new", {
        brand,
        model,
        price,
        color,
        year,
        mileage,
        description,
        photos
      })
      .then(response => {
        console.log(response);
        this.props.savePhotos([])
      })
      .catch(error => console.log(error));
        console.log(this.state)
      
      console.log(window.location);
      alert("New car is created!")
      this.setState({
        brand: "",
        model: "",
        price: "",
        color: "",
        year: "",
        mileage: "",
        description: "",
        photos: []
      })
      window.location.reload();
  }
  checkState(){
    console.log("this state",this.state)
    console.log("this props =>>>", this.props);
    console.log(this.props.getPhotos())
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
                    defaultValue={this.state.brand}
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
                    defaultValue={this.state.model}
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
                    defaultValue={this.state.price}
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
                    defaultValue={this.state.color}
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
                    defaultValue={this.state.year}
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
                    defaultValue={this.state.mileage}
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
                    defaultValue={this.state.description}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Photo: </p>
                </td>
              </tr>
              <tr><td><input type="submit" className="btn btn-primary input" /></td></tr>
              
            </tbody>
          </table>
        </form>
        <Uploader />
        <button onClick={() => this.checkState()}>Check state</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    url: state.url,
    getPhotos: getPhotos,
    savePhotos: savePhotos
  };
};
export default connect(mapStateToProps, null)(AddNewCar);
