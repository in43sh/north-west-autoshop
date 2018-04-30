import React, { Component } from 'react';
import axios from 'axios';
// import aws from "../images/aws.png";
export default class OneCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car: {}
    };

  }

  componentWillMount(){
    console.log("ONE CAR!")
    console.log("--------")
    console.log(this.props.match.params._id)
    let id = {
      _id: this.props.match.params._id
    }
    axios.post('/cars/find/', id)
      .then(res => {
        var temp = res.data;
        //console.log("resopnse",temp);
        this.setState({ car: temp })
        
        console.log(this.state.car);
        
      })
      .catch(error => console.log(error));
  }
  render() {
    
    return (
      <div>
        <h1>{this.state.car.year} {this.state.car.brand} {this.state.car.model}</h1>
      </div>
    );
  }
}
