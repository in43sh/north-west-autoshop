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
      cars : []
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

  render() {
    const listOfCars = this.state.cars.map((car, index) => {
      return (
        <Link to={`/car/${ car._id }`} key={index}>
          <div id="box">
            <div className="container" id="car">
              <div className="row">
                <div className="col-md-12" id="top" >
                  <h1 id="title">{car.year} {car.brand} {car.model}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  {car.photos.length === 0 && <img src={aws} alt="part" id="photo" className="photos"/>} 
                  {car.photos.length>0 && <img src={car.photos[0]} alt="part" id="photo" className="photos"/>}
                </div>
                <div className="col-md-4">
                  <p id="model">Mileage: {car.mileage} Color: {car.color}</p>
                  <p id="condition">{car.description}</p>
                </div>
                <div className="col-md-4">
                  <p id="price">${car.price}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
        
        // <div class="col-md-3 car-cont" key={index}>
        //   <figure class="card card-product">
        //     <div class="img-wrap"> 
        //       <img src={aws} alt="part" id="photo" />
        //       <Link to={`/car/${ car._id }`}><i class="fa fa-search-plus"></i> Quick view</Link>
        //     </div>
        //     <figcaption class="info-wrap">
        //       <h6 class="title text-dots"><a href="#">{car.year} {car.brand} {car.model}</a></h6>
        //       <div class="action-wrap">
        //         <div class="price-wrap h5">
        //           <span> Mileage: {car.mileage}</span>
        //           <span class="price-new"> ${car.price}</span>
        //         </div> 
        //       </div> 
        //     </figcaption>
        //   </figure> 
        // </div> 


        // <div class="col-md-3 car-cont" key={index}>
        //    <figure class="card card-product">
        //       <div class="producttitle"><h3>{car.year} {car.brand} {car.model}</h3></div>

        //       {!car.photo && <img src={aws} class="img-responsive" />}
        //       {car.photo && <img src={car.photo[0]} class="img-responsive" />}
        //       <div class="productprice"><div class="pull-right"><Link to={`/car/${ car._id }`}><button class="btn btn-danger btn-sm" role="button">View</button></Link></div><div class="pricetext">${car.price}</div></div>
        //     </figure> 
        // </div>
        
        

      )})

    return (
      <div id="body_list_cars">
        < Navbar />
          <div className="parts-main-container">
            <h1 id="page_title">List of Cars</h1>
              <div id="main2">
                { listOfCars }
              </div>
          </div>
      </div>
    );
  }
}