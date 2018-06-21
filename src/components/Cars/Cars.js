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
        brand: null,
        model: null,
        yearMin: 0,
        yearMax: Number.MAX_VALUE,
        priceMin: 0,
        priceMax: Number.MAX_VALUE,
        listOfModels: []
      },
      copyCars: [],
      filterResult: true,
      filterShowself: true
    };
  }
  
  componentWillMount(){
    axios.get('/cars/all')
      .then(res => {
        console.log(res);
        this.setState({ cars: res.data, copyCars: res.data })
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
    var copyCars = this.state.copyCars;
    var resultCars = [];
    var searchOptions = this.state.inputSearch;
    copyCars.forEach(function(car){
      if(searchOptions.brand !== null){
        if(car.brand === searchOptions.brand){
          if(searchOptions.model !== null){
            if(car.model === searchOptions.model){
              if(car.year>=searchOptions.yearMin && car.year<=searchOptions.yearMax && car.price>=searchOptions.priceMin && car.price<=searchOptions.priceMax){
                resultCars.push(car)
              }
            }
          }else if(car.year>=searchOptions.yearMin && car.year<=searchOptions.yearMax && car.price>=searchOptions.priceMin && car.price<=searchOptions.priceMax){
            resultCars.push(car);
          }
        }
      }else{
        if(car.year>=searchOptions.yearMin && car.year<=searchOptions.yearMax && car.price>=searchOptions.priceMin && car.price<=searchOptions.priceMax){
          resultCars.push(car);
        }
      }
    })
    var result_bool;
    if(resultCars.length<1){
      result_bool = false;
    }else{
      result_bool = true;
    }
    this.setState({
      cars: resultCars,
      filterResult: result_bool
    })

  }
  searchCancel(){
    this.setState({
      cars: this.state.copyCars,
      filterResult: true,
      filterShowself: false
    }, function(){
      this.setState({
        filterShowself: true
      })
    })

    
  }
  searchFilterByBrand(brand){
    if(brand==="All"){
      var tempSearch = this.state.inputSearch;
      tempSearch.brand = null;
      tempSearch.cars = [];
      tempSearch.listOfModels = [];
      this.setState({
        inputChange: tempSearch //ATTENTION! MIGHT BE A MISTAKE!
      })
      return;
    }
    var cars = [];
    var temp = this.state.inputSearch;
    temp.brand = brand;
    this.state.copyCars.forEach(function(car){
      if(car.brand===brand){
        cars.push(car)
      }
    })
    var tempModels = cars.filter(function (item, pos, self) {
      return self.indexOf(item) === pos;
    }).sort().map((c, index) => {
      return (
        <option key={index}>{c.model}</option>
      )
    })
    temp.listOfModels = tempModels;
    this.setState({
      inputSearch: temp
    })
  }

  changeState(x,y,val){
    var temp = this.state[x];
    if(y){
      temp[y] = val;
    }else{
      temp = val;
    }
    this.setState({
      x: temp
    })
    // console.log(this.state);
    // console.log(this.state.inputSearch.yearMax-this.state.inputSearch.yearMin)
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
                          <p id="model">{ car.mileage } miles, Color: { car.color }</p>
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
    this.state.copyCars.forEach(function(car){
      listOfBrands.push(car.brand)
    })
    listOfBrands = listOfBrands.filter(function(item, pos, self) {
        return self.indexOf(item) === pos;
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
              <h3 className="switch">Filter</h3>
            </div>
            {this.state.search && <div className="col-sm-3 searchBoxButtons">
              <button className="btn btn-primary" onClick={() => this.searchSubmit()}>Search</button>
              <button className="btn btn-danger" onClick={() => this.searchCancel()}>Reset</button>
              </div>
              }
          </div>
          {this.state.search && this.state.filterShowself && <div className="container" id="searchInput">
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
                    <select className="form-control" disabled={this.state.inputSearch.listOfModels.length===0}>
                      <option value="all">All</option>
                        {this.state.inputSearch.listOfModels}
                    </select>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Model Year:</span></div>
                    <input type='number' className='form-control' placeholder="Min year"
                      min={this.state.inputSearch.yearMin} max={this.state.inputSearch.yearMax}
                      onChange={event => this.changeState("inputSearch", 'yearMin', Number(event.target.value))} />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <input type='number'  className='form-control' placeholder="Max year" onChange={event => this.changeState("inputSearch", 'yearMax', Number(event.target.value))}/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Lowest Price:</span></div>
                    <input type='number'  className='form-control' placeholder="Min $" onChange={event => this.changeState("inputSearch", 'priceMin', Number(event.target.value))}/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Highest Price:</span></div>
                    <input type='number' className='form-control' placeholder="Max $" onChange={event => this.changeState("inputSearch", 'priceMax', Number(event.target.value))}/>
                  </div>
                </div>
              </div>
            </div>
        }
          <div id="main2">
            {listOfCars}
          </div>
          {this.state.cars.length < 1 && this.state.filterResult && <div className="row text-center margin-b-40 emptyCars">
            <div className="col-sm-6 col-sm-offset-3 emptyCars-box">
              <h1>Sorry, we have nothing to sell at the moment</h1>
              <h4>Please, come back later to check new offers!</h4>
            </div>
          </div>
          }
          {!this.state.filterResult && <div className="row text-center margin-b-40 emptyCars">
          <div className="col-sm-6 col-sm-offset-3 emptyCars-box">
             <h1>Sorry, we have nothing according filter settings</h1>
             <h4>Please, come back later to check new offers!</h4>
           </div>
         </div>
           }          
        </div>
      </div>
    );
  }
}