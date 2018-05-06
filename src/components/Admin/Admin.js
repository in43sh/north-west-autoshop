import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css';
import AddNewCar from './AddNewCar/AddNewCar';
import AddNewPart from './AddNewPart/AddNewPart';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/ducks/reducer';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      cars: [],
      parts: []
    };
  }

  logout() {
    axios.post('/user/logout')
      .then(response => {
        console.log('you are out');
        console.log(this.props.login(null))
        this.props.login(null)
        this.props.history.push('/login');
        console.log('you are logged out')
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
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

    logout() {
    axios.post('/user/logout')
      .then(response => {
        console.log('you are out');
        console.log(response.data);
        this.props.login(response.data)
        this.props.history.push('/login');
        console.log('you are logged out')
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleDelete(i) {
    axios.post('/parts/delete', { i })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  }
  handleCarDelete(i) {
    axios.post('/cars/delete', { i })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  }
  handleRequestDelete(i) {
    axios.post('/requests/delete', { i })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  }

  render() {
    const { user } = this.props;
    console.log(user);

    const listOfRequests = this.state.requests.map( request => (
      <div className="admin-requests-container" key={request._id}>
        <div>Name: {request.name}</div>
        <div>Phone: {request.phone}</div>
        <div>Message: {request.message}</div>
        <button className="btn btn-danger" onClick={() => this.handleRequestDelete(request._id)}>Delete</button>
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
        <button className="btn btn-danger" onClick={() => this.handleCarDelete(car._id)}>Delete</button>
      </div>
    ));

    const listOfParts = this.state.parts.map((part, index) => (
      <div className="admin-requests-container" key={index}>
        <div><h3>Title: {part.title}</h3></div>
        <div>Brand: {part.brand}</div>
        <div>Model: {part.model}</div>
        <div>Price: {part.price}</div>
        <div>Condition {part.condition}</div>
        <div>Year: {part.year}</div>
        <div>Description: {part.description}</div>
        <div>Photos: {part.photos}</div>
        <button className="btn btn-danger" onClick={() => this.handleDelete(part._id)}>Delete</button>
      </div>
    ));

    return (
      <div className="admin-main-container">
        {user && <div>
          <button onClick={ this.logout }>Log out</button>
          <h1>Admin</h1>
          <h2>Requests</h2>
          { listOfRequests }
          <h2>Cars</h2>
          { listOfCars }
          <AddNewCar />
          <h2>Parts</h2>
          { listOfParts }
          <AddNewPart />
        </div>}
        {!user && <div className="you-must-log-in-div"><p>You must log in! <Link to="/login">Log in</Link></p></div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
