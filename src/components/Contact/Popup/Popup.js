import React, { Component } from 'react';
import './Popup.css';

export default class Popup extends Component {
  render() {
    return (
      <div className="popup">
        Your request has been sent. Thank you!
        <button onClick={this.props.closePopup}>OK</button>
      </div>
    );
  }
}