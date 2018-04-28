import React, { Component } from 'react';
import './Top.css';
import { Link } from 'react-router-dom';
import aws from '../images/aws.png';
import parts from "../images/100816-cc-upcycle-your-recycling-with-great-ideas-for-old-car-parts-1.jpg";
import repair from "../images/Car-Engine-Maintenance-cropped_iStock.png";
import cars from "../images/Carr Parking Gl .jpg"
import "./Footer-Dark.css";
import "./Map-Clean.css";
import "./Projects-Clean.css";
import "./styles.css";

export default class Top extends Component {
  render() {
    return (
      // <div className="top-main-container">
      //   <div className="top-intro round-border">
      //     <h2>North West European Auto Recycle</h2>
      //     <p>One of the best maintenace shop in Seattle. We are focused on european brands such as Volvo, Saab, BWM, Mercedes, and Audi. Affortable prices guarantee.</p>
      //   </div>

      //   <div className="top-menu">
      //     <div className="top-menu-option round-border">Repair/Maintenance </div> 
      //     <Link className="links" to="/cars">
      //       <div className="top-menu-option round-border">Used Cars </div>
      //     </Link>
      //     <Link className="links" to="/parts">
      //       <div className="top-menu-option round-border">Parts </div>
      //     </Link>
      //   </div>
      // </div>
      <div>
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css"></link>
            <div class="projects-clean">
              <div class="container">
                  <div class="intro">
                      <h2 class="text-center">North West European Auto Recycle</h2>
                      <p class="text-center" style={{color: "black"}}>One of the best maintenace shop in Seattle. We are focused on european brands such as Volvo, Saab, BWM, Mercedes, and Audi. Affortable prices guarantee.</p>
                  </div>
                  <div class="row justify-content-center align-items-center projects">
                      <div class="col-sm-6 col-lg-4 item" style={{color: "black"}}><img class="img-fluid" src={ repair}></img>
                          <h3 class="name">Repair/Maintenance</h3>
                          <p class="description" style={{color: "black"}}>We provide a large spectrum of car service</p>
                      </div>

                      <Link className="links" to="/cars">
                        <div class="col-sm-6 col-lg-4 item"><img class="img-fluid" src={ cars } ></img>
                            <h3 class="name">Used Cars</h3>
                            <p class="description" style={{color: "black"}}>Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.</p>
                        </div>  
                      </Link>

                      <Link className="links" to="/parts"><div class="col-sm-6 col-lg-4 item"><img class="img-fluid" src={ parts }></img>
                          <h3 class="name">Parts</h3>
                          <p class="description" style={{color: "black"}}>Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.</p>
                      </div></Link>
                  </div>
              </div>
          </div>
          <div class="map-clean">
              <div class="container">
                  <div class="intro">
                      <h2 class="text-center">Location </h2>
                      <p class="text-center" style={{ color: "black" }}>We are located in Ballard, Seattle at 1440 NW Leary Way, Seattle, WA 98107</p>
                  </div>
              </div><iframe allowfullscreen="" frameborder="0" width="100%" height="450" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD5rAb7taP3tCOkMKQqVV6ixNhp_iSLsGA&amp;q=1440+NW+Leary+Way%2C+Seattle%2C+WA+98107&amp;zoom=15"></iframe></div>
      </div>
      

    );
  }
}