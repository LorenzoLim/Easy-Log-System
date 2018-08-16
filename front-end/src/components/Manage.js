import React, {Component} from 'react';
import {MuiThemeProvider, SelectField, MenuItem} from 'material-ui';
import ProjectCard from './ProjectCard';
import { api } from '../request'

class Manage extends Component {
  constructor(props){
    super(props);
    this.state = {
      projects: this.props.projects,
      selected: null
    }
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
    const {projects, selected} = this.state
    if (projects) {
      return (
        <MuiThemeProvider>
          <div>
            <SelectField
              floatingLabelText="Select Project  "
              value={selected}
              onChange={this.handleChange}
              >
                {projects.map((project) =>
                  <MenuItem key={project._id} value={project._id} primaryText={project.projectName} />
                )}
            </SelectField>
            <ProjectCard projectId={selected}/>
          </div>
        </MuiThemeProvider>
      );
    } else {
      return null
    }
  }
}

export default Manage
