import React, {Component} from 'react';
import moment from 'moment';
import {MuiThemeProvider, MenuItem, RaisedButton, SelectField, Toggle, TextField} from 'material-ui';
import {api} from '../request';
// import axios from 'axios';

class CheckIn extends Component {
  state = {
    selectedHourType: null,
    selectedProject: null,
    checkedIn: false,
    projects: null,
    hourType: [
      {_id: '1', type: 'Project'},
      {_id: '2', type: 'Business Support - Business Development'},
      {_id: '3', type: 'Business Support - Commercial'},
      {_id: '4', type: 'Business Support - Equipment Optimization'},
      {_id: '5', type: 'Business Support - Maintenance'},
      {_id: '6', type: 'Business Support - Manufacturing'},
      {_id: '7', type: 'Business Support - Operations'},
      {_id: '8', type: 'Business Support - Technical Services'},
      {_id: '9', type: 'Business Support - Zero Harm'},
      {_id: '10', type: 'Other - Administration'},
      {_id: '11', type: 'Other - Attending Site'},
      {_id: '12', type: 'Other - Audit'},
      {_id: '13', type: 'Other - Information Technology'},
      {_id: '14', type: 'Other - Leave-Planned (A/L, Public, Holiday)'},
      {_id: '15', type: 'Other - Leave-Unplanned(Sick, Family Leave)'},
      {_id: '16', type: 'Other - Meetings'},
      {_id: '17', type: 'Other - Training'},
      {_id: '18', type: 'Other - Travel'}
    ],
    startTime: null,
    stopTime: null,
    totalTime: 0,
    userId: this.props.userId,
    manualHour: false
  };

  componentDidMount() {
    if(this.state.projects){
      api.get (`/projects?userId=${this.props.userId}`)
        .then(response => {
          this.setState({
            projects: response.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleHourChange = (event, index, value) => {
    this.setState({
      selectedHourType: value
    })
  };

  handleProjectChange = (event, index, value) => {
    this.setState({
      selectedProject: value
    })
  };

  handleSignOut = () => {
    sessionStorage.removeItem('token')
  }

  startTimer = () => {
  	this.setState({
  		startTime: moment(),
      checkedIn: true
  	})
  }

  stopTimer = () => {
    const {startTime, selectedProject, selectedHourType, totalTime, userId} = this.state
  	this.setState({
      totalTime: moment().diff(startTime, 'hours', true),
      checkedIn: false,
      selectedProject,
      selectedHourType
    })
    api({
      method: 'post',
      url: '/hours',
      data: {
        userId,
        total: totalTime,
        selectedProject,
        selectedHourType
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  submitManual = () => {
    const {selectedProject, selectedHourType, totalTime, userId} = this.state
    this.setState({
      checkedIn: false,
      selectedProject,
      selectedHourType,
      manualHour: false
    })
    api({
      method: 'post',
      url: '/hours',
      data: {
        userId,
        total: totalTime,
        selectedProject,
        selectedHourType
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  toggleManualHours = (event) => {
    this.setState((prevState) => {
      return {
        manualHour: prevState.manualHour === false ? true : false
      }
    })
  }

  render() {
    let {projects, selectedProject, checkedIn, startTime, selectedHourType, hourType, manualHour} = this.state
    if (!projects || !hourType) {
      return null
    }

    return (
      <MuiThemeProvider>
        {
          checkedIn ? (
            <div>
              <p>
                Timer Started at {startTime.format("hh:mm A")}
              </p>
              <p>
                Type Of Hour - {selectedHourType}
              </p>
              <RaisedButton  className="button" label="Stop Work" primary={true} onClick={this.stopTimer}/>
            </div>
          ) : (
            <div>
              <SelectField
              value={selectedProject}
              onChange={this.handleProjectChange}
              hintText='Select Project '
              >
                {projects.map((project) =>
                  <MenuItem key={project._id} value={project._id} primaryText={project.projectName} />
                )}
            </SelectField>
            <br/>
            <SelectField
              value={selectedHourType}
              onChange={this.handleHourChange}
              autoWidth={false}
              hintText='Select Type '
            >
              {
                hourType.map((hour) =>
                  <MenuItem key={hour._id} value={hour.type} primaryText={hour.type} />
              )}
            </SelectField>
            <br/>
            <Toggle
              label="Manual Set Hours"
              className="adminToggle"
              onToggle={this.toggleManualHours}
            />
            { manualHour ? (
              <div>
                <TextField
                  floatingLabelText="Completed Hours"
                  type="number"
                  onChange = {(event,newValue) => this.setState({totalTime:newValue})}
                />
                <br/>
                <RaisedButton  className="button" label="Submit Hours" primary={true} onClick={this.submitManual}/>
              </div>
            ) : (
              <RaisedButton  className="button" label="Start Work" primary={true} onClick={this.startTimer}/>
            )}
          </div>
        )}
      </MuiThemeProvider>
    );
  }
}

export default CheckIn
