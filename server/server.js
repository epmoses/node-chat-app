const express = require('express');
let app = express();
const path = require('path');
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log(`Server is up on port ${port}`)
});
