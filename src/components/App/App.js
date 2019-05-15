import React, { Component } from 'react';
import './App.css';

// Import Components
import { QueriesBar } from '../QueriesBar/QueriesBar';
// import { ResultsList } from '../ResultsList/ResultsList';

// Import Utilities
import { GitHubAPI } from '../../util/GitHubAPI';

class App extends Component {
  constructor(props) {
    super(props);
    // set initial state
    this.state = {
      searchResults: [],
    };
    // bind all methods to component-level "this." As I understand it,
    // this is unnecessary if methods are declared as arrow functions...
    // ... but that's not how I learned it initially
    this.search = this.search.bind(this);
  }

  // componentDidMount() {
  //   alert('Welcome');
  // }

  search(description, location, fullTime) {
    GitHubAPI.search(description, location, fullTime, (positions) => {
      this.setState({
        searchResults: positions
      })
    });
  }

  render() {
    return (

      <div className="App">
        <div className="App-header">
          <h1>
            Search GitHub Job Postings
          </h1>
        </div>
        <QueriesBar onSearch={this.search}/>

      </div>
    );
  }
}

export default App;
