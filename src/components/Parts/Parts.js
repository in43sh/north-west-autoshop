import React, { Component } from 'react';
import axios from 'axios';
import aws from '../images/aws.png';

import './Parts.css';

export default class Parts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parts : []
    };
  }


  componentWillMount(){
    axios.get('/parts/all')
      .then(res => {
        console.log(res);
        this.setState({ parts: res.data })
      })
      .catch(error => console.log(error));
  }


  render() {
    const listOfParts = this.state.parts.map((part, index) => {
      return (
        <div className="parts-item-container" key={index}>
          <img className="parts-img" src={aws} alt="part"/>
          <p>{ part.model }</p>
        </div>
      )})


    return (
      <div className="parts-main-container">
        <h1>SUKA PARTS</h1>
        { listOfParts }
      </div>
    );
  }
}