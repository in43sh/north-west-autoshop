import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css';
import AddNewCar from './AddNewCar/AddNewCar';
import AddNewPart from './AddNewPart/AddNewPart';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/ducks/reducer';
import aws from "../images/aws.png"
import Navbar from "./../Navbar/Navbar"
import Uploader from "./../Uploader/Uploader";
import {savePhotos, getPhotos} from './../../redux/ducks/reducer';
import Dropzone from 'react-dropzone';
import superagent  from 'superagent';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      cars: [],
      parts: [],
      temp_id: '',
      title: "",
      brand: "",
      model: "",
      price: "",
      condition: "",
      year: "",
      description: "",
      mileage: "",
      photos: [],
      files: [],
      car_container: []
    };
  }

  componentDidMount() {
    axios.get('/user/data')
    .then(response => {
      // console.log(response);
      if (response.data.user) {
        this.props.login(response.data.user);
      }
    })
    .catch(error => console.log(error))
  }

  componentWillMount() {
    console.log(window.location);
    axios.all([
      axios.get(`/requests/all`),
      axios.get(`/cars/all`),
      axios.get(`/parts/all`)
    ]).then(axios.spread((requests, cars, parts) => {
      this.setState({
        requests: requests.data,
        cars: cars.data,
        parts: parts.data
      })
      // console.log('requests ', this.state.requests);
      // console.log('cars ', this.state.cars);
      // console.log('parts ', this.state.parts);
    })).catch(err => console.log(err));

    // console.log("componentDidMount",this.state);
  }

  handleRequestDelete(i) {
    axios.post('/requests/delete', { i })
      .then(res => {
        // console.log(res);
        if (res.data) {
          axios.get('/requests/all')
            .then(res => {
              // console.log(res);
              this.setState({ requests: res.data })
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }
  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value });
    // console.log("handleChange",this.state);
  }
  clearState() {
    this.setState({ temp_id: "", brand: "", title: "", model: "", year: "", condition: "", price: "", description: "", mileage: "", photos: [] })
    // console.log("clearState",this.state);
  }
  // Cars functions
  edit_car(car) {
    if (this.state.temp_id === car._id) {
      this.clearState();
    } else {
      this.setState({
        temp_id: car._id,
        brand: car.brand,
        model: car.model,
        year: car.year,
        price: car.price,
        description: car.description,
        mileage: car.mileage,
        photos: car.photos
      })
    }
    
    // console.log("edit_car",this.state);

  }
  edit_car_submit(event) {
    event.preventDefault();
    let {
      temp_id, brand, model, price,  year, description, mileage, photos
    } = this.state;
    axios
      .post("/cars/edit", {
        temp_id, brand, model, price, year, description, mileage, photos
      })
      .then(response => {
        // console.log(response);
        if (response.data) {
          // console.log("the car was updated");
        } else {
          // console.log("can't update this car")
        }
      })
      .catch(error => console.log("BLYAAAD'", error));
    this.edit_car_cancel();
    // console.log("edit_car_submit",this.state);
  }
  // LOCAL UPLOADER FOR CARS ---------------------------
  onDrop = (photo) => {
    this.edit_car(this.state.car_container); //since onDrop() function clears form, thereby the current this.state values, I found a way to keep track of the current car._id
    var tempArr = this.state.files;
    tempArr.push(photo[0]);
    this.setState({
        files: tempArr  // here we store pics in this.state
    })

  }

    upload(){
        var tempArr = [];
        for(let i = 0; i<this.state.files.length; i++){
            superagent
                .post('/api/upload')
                .attach('item', this.state.files[i]) 
                .end((error, response) => {
                    tempArr.push(response.text)
                    console.log(tempArr);
                    if (error) console.log(error);
                    console.log('File Uploaded Succesfully'); // Just taking all pics from this.state.files and send them on the back-end and then to s3
                })                                            // and getting back urls to those pics
        }
        this.setState({
          photos: tempArr                                     // Storing those urls and later on it'll go for a specific car in this.edit_car_submit()
        })
    }

  delete = (element) => {
    //   console.log(element.name);
      var tempArr = this.state.files;
       for(let i = 0; i<tempArr.length; i++){
           if(tempArr[i].name === element.name){
               for(let k = i; k<tempArr.length-1; k++){
                   tempArr[k] = tempArr[k+1]
               }
               tempArr.pop()
               break;
           }
       }
       this.setState({
           files: tempArr
       })
  }




  // ---------------------------------------------------
  edit_car_cancel() {
    this.clearState();  // canceling editor and clearing this.state
  }
  update_list_of_cars() {
    axios.get('/cars/all')
      .then(res => {
        this.setState({ cars: res.data })
      })
      .catch(error => console.log(error));
  }
  handleCarDelete(i) {
    var id = {
      id: i
    }
    axios.post('/cars/delete', id)
      .then(res => {
        if (res.data) {
          this.update_list_of_cars();
        } else {
          console.log("can't delete this car")
        }
      })
      .catch(error => console.log(error));
  }
  // end of cars functions

  // Parts functions
  edit_part(part) {
    if (this.state.temp_id === part._id) {
      this.clearState();
    } else {
      this.setState({
        temp_id: part._id,
        brand: part.brand,
        title: part.title,
        model: part.model,
        year: part.year,
        condition: part.condition,
        price: part.price,
        description: part.description
      })
    }

  }
  edit_part_submit(event) {
    event.preventDefault();
    let {
      temp_id, title, brand, model, price, condition, year, description
    } = this.state;
    axios
      .post("/parts/edit", {
        temp_id, title, brand, model, price, condition, year, description
      })
      .then(response => {
        // console.log(response);
        if (response.data) {
          // console.log("the part was updated");
        } else {
          console.log("can't update this part")
        }
      })
      .catch(error => console.log("BLYAAAD'", error));
    this.edit_part_cancel();
  }

  edit_part_cancel() {
    this.clearState();
  }

  handlePartDelete(i) {
    var id = {
      id: i
    }
    axios.post('/parts/delete', id)
      .then(res => {
        if (res.data) {
          // console.log("the part was deleted");
          axios.get('/parts/all')
            .then(res => {
              console.log(res);
              this.setState({ parts: res.data })
            })
            .catch(error => console.log(error));
        } else {
          console.log("can't delete this part")
        }
      })
      .catch(error => console.log(error));
  }
  logout() {
    console.log(this.state)
    axios.post('/user/logout')
      .then(response => {
        console.log('you are out');
        this.props.login(null)
        // console.log(this.state.propsi, " --------");
        this.props.history.push('/login');
        console.log('you are logged out')
      })
      .catch(error => {
        console.log(error)
      })
  }
  displayState(){
    console.log(this.state);
  }
  deletePhoto(id, element){
    console.log(id, element);
    var tempArr = this.state.photos;
    for(let i = 0; i< tempArr.length; i++){
      if(tempArr[i] === element){
        for(let k = i; k < tempArr.length-1; k++){
          tempArr[k] = tempArr[k+1]
        }
        tempArr.pop();
        break;
      }
    }
    this.setState({
      photos: tempArr
    })
    console.log(this.state.photos);
    const url = element.split('/');
    const fileName = url[url.length-1];
    axios.delete(`/api/delete/${fileName}`)
    .then( res => {
        console.log(element, "is deleted");
    }).catch(err => console.log(err));
  }
  // end of parts functions
  checkState(){              // Dev function.
    console.log(this.state); // Just checking this.state. Should be removed before releasing the final version
  }
  store_car(car){
    this.setState({      // Manually storing a current car.
      car_container: car // Yep, that's hardcode, baby!
    })                   // The only way to avoid loosing this.state ...
  }


  render() {
    const { user } = this.props;
    //console.log(user);
    const listOfRequests = this.state.requests.map(request => (
      <div className="admin-requests-container" key={request._id}>
        <div>Name: {request.name}</div>
        <div>Phone: {request.phone}</div>
        <div>Message: {request.message}</div>
        <button className="btn btn-danger" onClick={() => this.handleRequestDelete(request._id)}>Delete</button>
      </div>
    ));

    const listOfCars = this.state.cars.map((car, index) => (

      <div className="col-md-3 car-cont" key={index}>
        <figure className="card card-product">
          <figcaption className="info-wrap">
            <div className="action-wrap">
              <div id="switcher">
                <label className="switch">
                  <input type="checkbox" id="part_edit_switcher" checked={this.state.temp_id === car._id} onClick={() => this.edit_car(car)} />
                  <span className="slider"></span>
                </label>
                Edit
                           </div>
              <form onSubmit={(event) => this.edit_car_submit(event)}>
                <label>Brand : </label><input type='text' className='form-control' onChange={event => this.handleChange("brand", event)} placeholder="Brand" defaultValue={car.brand} disabled={this.state.temp_id !== car._id} />
                <label>Model : </label><input type='text' className='form-control' onChange={event => this.handleChange("model", event)} placeholder="Model" defaultValue={car.model} disabled={this.state.temp_id !== car._id} />
                <label>Price : </label><input type='text' className='form-control' onChange={event => this.handleChange("price", event)} placeholder="Price" defaultValue={car.price} disabled={this.state.temp_id !== car._id} />
                <label>Year :</label><input type='text' className='form-control' onChange={event => this.handleChange("year", event)} placeholder="Year" defaultValue={car.year} disabled={this.state.temp_id !== car._id} />
                <label>Mileage :</label><input type='text' className='form-control' onChange={event => this.handleChange("mileage", event)} placeholder="Mileage" defaultValue={car.mileage} disabled={this.state.temp_id !== car._id} />
                <label>Description :</label><textarea type='text' className='form-control' onChange={event => this.handleChange("description", event)} placeholder="Description" defaultValue={car.description} rows="7" disabled={this.state.temp_id !== car._id} />
                <ul>  {car.photos && car.photos.length>0 && car.photos.map((e, i) => <li key={i}><img src={e} className="prevImg" />
                            <button type="button" className="btn btn-danger btn-xs" onClick={() => this.deletePhoto(car._id, e)} disabled={this.state.temp_id !== car._id}>Remove</button>
                            </li>) }
                              
                        </ul>
                        <div>
                <div>
                    <div className="uploader">
                    {/* this.onDrop */}
                        <Dropzone className="dropzone" onClick={() => this.store_car(car)} onDrop={ this.onDrop } multiple={true} disabled={this.state.temp_id !== car._id}> 
                            <button className="btn btn-warning" disabled={this.state.temp_id !== car._id} onClick={() => this.edit_car(car._id)}>+</button>
                        </Dropzone>
                        <h4>Chosen photos</h4>
                        <ul>
                            {this.temp_id === car._id && this.state.files.length>0 && this.state.files.map((e, i) => <li key={i}>{e.name} - {e.size} bytes <img src={e.preview} className="prevImg" />
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => this.delete(e)} disabled={this.state.temp_id !== car._id}>Remove</button>
                            </li>) }
                        </ul>
                    </div>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => this.upload()} disabled={this.state.temp_id !== car._id}>Upload (click here first before Submit)</button>
                    
                </div>
                { this.state.image && <img src={this.state.image.image_url} alt="pic"/> }
            </div>        
                        
                <button className="btn btn-danger" onClick={() => this.handleCarDelete(car._id)} disabled={this.state.temp_id !== car._id}>Delete</button>
                <input type="submit" id="submit" name="submit" className="btn btn-primary pull-right" disabled={this.state.temp_id !== car._id} />
              </form>
            </div>
          </figcaption>
        </figure>
      </div>
    ));

    const listOfParts = this.state.parts.map((part, index) => (
      
      <div className="col-md-3 car-cont" key={index}>
        <figure className="card card-product">
          <figcaption className="info-wrap">
            <div className="action-wrap">
              <div id="switcher">
                <label className="switch">
                  <input type="checkbox" id="part_edit_switcher" checked={this.state.temp_id === part._id} onClick={() => this.edit_part(part)} />
                  <span className="slider"></span>
                </label>
                Edit
              </div>
              <form onSubmit={(event) => this.edit_part_submit(event)}>
                <label>Title : </label><input type='text' className='form-control' onChange={event => this.handleChange("title", event)} placeholder="Title" defaultValue={part.title} disabled={this.state.temp_id !== part._id} />
                <label>Brand : </label><input type='text' className='form-control' onChange={event => this.handleChange("brand", event)} placeholder="Brand" defaultValue={part.brand} disabled={this.state.temp_id !== part._id} />
                <label>Model : </label><input type='text' className='form-control' onChange={event => this.handleChange("model", event)} placeholder="Model" defaultValue={part.model} disabled={this.state.temp_id !== part._id} />
                <label>Price : </label><input type='text' className='form-control' onChange={event => this.handleChange("price", event)} placeholder="Price" defaultValue={part.price} disabled={this.state.temp_id !== part._id} />
                <label>Condition :</label><input type='text' className='form-control' onChange={event => this.handleChange("condition", event)} placeholder="Condition" defaultValue={part.condition} disabled={this.state.temp_id !== part._id} />
                <label>Year :</label><input type='text' className='form-control' onChange={event => this.handleChange("year", event)} placeholder="Year" defaultValue={part.year} disabled={this.state.temp_id !== part._id} />
                <label>Description :</label><textarea type='text' className='form-control' onChange={event => this.handleChange("description", event)} placeholder="Description" defaultValue={part.description} rows="7" disabled={this.state.temp_id !==part._id} />
                <button className="btn btn-danger" onClick={() => this.handlePartDelete(part._id)} disabled={this.state.temp_id !== part._id}>Delete</button>
                
                <input type="submit" id="submit" name="submit" className="btn btn-primary pull-right" disabled={this.state.temp_id !== part._id} />
              </form>
            </div>
          </figcaption>
        </figure>
      </div>
    ));

    return (
      <div>
        < Navbar />
        <button onClick={ () => this.checkState() }>CHEACK STATE</button>
        <div className="admin-main-container">
          {user && <div>
            <button onClick={ () => this.logout() }>Log out</button>
            <h1>Admin</h1>
            <h2>Requests</h2>
            {listOfRequests}
            <h2>Cars</h2>
            <div id="list_of_parts">
              {listOfCars}
            </div>
            <AddNewCar />
            <h2>Parts</h2>
            <div id="list_of_parts">
              {listOfParts}
            </div>
            <AddNewPart />
          </div>}
          {!user && <div className="you-must-log-in-div"><p>You must log in! <Link to="/login">Log in</Link></p></div>}

          </div>
        </div> 
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    getPhotos: getPhotos,
    savePhotos: savePhotos
  };
};

const mapDispatchToProps = {
  login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
