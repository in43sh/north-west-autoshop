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

        <div id="box" key={index}>
          <div class="container">
              <div class="row">
                  <div class="col-md-12" id="top" >
                      <h1 id="title">{ part.title }</h1>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-4"><img src={aws} alt="part" id="photo"></img></div>
                  <div class="col-md-4">
                      <p id="model">{ part.year } { part.brand } { part.model }</p>
                      <p id="condition">Condition: { part.condition} </p>
                  </div>
                  <div class="col-md-4">
                      <p id="price">${ part.price }</p>
                  </div>
              </div>
            </div>
          </div>
      )})


    return (
      <div className="parts-main-container">
        <h1>List of parts</h1>
        { listOfParts }
      </div>
    );
  }
}