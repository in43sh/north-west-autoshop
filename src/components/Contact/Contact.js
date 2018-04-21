import React, { Component } from 'react';
import axios from 'axios';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      message: ''
    }
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    let { name, phone, message } = this.state;
    console.log(name, phone, message);

    axios.post('/requests/new', { name, phone, message })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="contact-main-container">
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <h1>Contact us</h1>
          <input onChange={(event) => this.handleChange("name", event)}/>
          <input onChange={(event) => this.handleChange("phone", event)} />
          <input onChange={(event) => this.handleChange("message", event)} />
          <input type="submit"/>
        </form>
      </div>
    );
  }
}