import React, { Component } from 'react';
import './Top.css';

export default class Top extends Component {
  render() {
    return (
      <div className="top-main-container">
        <div className="top-intro my-border-radius">
          <h2>North West European Auto Recycle</h2>
          <p>One of the best maintenace shop in Seattle. We are focused on european brands such as Volvo, Saab, BWM, Mercedes, and Audi. Affortable prices guarantee.</p>
        </div>

        <div className="top-menu">
          <div className="top-menu-option my-border-radius">Repair/Maintenance</div>
          <div className="top-menu-option my-border-radius">Used Cars</div>
          <div className="top-menu-option my-border-radius                                                                                                                 ">Parts</div>
        </div>
      </div>
    );
  }
}