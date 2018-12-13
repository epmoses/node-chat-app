// Create new express app and setup

// Built in node module to convert paths
// https://nodejs.org/dist/latest-v11.x/docs/api/path.html#path_path_join_paths
// Before: 
// console.log(__dirname + '/../public');

// nodemon server/server.js
// Goes into server, out of server, and into public folder. This is unnecessary.

// After:
const path = require('path');
const publicPath = path.join(__dirname, '../public');
// console.log(publicPath);

// Challenge
// Setup Express
const express = require('express');
let app = express();
app.use(express.static(publicPath));

// For deployment to github and heroku
const port = process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`Server is up on port ${port}`)
});
