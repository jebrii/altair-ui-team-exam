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

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Breakdown of the Applet

## Known Issues

### Date Sorting

### List Items "Key" Prop

When rendering data in the ResultsList component, you get the error:
<br><br>
`Warning: Each child in a list should have a unique "key" prop.`
<br><br>
This is because each of the items in the html table element are treated as list
items and React wants them each to have a unique key prop. The problem with this
is that I used iteration and nested functions to generate these list items dynamically.
The benefit of this strategy is it allows for more columns


### CORS Issues

### Icons

## Developer Notes

### Binding and Arrow Functions

### Semicolons







REMEMBER TO OPEN CHROME WITH `open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`
