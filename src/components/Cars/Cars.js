import React, { Component } from 'react';
import axios from 'axios';
import aws from '../images/aws.png';
import './Cars.css';

export default class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars : []
    };
  }
  componentWillMount(){
    axios.get('/cars/all')
      .then(res => {
        console.log(res);
        this.setState({ cars: res.data })
      })
      .catch(error => console.log(error));
  }

  render() {
    const listOfCars = this.state.cars.map((car, index) => {
      return (

        <div id="box" key={index}>
          <div class="container">
              <div class="row">
                  <div class="col-md-12" id="top" >
                      <h1 id="title">{ car.year } { car.brand } { car.model }</h1>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-4"><img src={aws} alt="part" id="photo"/></div>
                  <div class="col-md-4">
                      <p id="model">Mileage: { car.mileage } Color: { car.color }</p>
                      <p id="condition">{ car.description }</p>
                  </div>
                  <div class="col-md-4">
                      <p id="price">${ car.price }</p>
                  </div>
              </div>
            </div>
          </div>
      )})
    return (
      <div className="parts-main-container">
        <h1>List of Cars</h1>
        { listOfCars }
      </div>
    );
  }
}