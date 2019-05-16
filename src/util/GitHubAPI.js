
function parseRequestParams(description, location, fullTime) {
  // TODO: Optimize this clunky mess (with iterator?)
  let outputString = '';
  if (description) {
    outputString += `description=${description.replace(' ', '+')}`;
  }
  if (location) {
    if (outputString) {
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

function parseDateString(dateString) {
  let newDate = new Date(dateString);
  let year = newDate.getFullYear();
  let month = newDate.getMonth();
  let day = newDate.getDay();
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  return `${year}-${month}-${day}`;
}

export const GitHubAPI = {
  search(description = '', location = '', fullTime = false, stateSetCallback) {
    const requestParams = parseRequestParams(description, location, fullTime);
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
      company,
      type,
      created_at
    }) => ({
      id,
      title,
      location,
      company,
      type,
      created_at: parseDateString(created_at)
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
