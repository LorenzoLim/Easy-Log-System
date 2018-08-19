import React, {Component} from 'react';
import {api} from '../request.js'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import {
  MuiThemeProvider, 
  RaisedButton
} from 'material-ui';

class ProjectCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      projectId: null,
      projectNumber: "",
      projectLocation: "",
      projectName: "",
      projectStatus: "",
      projectUsers: null,
      hourDetails: null,
      showCheckboxes: false,
      fixedHeader: true,
      fixedFooter: true
    }
  };

  componentWillReceiveProps(nextProps) {
    this.fetchProject(nextProps.projectId)
  }

  fetchProject(projectId) {
      api.get(`/projects/${projectId}`)
        .then(({data}) => {
          this.setState({
            projectId: projectId,
            projectNum: data.projectNum,
            projectLocation: data.projectLocation,
            projectName: data.projectName,
            projectStatus: data.projectStatus,
            projectUsers: data.projectUsers
          })
        })
        .catch((error) => {
          console.log(error);
        });

        api.get(`/hours?projectId=${projectId}`)
        .then(({data}) => {
          this.setState({
            hourDetails: data
          })
        })
        .catch((error) => {
          console.log(error);
        });
  }

  handleCSVExport = (event) => {
    const { projectId } = this.state
    window.open(`${process.env.REACT_APP_API_URL}report?projectId=${projectId}`, "_blank")
  }

  render() {
    const {projectLocation, projectStatus, projectNum, projectUsers, hourDetails} = this.state

    if (!projectUsers || !hourDetails) {
      return null;
    }
    const userHours = {};
    hourDetails.forEach((userHour) => {
      const userId = userHour.user_id._id
      if(!userHours[userId]){
        userHours[userId] = userHour.total
      }else{
        userHours[userId] = userHours[userId] + userHour.total
      }
    })
    return (
      <div>
        <Table>
          <TableHeader
             displaySelectAll={this.state.showCheckboxes}
             fixedHeader={this.state.fixedHeader}
             fixedFooter={this.state.fixedFooter}
             adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow className="tableHeaderStyle">
              <TableHeaderColumn tooltip="Project number">Project Number</TableHeaderColumn>
              <TableHeaderColumn tooltip="The managers">Manager/s</TableHeaderColumn>
              <TableHeaderColumn tooltip="Location">Location</TableHeaderColumn>
              <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
              <TableHeaderColumn tooltip="hours">Hours</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={this.state.showCheckboxes}>
            <TableRow>
              <TableRowColumn>{projectNum}</TableRowColumn>
              <TableRowColumn>
                {
                  projectUsers.map((user) => (
                    <span key={user._id}>{user.firstName} {user.lastName} <br /><hr /></span>)
                  )

                }
              </TableRowColumn>
              <TableRowColumn>{projectLocation}</TableRowColumn>
              <TableRowColumn>{projectStatus}</TableRowColumn>
              <TableRowColumn>
                {
                  Object.keys(userHours).map((key) =>
                    <span key={key}>{userHours[key]}<br /><hr /></span>
                  )
                }
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
        <MuiThemeProvider>
          <RaisedButton className="button"label="Export" primary={true} onClick={this.handleCSVExport}/>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default ProjectCard
