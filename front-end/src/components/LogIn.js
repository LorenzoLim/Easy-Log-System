import React, { Component } from 'react';
import '../App.css';
import logo from '../images/downer-logo.jpg';
import Junction from './Junction';
import CheckIn from './CheckIn';
import { api, setJwt } from '../request';
import {MuiThemeProvider, RaisedButton, TextField} from 'material-ui';
const jwt = require('jsonwebtoken');

require('dotenv').config()


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      email: null,
      password: null,
      role: null,
      userId: null,
      projects: null
    }
  };

  componentWillMount() {
    this.fetchProjects();
  }

  fetchProjects = () => {
    api.get (`/projects`)
      .then(response => {
        this.setState({
          projects: response.data
        })
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSignIn = () => {
    let {email, password} = this.state;
    api({
      method: 'post',
      url: '/auth',
      headers: {'Content-Type': 'application/json'},
      data: {
        email,
        password
      }
    })
    .then((response) => {
      setJwt(response.data.token);
      let decoded = jwt.verify(response.data.token, `${process.env.REACT_APP_JWT_SECRET}`)
      this.setState({
        token: response.data.token,
        role: decoded.role,
        email: decoded.email,
        userId: decoded.sub
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleSignOut = () => {
    localStorage.removeItem('token')
    this.setState({
      token: null
    })
  }

  render() {
    let {role, token, userId, projects} = this.state
    return (
      <div className="App">
        <img src={logo} alt="logo" />
        {
          token ? (
            role === 'admin' ?
            <Junction
              handleSignOut={this.handleSignOut}
            /> :
            <CheckIn
              userId={userId}
              handleSignOut={this.handleSignOut}
              projects={projects}
              fetchProjects={this.fetchProjects}
            /> ) :
          (
            <div>
              <MuiThemeProvider>
                <div>
                  <TextField
                    hintText="Enter Your E-Mail"
                    floatingLabelText="E-Mail"
                    onChange = {(event,newValue) => this.setState({email:newValue})}
                  />
                  <br/>
                  <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange = {(event,newValue) => this.setState({password:newValue})}
                  />
                  <br/>
                  <RaisedButton className="button" label="Sign-In" primary={true} onClick={this.handleSignIn}/>
                </div>
              </MuiThemeProvider>
            </div>
          )
        }
      </div>
    );
  }
  componentDidMount = () => {
    if (localStorage.getItem("token")){
      let decoded = jwt.verify(localStorage.getItem("token"), `${process.env.REACT_APP_JWT_SECRET}`)
      if (decoded.exp < Math.floor(Date.now() / 1000) + (60 * 60)) {
        localStorage.removeItem("token")
      } else {
        this.setState({
          role: decoded.role
        }
      )}
    }
  }
}

export default App;
