import React, { Component } from 'react';
import axios from 'axios';
import aws from '../images/aws.png';
import './Cars.css';
import { Link } from 'react-router-dom';

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
        <Link to={`/car/${ car._id }`} key={index}>
          <div id="box">
            <div className="container" id="car">
              <div className="row">
                <div className="col-md-12" id="top" >
                  <h1 id="title">{car.year} {car.brand} {car.model}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4"><img src={aws} alt="part" id="photo" /></div>
                <div className="col-md-4">
                  <p id="model">Mileage: {car.mileage} Color: {car.color}</p>
                  <p id="condition">{car.description}</p>
                </div>
                <div className="col-md-4">
                  <p id="price">${car.price}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )})

    return (
      <div className="parts-main-container" id="main">
        <h1 id="list_name">List of Cars</h1>
        { listOfCars }
      </div>
    );
  }
}