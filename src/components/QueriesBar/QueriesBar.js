import React from 'react';

import './QueriesBar.css';

export class QueriesBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      location: '',
      fullTime: false
    };
    this.search = this.search.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleFullTimeChange = this.handleFullTimeChange.bind(this);
  }

  search() {
    const { description, location, fullTime } = this.state;
    // We'll handle search in the parent (App) component
    this.props.onSearch(description, location, fullTime);
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  handleFullTimeChange(e) {
    this.setState({ fullTime: e.target.checked });
  }

  render() {
    return (
      <div className="QueriesBar">
        <input
          className="descriptionField"
          placeholder="Enter a Job Title, Company, or Description"
          onChange={this.handleDescriptionChange}
        />
        <input
          className="locationField"
          placeholder="Enter a City, State, ZIP Code, or Country"
          onChange={this.handleDescriptionChange}
        />
        <label>
          <input
            className="fullTimeCheckbox"
            type="checkbox"
            onChange={this.handleDescriptionChange}
          />
          Show full-time positions only
        </label>
        <a onClick={this.search}>Search</a>
      </div>
    );
  }
}
