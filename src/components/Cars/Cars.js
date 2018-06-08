import React, { Component } from 'react';
import axios from 'axios';
import aws from '../images/aws.png';
import './Cars.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
export default class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars : [],
      search: false
    };
  }
  
  componentWillMount(){
    axios.get('/cars/all')
      .then(res => {
        console.log(res);
        this.setState({ cars: res.data })
      })
      .catch(error => console.log(error));
  }
  searchClicked(){
    let status = this.state.search;
    this.setState({
      search: !status
    })
  }

  render() {
    var listOfCars
    if(this.state.cars.length>0){
      listOfCars = this.state.cars.map((car, index) => {
        return (
          <Link to={`/car/${ car._id }`} key={index}>
             <div>
              <div id="box" key={index}>
                <div className="container" id="car">
                  <div className="row">
                      <div className="col-md-12" id="top" >
                          <h1 id="title">{ car.year } { car.brand } { car.model } </h1>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-4">
                        {car.photos.length === 0 && <img src={aws} alt="part" id="photo" className="photos"/>} 
                        {car.photos.length>0 && <img src={car.photos[0]} alt="part" id="photo" className="photos"/>}
                      </div>
                      <div className="col-md-4">
                          <p id="model">{ car.mileage } miles, Condition: { car.condition }, Color: { car.color }</p>
                          <p id="condition">{ car.description } </p>
                      </div>
                      <div className="col-md-4">
                          <p id="price">${ car.price }</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )})
    }else{
      listOfCars = ``
      
    }
    

    return (
      <div id="body_list_cars">
        < Navbar />
        <div className="parts-main-container">
          <h1 id="page_title">List of Cars</h1>
          <div className="container">
            <div id="searchBox">
              <label className="switch">
                <input type="checkbox" onClick={() => this.searchClicked()} />
                <span className="slider"></span>
              </label>
              Search
            </div>
          </div>
          {this.state.search && <div className="container" id="searchInput">
            <h1>FILTERS AND SHIET</h1>
          </div>}
          <div id="main2">
            {listOfCars}
          </div>
          {this.state.cars.length < 1 && <div class="row text-center margin-b-40 emptyCars">
            <div class="col-sm-6 col-sm-offset-3 emptyCars-box">
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