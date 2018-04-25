import React, { Component } from 'react';
import axios from 'axios';
import './AddNewPart.css';

export default class AddNewPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      model: '',
      price: '',
      condition: '',
      year: '',
      description: ''
    }
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    let { brand, model, price, condition, year, description } = this.state;
    axios.post('/parts/new', { brand, model, price, condition, year, description })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="addnewpart-container">
        <form className="addnewpart-form" onSubmit={(event) => this.handleSubmit(event)}>
          Brand: <input onChange={(event) => this.handleChange("brand", event)}/>
          Model: <input onChange={(event) => this.handleChange("model", event)}/>
          Price: <input onChange={(event) => this.handleChange("price", event)}/>
          Condition: <input onChange={(event) => this.handleChange("condition", event)}/>
          Year: <input onChange={(event) => this.handleChange("year", event)}/>
          Description: <input onChange={(event) => this.handleChange("description", event)}/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}