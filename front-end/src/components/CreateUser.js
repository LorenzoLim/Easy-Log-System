import React, {Component} from 'react'
import { api } from '../request'
import {MuiThemeProvider, RaisedButton, TextField, Toggle} from 'material-ui';
class CreateUser extends Component {
    state = {
      firstName: '',
      lastName: '',
      email: '',
      password:'',
      role:'manager',
      success: false
    }

   handleCreateUser = (event) => {
     let {firstName, lastName, email, password, role} = this.state;

     api ({
       method: 'post',
       url: '/auth/register',
       headers: {'Content-Type': 'application/json'},
       data: {
        firstName,
        lastName,
        email,
        password,
        role
      }
     })
     .then((response) => {
       if (response.status === 200) {
         this.setState({
           success: true
         })
       }
     })

     .catch((error) => {
       console.log(error);
     });
   }

    toggleUserRole = (event) => {
      this.setState((prevState) => {
        return {
          role: prevState.role === 'admin' ? 'manager' : 'admin'
        }
      })
    }

 render() {
    return (
      <div>
        {
          this.state.success ? <p> Thank you </p> :

        <MuiThemeProvider>

          <div>
            <TextField
             hintText="Enter User's First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({firstName:newValue})}
             />
            <br/>
            <TextField
             hintText="Enter User's Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({lastName:newValue})}
             />
            <br/>
            <TextField
             hintText="Enter User's E-Mail"
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
             <Toggle
               label="Set Administrator"
               className="adminToggle"
               onToggle={this.toggleUserRole}
             />
            <RaisedButton className="button" label="Create User" primary={true} onClick={this.handleCreateUser}/>
          </div>
        </MuiThemeProvider>
        }
      </div>
    );
  }
}

export default CreateUser
