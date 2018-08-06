import React, {Component} from 'react'
import { api } from '../request'
import {MuiThemeProvider, RaisedButton, TextField, SelectField, MenuItem} from 'material-ui';
class CreateProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      projectNum: '',
      projectLocation: '',
      projectName: '',
      projectStatus: '',
      users: null,
      values: [],
      success: false
    }
  }

  handleCreateProject = () => {
    let {projectNum, projectLocation, projectName, projectStatus, values} = this.state;
    api({
      method: 'post',
      url: '/projects',
      headers: {'Content-Type': 'application/json'},
      data: {
        projectNum,
        projectLocation,
        projectName,
        projectStatus,
        projectUsers: values
      }
    })
    .then((response) => {
      this.setState({
        success: true
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }
  componentWillMount(response) {
    api.get ('/users')
      .then(response => {
        this.setState({
          users: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }


    handleChange = (event, index, values) => this.setState({values});

    menuItems(values) {
      let {users} = this.state
      return users.map((user) => (
        <MenuItem
          key={`${user.firstName} ${user.lastName}`}
          insetChildren={true}
          checked={values && values.indexOf(user) > -1}
          value={user._id}
          primaryText={`${user.firstName} ${user.lastName}`}
        />
      ));
    }

  render() {
    let {selectedUsers, users, values} = this.state
    if (!users) {
      return null
    }
    if (!values) {
      return null
    }
    return (
      <div>
        {
          this.state.success ? <p> You made a project</p> :
          <MuiThemeProvider>
            <div>
              <TextField
                hintText="Enter Project Number"
                floatingLabelText="Project Number"
                onChange = {(event,newValue) => this.setState({projectNum:newValue})}
              />
              <br/>
              <TextField
                hintText="Enter Project Name"
                floatingLabelText="Project Name"
                onChange = {(event,newValue) => this.setState({projectName:newValue})}
              />
              <br/>
              <TextField
                hintText="Enter Project Location"
                floatingLabelText="Project Location"
                onChange = {(event,newValue) => this.setState({projectLocation:newValue})}
              />
              <br/>
              <TextField
                hintText="Enter Project Status"
                floatingLabelText="Project Status"
                onChange = {(event,newValue) => this.setState({projectStatus:newValue})}
              />
              <br/>
              <SelectField
                multiple={true}
                hintText="Select Managers"
                value={values}
                onChange={this.handleChange}
              >
                {this.menuItems(selectedUsers)}
              </SelectField>
              <br/>
              <RaisedButton className="button" label="Create Project" primary={true} onClick={(event) => this.handleCreateProject()} />
            </div>
          </MuiThemeProvider>
        }
      </div>
    );
  }
}

export default CreateProject
