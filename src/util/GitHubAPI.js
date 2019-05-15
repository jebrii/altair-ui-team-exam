
function parseRequestParams(description, location, fullTime) {
  // TODO: Optimize this clunky mess (with iterator?)
  let outputString = '';
  if (description) {
    console.log(`got description. Adding ${description.replace(' ', '+')}`);
    outputString += `description=${description.replace(' ', '+')}`;
  }
  if (location) {
    if (outputString) {
      console.log(`got location. Adding ${location.replace(' ', '+')}`);
      outputString += '&';
    }
    outputString += `location=${location.replace(' ', '+')}`;
  }
  if (fullTime) {
    // full_time defaults to 'off' in GitHub API, so don't include if false
    if (outputString) {
      outputString += '&';
    }
    outputString += `full_time=on`;
  }
  return outputString;
}


export const GitHubAPI = {
  search(description = '', location = '', fullTime = false, stateSetCallback) {
    console.log(`initials are ${description}, ${location}, ${fullTime}`);
    const requestParams = parseRequestParams(description, location, fullTime);
    console.log(`requestParams are ${requestParams}`);
    // Request
    fetch(`http://jobs.github.com/positions.json?${requestParams}`, {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed!');
      }
    }, networkError => {
      console.log(networkError.message);
    })
    .then(positions => positions.map(({ // destructure each object and return only some of the keys
      id,
      title,
      location,
      type,
      created_at,
      company
    }) => ({
      id,
      title,
      location,
      type,
      created_at,
      company
    })))
    .then(data => stateSetCallback(data))
    .catch(err => alert(err))
    return;
  },

  // Make a second method for requestingindividual postings. This one returns
  // more detailed data, so you can drill down into a single result without
  // storing detailed data for each result in the list in App.js.

  // We might use this if we were going to add a feature for individual
  // job listing details. As of yet, this feature is not implemented.
  getJobInfo(id, stateSetCallback) {
    fetch(`https://jobs.github.com/positions/${id}.json`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed!');
      }
    }, networkError => {
      console.log(networkError.message);
    })
    // no destructuring for this response; return whole response object
    .then(data => stateSetCallback(data))
    .catch(err => alert(err))
    return;
  }
};
