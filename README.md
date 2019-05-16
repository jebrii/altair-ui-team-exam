# Altair SmartEdge UI Team Fit Assessment Project

A two-day test to assess Henry's fit for the Altair SmartEdge UI Team

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the Applet

I have made this applet very light, with minimal requirements outside of React.<br>
Upon downloading it, you should run:
<br><br>
`npm install`
<br><br>
to install any necessary dependencies.

In the project directory, you can run:
<br><br>
`npm start`
<br><br>
to run the applet in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

In this mode, you may want to open a browser in an insecure, development mode
so as to circumvent CORS policy adherence and allow requests from the applet.<br>
Check out the "CORS Issues" section below for more information.

## Breakdown of the Applet

This one-page applet is broken down into two child components of App, the
QueriesBar and the ResultsList. The ResultsList populates a list of child
ResultItem components. In addition, the App utilizes the GitHubAPI.js utility
to make requests to the GitHub jobs API.

```
        --------------                ----------------
        |    App     |   <--------->  | GitHubAPI.js |
        --------------                ----------------
            /   \  
           /     \
--------------   ---------------
| QueriesBar |   | ResultsList |
--------------   ---------------
                   /       \
                  /         \              
        --------------   --------------
        | ResultItem |   | ResultItem |    ...more ResultItems
        --------------   --------------
```

Search data, given parameters provided by QueriesBar to App, is retrieved from
GitHubAPI.js and passed into ResultsList by App via props. ResultsList then maps
this and passes individual ResultItem components an individual search result.
<br><br>
Given the simplicity of the requirements, this seemed like the best structure to me. <br>
I chose not to further subdivide the QueriesBar component into individual input
fields because it felt sufficient and organized to handle all the events for the
inputs in the single component rather than pass callbacks into props of child
components.<br>
I chose also not to have the sortable headers as their own child components of
ResultsList, as I wanted to manage all the sorting and sorting events inside of
ResultsList (for similar reasons as above).<br>
Added functionalities may merit architecture alterations.

## Known Issues

Following are a list of known issues in the applet.

### List Items "Key" Prop

When rendering data in the ResultsList component, you get the error:
<br><br>
`Warning: Each child in a list should have a unique "key" prop.`
<br><br>
This is because each of the items in the html table element are treated as list
items and React wants them each to have a unique key prop.
<br><br>
I used iteration and nested functions to generate these list items dynamically.
The benefit of this strategy is it allows for more columns of data to be added by
appending to the "columns" object in App.js. The drawback is that it makes it so
that I have to be more clever passing information down through components and methods
to ensure each key item is unique.
<br><br>
As of yet, I haven't gotten around to fixing this. As it is non-fatal to the operation
of the applet, I've put it low on my priority list and will delete this section
if and when I get around to it.

### CORS Issues

For security reasons, requests are blocked from the applet in a browser for CORS
compliance reasons. I've discussed this at length with Kevin and Andrew, so I won't
address it too much in depth. Suffice it to say that webpages can be exploited by
malicious Javascript that sends requests to unauthorized servers that don't share
an origin (ssl, domain, and port) with the webpage. CORS policy and browsers blocking
traffic protects against this. Unfortunately, my http://localhost:3000/ sending
traffic to https://jobs.github.com/ gets blocked by CORS.<br>
We were able to circumvent this by opening and insecure browser session for development
purposes. To do this, we ran the following command in the Terminal:
<br><br>
`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`

### Icons

I've opted for ASCII characters to replace icons at this point. My hope is to
insert icons with styling, but as of writing this haven't gotten to that.

## Developer Notes

Here are some personal notes on the project.

### Extra Features

These features were not laid out in the scope, but were added for functionality
or flair.

####Clear

I added a "Clear" button next to the "Search" button to clear the search Results.

####Sort Setting is Remembered

Part of the challenge of sorting for me was that I decided early on that the sort
"setting" (that is to say, the column and order of sort) should not be overwritten
when a new set of search results is passed in to the ResultsList component. This
made storing the search results and the sorted results separately a challenge. Instead,
I decided to store the sort order in state and apply a sorting method directly on
the passed in results props upon render. This way, changing the sort order and
passing in new search results are entirely independent and do not overwrite eachother.

### Binding and Arrow Functions

One of the benefits of arrow functions inheriting the "this" of their parent scope
rather than having their own "this" is that they do not have to be bound in the
constructor method of their respective components. This can save time, lines, and,
I'm certain, efficiency in execution. Nonetheless, the standard method-as-function
declaration seems to have stuck around and was taught to me when I took my React
certification course. For that reason, I've stuck with my roots, declaring methods
as traditional functions and binding them in the constructor.

### Semicolons

Andrew has informed me that I cannot continue my development career on good terms at
Altair if I continue my semicolon use. Consider this my last stand, then. I refer
you in good humor to the [Semicolon Appreciation Society](http://semicolonappreciationsociety.com/).
