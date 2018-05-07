import React, { Component } from 'react';
import axios from 'axios';
import aws from "../../images/aws.png";
import Navbar from "../../Navbar/Navbar";
// import { Link } from 'react-router-dom';
import "./OneCar.css"
// import aws from "../images/aws.png";
export default class OneCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car: {}
    };

  }

  componentWillMount(){
    // console.log("ONE CAR!")
    let id = {
      _id: this.props.match.params._id
    }
    axios.post('/cars/find/', id)
      .then(res => {
        this.setState({ car: res.data })
        console.log(this.state.car);
      })
      .catch(error => console.log(error));
  }
  render() {
    
    return (
      <div>
        < Navbar />
          <div id="main">
          <div id="box">
          
            <div className="container" id="car">
              <div className="row">
                <div className="col-md-12" id="top" >
                  <h1 id="title">{this.state.car.year} {this.state.car.brand} {this.state.car.model}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4"><img src={aws} alt="part" id="photo" /></div>
                <div className="col-md-4">
                  <p id="model">Mileage: {this.state.car.mileage} Color: {this.state.car.color}</p>
                  <p id="condition">{this.state.car.description}</p>
                </div>
                <div className="col-md-4">
                  <p id="price">${this.state.car.price}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
    );
  }
}
