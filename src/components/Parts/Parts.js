import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class Parts extends Component {
  constructor(props) {
    super(props);
    this.state ={
      parts : []
    };
  }
  componentWillMount(){
    axios.get("/parts/all", function(data, err){
      if(data){
        console.log(data)
        this.state.parts = data;
      }else{
        console.log(err)
      }
    })
  }
  render() {
    return (
      
      <div>
        <h1>SUKA PARTS</h1>
        { this.state.parts }
      </div>
    );
  }
}