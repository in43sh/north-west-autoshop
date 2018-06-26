import React, { Component } from 'react';
import axios from 'axios';
import aws from '../images/aws.png';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
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
    let listOfParts = null;
    if(this.state.parts.length>0){
      listOfParts = this.state.parts.map((part, index) => {
        return (
          <Link to={`/part/${ part._id }`} key={index}>
            <div>
              <div id="box" key={index}>
                <div className="container" id="part">
                  <div className="row">
                      <div className="col-md-12" id="top" >
                          <h1 id="title">{ part.title }</h1>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-4">
                        {part.photos.length === 0 && <img src={aws} alt="part" id="photo" className="photos" />}
                        {part.photos.length > 0 && <img src={part.photos[0]} alt="part" id="photo" className="photos" />}
                      </div>
                      <div className="col-md-4">
                          <p id="model">{ part.year } { part.brand } { part.model }</p>
                          <p id="condition">Condition: { part.condition} </p>
                      </div>
                      <div className="col-md-4">
                          <p id="price">${ part.price }</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )})
      } else {
        listOfParts = '';
      }
    
    return (
      <div>
      < Navbar />
      <div className="parts-main-container" id="main">
        <h1 id="list_name">List of parts</h1>
        { listOfParts }
        {this.state.parts.length < 1 && <div class="row text-center margin-b-40 emptyParts">
               <div class="col-sm-6 col-sm-offset-3 emptyParts-box">
                  <h1>Sorry, we have nothing to sell at the moment</h1>
                  <h4>Please, come back later to check new offers!</h4>
                </div>
              </div>
                }
      </div>
      </div>
    );
  }
}