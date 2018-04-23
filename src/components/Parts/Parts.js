import React, { Component } from 'react';
import axios from 'axios';

export default class Parts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parts : []
    };
  }
  
  // componentWillMount(){
  //   console.log("one")
  //   axios.get("/parts/all", function(data, err){
  //     console.log("two")
  //     if(data){
  //       console.log(data)
  //       this.state.parts = data;
  //     }else{
  //       console.log(err)
  //     }
  //   })
  // }

  componentWillMount(){
    axios.get('/parts/all')
      .then(res => {
        //console.log(res);
        var myArr = [];
        myArr.push(res.data[0]);
        this.test(myArr)
        this.setState({ parts: this.test(myArr) })
      })
      .catch(error => console.log(error));

  }
  test(arr){
    let res = [];
    for(let i = 0; i < arr.length; i++){
      res.push(arr[i])
    }
    // console.log(res)
    return res
  }


  render() {
    const listOfParts = this.state.parts.map((part, index) => {
      return (
        <div key={index}>
        <p>{part.name}</p>
        <p>{part._id}</p>
      </div>
      )} )


    return (
      <div>
        <h1>SUKA PARTS</h1>
        { listOfParts }
      </div>
    );
  }
}