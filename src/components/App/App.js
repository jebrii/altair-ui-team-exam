import React, { Component } from 'react';
import './App.css';

// Import Components
import { QueriesBar } from '../QueriesBar/QueriesBar';
import ResultsList from '../ResultsList/ResultsList';

// Import Utilities
import { GitHubAPI } from '../../util/GitHubAPI';

//
const columns = [
  {
    name: "Title",
    prop: "title",
    sortable: true
  },
  {
    name: "Location",
    prop: "location",
    sortable: true
  },
  {
    name: "Company",
    prop: "company",
    sortable: true
  },
  {
    name: "Date Posted",
    prop: "created_at",
    sortable: true
  },
  {
    name: "Type",
    prop: "type",
    sortable: false
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    // set initial state
    this.state = {
      searchResults: [],
    };
    // bind all methods to component-level "this." As I understand it,
    // this is unnecessary if methods are declared as arrow functions...
    // ... but that's not how I learned it initially; I'm sticking with my norms
    this.search = this.search.bind(this);
    this.clearResults = this.clearResults.bind(this);
  }

  search(description, location, fullTime) {
    GitHubAPI.search(description, location, fullTime, (positions) => {
      this.setState({
        searchResults: positions
      })
    });
  }

  clearResults() {
    this.setState({
      searchResults: []
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>
            Search GitHub Job Postings
          </h1>
          <p className="subtext">A single-page React applet by Henry Raschke</p>
        </div>
        <QueriesBar onSearch={this.search} onClear={this.clearResults} />
        <ResultsList positions={this.state.searchResults || []} columns={columns} />

      </div>
    );
  }
}

export default App;
