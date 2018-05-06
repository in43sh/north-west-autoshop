import React, { Component } from 'react';
import axios from 'axios';
import './Contact.css';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      message: ''
    }
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event)
    let { name, phone, message } = this.state;
    axios.post('/requests/new', { name, phone, message })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      // <div id="_contact" className="contact-main-container">
      //   <form className="contact-form" onSubmit={(event) => this.handleSubmit(event)}>
      //     <h1 className="block-title">Contact us</h1>
      //     <div className="contact-input-container">
      //       <input className="contact-input round-border" onChange={(event) => this.handleChange("name", event)}/>
      //     </div>
      //     <div className="contact-input-container">
      //       <input className="contact-input round-border" onChange={(event) => this.handleChange("phone", event)} />
      //     </div>
      //     <div className="contact-input-container">
      //       <input className="contact-input round-border" onChange={(event) => this.handleChange("message", event)} />
      //     </div>
      //     <input className="contact-button round-border" value="Send" type="submit" />
      //   </form>
      // </div>

      // 

  
<div id="contact">
     <div className="section-content">
       <h1 className="section-header">Get in <span className="content-header wow fadeIn " data-wow-delay="0.2s" data-wow-duration="2s"> Touch with us</span></h1>
       <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h3>
     </div>
     <div className="contact-section">
     <div className="container">
       <form className="contact-form" onSubmit={(event) => this.handleSubmit(event)}>
         <div className="col-md-6 form-line">
             <div className="form-group">
               <label for="exampleInputUsername">Your name</label>
               <input type="text" className="form-control" id="" placeholder=" Enter Name" onChange={(event) => this.handleChange("name", event)}></input>
             </div>
             <div className="form-group">
               <label for="telephone">Mobile No.</label>
               <input type="tel" className="form-control" id="telephone" placeholder=" Enter 10-digit mobile no." onChange={(event) => this.handleChange("phone", event)}></input>
             </div>
           </div>
           <div className="col-md-6">
             <div className="form-group">
               <label for ="description"> Message</label>
                <textarea  className="form-control" id="description" placeholder="Enter Your Message" onChange={(event) => this.handleChange("message", event)}></textarea>
             </div>
             <div>

               <button type="submit" value="Send"  className="btn btn-default submit"><i className="fa fa-paper-plane" aria-hidden="true"></i>  Send Message</button>
             </div>
             
         </div>
       </form>
     </div>
</div>
</div>


    );
  }
}