import React, {Component} from 'react';
import Manage from './Manage';
import Projects from './Projects';
import Users from './Users';
import {MuiThemeProvider, Tabs, Tab} from 'material-ui';
import { css } from 'glamor';

require('dotenv').config()

class Junction extends Component {
  constructor(props){
    super(props);
    this.state = {
      manage: false,
      newUser: false,
      newProject: false,
      data: null
    }
  };

  render() {
    const styles = css({
      textAlign: 'center'
    });

    return (
      <div>
        <MuiThemeProvider>
            <Tabs>
              <Tab label="Projects" >
                <div {...styles}>
                  <Projects />
                </div>
              </Tab>
              <Tab label="Users" >
                <div {...styles}>
                  <Users />
                </div>
              </Tab>
              <Tab label="Report">
                <div {...styles}>
                  <Manage />
                </div>
              </Tab>
              <Tab label="Sign Out" onActive={this.props.handleSignOut} />
            </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Junction;
