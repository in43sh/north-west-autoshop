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
      search: false,
      inputSearch: {
        brand: '',
        model: '',
        yearMin: 0,
        yearMax: Number.MAX_VALUE,
        priceMin: 0,
        priceMax: Number.MAX_VALUE, 
      },
      listOfModels: []
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
  inputChange(target, event){
    event.preventDefault();
    console.log(event.target.value);
  }
  searchSubmit(){
    
  }
  searchFilterByBrand(brand){
    var cars = [];
    this.state.cars.forEach(function(car){
      if(car.brand===brand){
        cars.push(car)
      }
    })
    console.log(cars);
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
                        {car.photos.length === 0 && <img src={aws} alt="part" className="photos"/>} 
                        {car.photos.length>0 && <img src={car.photos[0]} alt="part" className="photos"/>}
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
        )
      })
    }else{
      listOfCars = ``
    }
    var listOfBrands = [];
    this.state.cars.forEach(function(car){
      listOfBrands.push(car.brand)
    })
    listOfBrands = listOfBrands.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
      }).sort().map((b, index) => {
        return (
          <option key={index}>{b}</option>
        )
    })
    
    

    return (
      <div id="body_list_cars">
        < Navbar />
        <div className="parts-main-container">
          <h1 id="page_title">List of Cars</h1>
          <div className="container">
            <div id="searchBox" className="col-sm-3">
              <label className="switch">
                <input type="checkbox" onClick={() => this.searchClicked()} />
                <span className="slider"></span>
              </label>
              <h4 className="switch">Search</h4>
            </div>
            {this.state.search && <div className="col-sm-3 searchBoxButtons">
              <button className="btn btn-primary" onClick={() => this.searchSubmit()}>Search</button>
              <button className="btn btn-primary" onClick={console.log("sdd")}>Reset</button>
              </div>
              }
          </div>
          {this.state.search && <div className="container" id="searchInput">
              <div className="row">
                <div className="col-sm-6">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Brand:</span></div>
                    <select className="form-control" onChange={event => this.searchFilterByBrand(event.target.value)}>
                      <option>All</option>
                      {listOfBrands}
                    </select>
                  </div>
                </div>
              
                <div className="col-sm-6">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Model:</span></div>
                    <select className="form-control">
                      <option value="all">All</option>
                      <option vale=''>asd</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Model Year:</span></div>
                    <input type='number'  className='form-control' placeholder="Min year"/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Model Year:</span></div>
                    <input type='number'  className='form-control' placeholder="Min year"/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Lowest Price:</span></div>
                    <input type='number'  className='form-control' placeholder="Min $"/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Highest Price:</span></div>
                    <input type='number' className='form-control' placeholder="Max $"/>
                  </div>
                </div>
              </div>
            </div>
        }
          <div id="main2">
            {listOfCars}
          </div>
          {this.state.cars.length < 1 && <div className="row text-center margin-b-40 emptyCars">
            <div className="col-sm-6 col-sm-offset-3 emptyCars-box">
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