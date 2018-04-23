import React, { Component } from 'react';
import axios from 'axios';
import './Contact.css';

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
        <form className="contact-form" onSubmit={(event) => this.handleSubmit(event)}>
          <h1 className="block-title">Contact us</h1>
          <div className="contact-input-container">
            <input className="contact-input round-border" onChange={(event) => this.handleChange("name", event)}/>
          </div>
          <div className="contact-input-container">
            <input className="contact-input round-border" onChange={(event) => this.handleChange("phone", event)} />
          </div>
          <div className="contact-input-container">
            <input className="contact-input round-border" onChange={(event) => this.handleChange("message", event)} />
          </div>
          <input className="contact-button round-border" value="Send" type="submit" />
        </form>
      </div>
    );
  }
}