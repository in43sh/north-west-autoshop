import React, { Component } from 'react';
import './Top.css';
import { Link } from 'react-router-dom';

export default class Top extends Component {
  render() {
    return (
      <div className="top-main-container">
        <div className="top-intro round-border">
          <h2>North West European Auto Recycle</h2>
          <p>One of the best maintenace shop in Seattle. We are focused on european brands such as Volvo, Saab, BWM, Mercedes, and Audi. Affortable prices guarantee.</p>
        </div>

        <div className="top-menu">
          <div className="top-menu-option round-border">Repair/Maintenance </div> 
          <Link className="links" to="/cars">
            <div className="top-menu-option round-border">Used Cars </div>
          </Link>
          <Link className="links" to="/parts">
            <div className="top-menu-option round-border">Parts </div>
          </Link>
        </div>
      </div>
    );
  }
}