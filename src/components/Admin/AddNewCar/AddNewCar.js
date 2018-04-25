import React, { Component } from 'react';
import axios from 'axios';
import './AddNewCar.css';

export default class AddNewCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      model: '',
      price: '',
      color: '',
      year: '',
      mileage: '',
      description: ''
    }
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    let { brand, model, price, color, year, mileage, description } = this.state;
    axios.post('/cars/new', { brand, model, price, color, year, mileage, description })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="addnewcar-container">
        <form className="addnewcar-form" onSubmit={(event) => this.handleSubmit(event)}>
          Brand: <input onChange={(event) => this.handleChange("brand", event)}/>
          Model: <input onChange={(event) => this.handleChange("model", event)}/>
          Price: <input onChange={(event) => this.handleChange("price", event)}/>
          Color: <input onChange={(event) => this.handleChange("color", event)}/>
          Year: <input onChange={(event) => this.handleChange("year", event)}/>
          Mileage: <input onChange={(event) => this.handleChange("mileage", event)}/>
          Description: <input onChange={(event) => this.handleChange("description", event)}/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}