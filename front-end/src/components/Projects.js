import React, {Component} from 'react';
import {MuiThemeProvider} from 'material-ui';
import {api} from '../request.js';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class Manage extends Component {
  state = {
    projects: null,
    selected: null,
    showCheckboxes: false,
    fixedHeader: true,
    fixedFooter: true
  };

  componentWillMount(response) {
    api.get ('/projects')
      .then(response => {
        this.setState({
          projects: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange = (event, index, value) => {
    this.setState({
      selected: value
    })
  };

  render() {
    const {projects, showCheckboxes, fixedHeader, fixedFooter} = this.state
    if (!projects) {
      return null
    }
    return (
      <MuiThemeProvider>
        <div>
          <Table>
            <TableHeader
               displaySelectAll={showCheckboxes}
               fixedHeader={fixedHeader}
               fixedFooter={fixedFooter}
               adjustForCheckbox={showCheckboxes}
            >
              <TableRow className="tableHeaderStyle">
                <TableHeaderColumn>Project Number</TableHeaderColumn>
                <TableHeaderColumn>Project Name</TableHeaderColumn>
                <TableHeaderColumn>Location</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
                <TableHeaderColumn>Managers</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
              {projects.map((project) =>
                <TableRow key={project._id}>
                  <TableRowColumn>{project.projectNum}</TableRowColumn>
                  <TableRowColumn>{project.projectName}</TableRowColumn>
                  <TableRowColumn>{project.projectLocation}</TableRowColumn>
                  <TableRowColumn>{project.projectStatus}</TableRowColumn>
                  <TableRowColumn>
                    {project.projectUsers.map((user) =>
                      <span key={user._id}>{user.firstName} {user.lastName}<br /></span>
                    )}
                  </TableRowColumn>
                </TableRow>
                )
              }
            </TableBody>
          </Table>
          {/* <SelectField
            floatingLabelText="Select Project  "
            value={selected}
            onChange={this.handleChange}
            >
              {projects.map((project) =>
                <MenuItem key={project._id} value={project._id} primaryText={project.projectName} />
              )}
          </SelectField>
          <ProjectCard projectId={selected}/> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Manage
