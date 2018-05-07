import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css';
import AddNewCar from './AddNewCar/AddNewCar';
import AddNewPart from './AddNewPart/AddNewPart';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/ducks/reducer';

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
      description: ""
    };
  }

  logout() {
    axios.post('/user/logout')
      .then(response => {
        console.log('you are out');
        this.props.login(null)
        this.props.history.push('/login');
        console.log('you are logged out')
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentWillMount() {
    console.log('this.props -> ', this.props);
    axios.get('/user/data')
      .then(response => {
        console.log(response.data);
      if (response.data.user) {
        this.props.login(response.data.user);
      }
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    axios.all([
      axios.get(`/requests/all`),
      axios.get(`/cars/all`),
      axios.get(`/parts/all`)
    ]).then(axios.spread( (requests, cars, parts) => {
      this.setState({
        requests: requests.data,
        cars: cars.data,
        parts: parts.data
      })
      // console.log('requests ', this.state.requests);
      // console.log('cars ', this.state.cars);
      // console.log('parts ', this.state.parts);
    })).catch(err => console.log(err));
  }

  handleDelete(i) {
    axios.post('/parts/delete', { i })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  }
  handleCarDelete(i) {
    axios.post('/cars/delete', { i })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  }
  handleRequestDelete(i) {
    axios.post('/requests/delete', { i })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  }
  handleChange(property, event) {
    event.preventDefault();
    console.log(event.target.value)
    this.setState({ [property]: event.target.value });
  }

  // Parts functions
  edit_part(part){
    if(this.state.temp_id === part._id){
      this.setState({
        temp_id: "",
        brand: "",
        title: "",
        model: "",
        year: "",
        condition: "",
        price: "",
        description: ""
      })
    }else{
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
  edit_part_submit(event){
    event.preventDefault();
    let {
      temp_id,
      title,
      brand,
      model,
      price,
      condition,
      year,
      description
    } = this.state;
    axios
    .post("/parts/edit", {
      temp_id,
      title,
      brand,
      model,
      price,
      condition,
      year,
      description
    })
    .then(response => {
      console.log(response);
      if(response.data){
        console.log("the part was updated");
      }else{
        console.log("can't update this part")
      }
    })
    .catch(error => console.log("BLYAAAD'",error));
    this.edit_part_cancel();
    
    
  }
  edit_part_cancel(){
    this.setState({
        temp_id: "",
        brand: "",
        title: "",
        model: "",
        year: "",
        condition: "",
        price: "",
        description: ""
    })
  }
  handlePartDelete(i) {
    var id={
      id:i
    }
    axios.post('/parts/delete', id)
      .then(res => {
        if(res.data){
          console.log("the part was deleted");
        }else{
          console.log("can't delete this part")
        }
      })
      .catch(error => console.log(error));
  }
  // end of parts functions

  render() {
    const { user } = this.props;
    //console.log(user);
    const listOfRequests = this.state.requests.map( request => (
      <div className="admin-requests-container" key={request._id}>
        <div>Name: {request.name}</div>
        <div>Phone: {request.phone}</div>
        <div>Message: {request.message}</div>
        <button className="btn btn-danger" onClick={() => this.handleRequestDelete(request._id)}>Delete</button>
      </div>
    ));

    const listOfCars = this.state.cars.map( car => (
      <div className="admin-requests-container" key={car._id} >
        <div>Brand: {car.brand}</div>
        <div>Model: {car.model}</div>
        <div>Price: {car.price}</div>
        <div>Color: {car.color}</div>
        <div>Year: {car.year}</div>
        <div>Description: {car.description}</div>
        <div>Photos: {car.photos}</div>
        <button className="btn btn-danger" onClick={() => this.handleCarDelete(car._id)}>Delete</button>
      </div>
    ));

    const listOfParts = this.state.parts.map((part, index) => (
      <div className="admin-parts-container container" key={index}>
         
          <div className="container part_cont">
              <div>
                <div className="col-md-4" >
                  <div className="panel panel-primary">
                    <div className="panel-heading">{part.title} :</div>
                      <div className="panel-body">
                        <div >
                          <div id="switcher">
                            <label className="switch">
                                <input type="checkbox" id="part_edit_switcher" checked={this.state.temp_id === part._id} onClick={() => this.edit_part(part)}/>
                                <span className="slider"></span>
                            </label>
                              Edit
                          </div>
                        </div>
                        
                        
                          <form onSubmit={(event) => this.edit_part_submit(event)}>
                            <label>Title</label><input type='text' className='form-control' onChange={event => this.handleChange("title", event)}  defaultValue={part.title} placeholder="Title" required disabled={this.state.temp_id !== part._id} />
                            <label>Brand : </label><input type='text' className='form-control' onChange={event => this.handleChange("brand", event)}  placeholder="Brand" defaultValue={part.brand} disabled={this.state.temp_id !== part._id}/> 
                            <label>Model : </label><input type='text' className='form-control' onChange={event => this.handleChange("model", event)} placeholder="Model" defaultValue={part.model}  disabled={this.state.temp_id !== part._id}/>
                            <label>Price : </label><input type='text' className='form-control' onChange={event => this.handleChange("price", event)} placeholder="Price" defaultValue={part.price}  disabled={this.state.temp_id !== part._id}/>
                            <label>Condition :</label><input type='text' className='form-control' onChange={event => this.handleChange("condition", event)} placeholder="Condition" defaultValue={part.condition}  disabled={this.state.temp_id !== part._id}/> 
                            <label>Year :</label><input type='text' className='form-control' onChange={event => this.handleChange("year", event)} placeholder="Year" defaultValue={part.year} disabled={this.state.temp_id !== part._id}/> 
                            <label>Description :</label><textarea type='text' className='form-control' onChange={event => this.handleChange("description", event)} placeholder="Description" defaultValue={part.description} rows="7" disabled={this.state.temp_id !== part._id}/> 
                            
                                <button className="btn btn-danger" onClick={() => this.handlePartDelete(part._id)} disabled={this.state.temp_id !== part._id}>Delete</button>
                                <input type="submit" id="submit" name="submit" className="btn btn-primary pull-right" disabled={this.state.temp_id !== part._id}/>
                               
                              
                          </form>
                        
                        
                      </div>
                      
                  </div>
                </div>
              </div>
            </div>
        
        
        
      </div>
    ));

    return (
      <div className="admin-main-container">
        {user && <div>
          <button onClick={ this.logout}>Log out</button>
          <h1>Admin</h1>
          <h2>Requests</h2>
          { listOfRequests }
          <h2>Cars</h2>
          { listOfCars }
          <AddNewCar />
          <h2>Parts</h2>
          <div id="list_of_parts">
            { listOfParts }
          </div>
          <AddNewPart />
        </div>}
        {!user && <div className="you-must-log-in-div"><p>You must log in! <Link to="/login">Log in</Link></p></div>}
        
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
