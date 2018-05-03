import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

import { connect } from 'react-redux';
import { login } from '../../../redux/ducks/reducer'

class Login extends Component {
  constructor () {
    super();
    this.state = {
      userInput: '',
      passInput: '',
      errorMessage: ''
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

  login = () => {
    const username = this.state.userInput
    const password = this.state.passInput
    axios.post(`/user/login`, {
      username,
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
              <input className="input-data-field" placeholder="username" ref="username" onChange={ (e) => this.setState({ userInput: e.target.value }) } />
            </div>

            <div className="input-data">{/* check this class */}
              <input className="input-data-field"  placeholder="password" type="password" ref="password" onChange={ (e) => this.setState({ passInput: e.target.value }) } />
            </div>

            <button className="submit-btn" onClick={ this.login }>sign in</button>
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