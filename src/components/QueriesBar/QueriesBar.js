import React, { Component } from 'react';

import './QueriesBar.css';

import { inspect } from 'util';

export class QueriesBar extends Component {
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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.clearResults = this.clearResults.bind(this);
  }

  search() {
    const { description='', location='', fullTime=false } = this.state;
    // We'll handle search in the parent (App) component
    this.props.onSearch(description, location, fullTime);
  }

  clearResults() {
    this.props.onClear();
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

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  render() {
    return (
      <div className="QueriesBar">
        <input
          className="text-field"
          placeholder="Enter a Job Title, Company, or Description"
          onChange={this.handleDescriptionChange}
          onKeyDown={this.handleKeyDown}
        />
        <input
          className="text-field"
          placeholder="Enter a City, State, ZIP Code, or Country"
          onChange={this.handleLocationChange}
          onKeyDown={this.handleKeyDown}
        />
        <label>
          <input
            className="checkbox-field"
            type="checkbox"
            onChange={this.handleFullTimeChange}
            onKeyDown={this.handleKeyDown}
          />
          <span className="label-text">Show full-time positions only</span>
        </label>

        <button className="button-confirm" onClick={this.search}>Search</button>
        <button className="button-cancel" onClick={this.clearResults}>Clear</button>
      </div>
    );
  }
}
