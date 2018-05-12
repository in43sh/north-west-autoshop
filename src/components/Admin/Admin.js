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
      pizda: ""
    };
  }


  componentWillMount() {
    axios.get('/user/data')
      .then(response => {
        console.log(response.data);
        if (response.data.user) {
          this.props.login(response.data.user);
        }
      })
      .catch(error => console.log(error))

    console.log("componentWillMount",this.state);
  }

  componentDidMount() {
    console.log('this.props -> ', this.props);
    // this.state.pizda = this.props;
    
    console.log(this.state, "+++++++++++++++++++++++++++++");
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

    console.log("componentDidMount",this.state);
  }

  handleRequestDelete(i) {
    axios.post('/requests/delete', { i })
      .then(res => {
        console.log(res);
        if (res.data) {
          axios.get('/requests/all')
            .then(res => {
              console.log(res);
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
    console.log("handleChange",this.state);
  }
  clearState() {
    this.setState({ temp_id: "", brand: "", title: "", model: "", year: "", condition: "", price: "", description: "", mileage: "" })
    console.log("clearState",this.state);
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
        condition: car.condition,
        price: car.price,
        description: car.description,
        mileage: car.mileage
      })
    }
    console.log("edit_car",this.state);

  }
  edit_car_submit(event) {
    event.preventDefault();
    let {
      temp_id, brand, model, price, condition, year, description, mileage
    } = this.state;
    axios
      .post("/cars/edit", {
        temp_id, brand, model, price, condition, year, description, mileage
      })
      .then(response => {
        console.log(response);
        if (response.data) {
          console.log("the car was updated");
        } else {
          console.log("can't update this car")
        }
      })
      .catch(error => console.log("BLYAAAD'", error));
    this.edit_car_cancel();
    console.log("edit_car_submit",this.state);
  }

  edit_car_cancel() {
    this.clearState();
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
        console.log(response);
        if (response.data) {
          console.log("the part was updated");
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
          console.log("the part was deleted");
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
  // end of parts functions

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
                <label>Condition :</label><input type='text' className='form-control' onChange={event => this.handleChange("condition", event)} placeholder="Condition" defaultValue={car.condition} disabled={this.state.temp_id !== car._id} />
                <label>Year :</label><input type='text' className='form-control' onChange={event => this.handleChange("year", event)} placeholder="Year" defaultValue={car.year} disabled={this.state.temp_id !== car._id} />
                <label>Mileage :</label><input type='text' className='form-control' onChange={event => this.handleChange("mileage", event)} placeholder="Mileage" defaultValue={car.mileage} disabled={this.state.temp_id !== car._id} />
                <label>Description :</label><textarea type='text' className='form-control' onChange={event => this.handleChange("description", event)} placeholder="Description" defaultValue={car.description} rows="7" disabled={this.state.temp_id !== car._id} />
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
    user: state.user
  };
};

const mapDispatchToProps = {
  login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
