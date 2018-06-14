import React, { Component } from 'react';
import './Popup.css';

export default class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <h1>Your request has been sent. Thank you!</h1>
        <button onClick={this.props.closePopup}>OK</button>
      </div>
    );
  }
}