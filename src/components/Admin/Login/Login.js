import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

import { connect } from 'react-redux';
import { login } from '../../../redux/ducks/reducer'

class Login extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  componentWillMount() {
    axios.get('/user/data')
      .then(response => {
        console.log(response);
        if (response.data.user) {
          this.props.login(response.data.user);
        }
      })
      .catch(error => console.log(error))

    if (this.props.user!=null) {
      if(this.props.user.username!=null){

      this.props.history.push('/admin');
      }
    }
  }
  
  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
                  () => { this.validateField(name, value) });
    console.log(this.state.email);
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  login = () => {
    console.log('hui');
    const {email, password} = this.state
    axios.post('/login', {
      email,
      password
    }).then(response => {
      console.log('response ->', response)
      console.log('response.data.username -> ', response.data.username);
      this.props.login(response.data.username)
      this.props.history.push('/admin');
      console.log('you are in')
    }).catch(error => {
      console.log(error);
      console.log(error.response)
      // console.log(error.response.data.message)
      // if (error.response.status === 401) {
      //   this.setState({ errorMessage: 'Wrong password' })
      // } else if (error.response.status === 403) {
      //   this.setState({ errorMessage: 'This user is not registered' })
      // }
      // console.log(this.state.errorMessage);
    })
  }

  render() {
    return (
      <div className="login-main">
          <div className="login-input-div">
             <div className="input-data"> {/* check this class */}
              <input className="input-data-field" placeholder="username" ref="username" onChange={(event) => this.handleUserInput(event)} />
            </div>

            <div className="input-data">{/* check this class */}
              <input className="input-data-field"  placeholder="password" type="password" ref="password" onChange={(event) => this.handleUserInput(event)} />
            </div>

            <button className="submit-btn"  disabled={!this.state.formValid} onClick={ this.login }>sign in</button>
            <div className="login-info-container">{this.state.errorMessage}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);