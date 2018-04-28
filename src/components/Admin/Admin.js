import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css';
import AddNewCar from './AddNewCar/AddNewCar';
import AddNewPart from './AddNewPart/AddNewPart';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      cars: [],
      parts: []
    };
  }

  componentWillMount() {
    axios.all([
      axios.get(`/requests/all`),
      axios.get(`/cars/all`),
      axios.get(`/parts/all`)
    ]).then(axios.spread( (requests, cars, parts) => {
      this.setState({
        requests: requests.data,
        cars: cars.data,
        parts: parts.data
      })
      // console.log('requests ', this.state.requests);
      // console.log('cars ', this.state.cars);
      // console.log('parts ', this.state.parts);
    })).catch(err => console.log(err));
  }

  handleDelete(i) {
    axios.post('/parts/delete', { i })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  }

  render() {
    const listOfRequests = this.state.requests.map( request => (
      <div className="admin-requests-container" key={request._id}>
        <div>Name: {request.name}</div>
        <div>Phone: {request.phone}</div>
        <div>Message: {request.message}</div>
      </div>
    ));

    const listOfCars = this.state.cars.map( car => (
      <div className="admin-requests-container" key={car._id}>
        <div>Brand: {car.brand}</div>
        <div>Model: {car.model}</div>
        <div>Price: {car.price}</div>
        <div>Color: {car.color}</div>
        <div>Year: {car.year}</div>
        <div>Description: {car.description}</div>
        <div>Photos: {car.photos}</div>
      </div>
    ));

    const listOfParts = this.state.parts.map((part, index) => (
      <div className="admin-requests-container" key={index}>
        <div>Name: {part.name}</div>
        <div>Brand: {part.brand}</div>
        <div>Model: {part.model}</div>
        <div>Price: {part.price}</div>
        <div>Condition {part.condition}</div>
        <div>Year: {part.year}</div>
        <div>Description: {part.description}</div>
        <div>Photos: {part.photos}</div>
        <button onClick={() => this.handleDelete(part._id)}>delete</button>
      </div>
    ));

    return (
      <div className="admin-main-container">
        <h1>Admin</h1>
        <h2>Requests</h2>
        { listOfRequests }
        <h2>Cars</h2>
        { listOfCars }
        <AddNewCar />
        <h2>Parts</h2>
        { listOfParts }
        <AddNewPart />
      </div>
    );
  }
}