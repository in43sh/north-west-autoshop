import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css';

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
      console.log('requests ', this.state.requests);
      console.log('cars ', this.state.cars);
      console.log('parts ', this.state.parts);
    })).catch(err => console.log(err));
  }

  render() {
    const listOfRequests = this.state.requests.map( request => (
      <div className="admin-requests-container" key={request._id}>
        <p>{request.name}</p>
        <p>{request.phone}</p>
        <p>{request.message}</p>
      </div>
    ));

    const listOfCars = this.state.requests.map( car => (
      <div className="admin-requests-container" key={car._id}>
        <p>{car.name}</p>
      </div>
    ));

    const listOfParts = this.state.requests.map( part => (
      <div className="admin-requests-container" key={part._id}>
        <p>{part.name}</p>
      </div>
    ));

    return (
      <div>
        <h1>Requests</h1>
        { listOfRequests }
        <h1>Cars</h1>
        { listOfCars }
        <h1>Parts</h1>
        { listOfParts }
      </div>
    );
  }
}