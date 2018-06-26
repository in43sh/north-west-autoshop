import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "../../Navbar/Navbar";
import Slider from 'react-slick';
// import { Link } from 'react-router-dom';
import "./OneCar.css";
import aws from '../../images/aws.png'

export default class OneCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car: {},
      photos: []
    };
  }

  componentWillMount(){
    // console.log("ONE CAR!")
    let id = {
      _id: this.props.match.params._id
    }
    axios.post('/cars/find/', id)
      .then(res => {
        this.setState({ car: res.data, photos: res.data.photos })
        console.log(this.state.car);
        console.log(this.state.car.photos);
      })
      .catch(error => console.log(error));
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 1700,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3700, // Delay between each auto scroll
      pauseOnHover: true
    };

    const display = this.state.photos
    .map((element, index) => {
      return (
        <div key={ index }>
          <div className="slider-container">
          <img className="slider-container-img" src={ element } alt="hui"/>
          </div>
        </div>
      )
    })

    return (
      <div>
        < Navbar />
        <div id="main">
          <div id="oneCar">
            <div className="container" id="car">
              <div className="row">
                <div className="col-md-12" id="top" >
                  <h1 id="title">{this.state.car.year} {this.state.car.brand} {this.state.car.model}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 slider-parent-container">
                  {this.state.photos.length===0 && <img src={aws} alt="part" className="photos"/>}
                  {this.state.car.photos && <Slider className="slider-component" {...settings}>
                    { display }
                    </Slider> }
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <p id="model">Mileage: {this.state.car.mileage} Color: {this.state.car.color}</p>
                  <p id="condition">{this.state.car.description}</p>
                </div>
                <div className="col-md-5">
                  <p id="price">${this.state.car.price}</p>
                </div>
              </div>
                
            </div>
          </div>
        </div>
      </div>
    );
  }
}
