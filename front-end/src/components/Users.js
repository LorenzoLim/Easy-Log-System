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
    users: null,
    selected: null,
    showCheckboxes: false,
    fixedHeader: true,
    fixedFooter: true
  };

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

  handleChange = (event, index, value) => {
    this.setState({
      selected: value
    })
  };

  render() {
    const {users, showCheckboxes, fixedHeader, fixedFooter} = this.state
    if (!users) {
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
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
              {users.map((user) =>
                <TableRow key={user._id}>
                  <TableRowColumn>{user.firstName} {user.lastName}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  {/* <TableRowColumn>
                    {project.projectUsers.map((user) =>
                      <span key={user._id}>{user.firstName} {user.lastName}<br /></span>
                    )}
                  </TableRowColumn> */}
                </TableRow>
                )
              }
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Manage
