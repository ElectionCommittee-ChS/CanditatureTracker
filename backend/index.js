const getData = require('./getData.js');
const express = require('express');

getData();
// update data every 30 minutes
setInterval(getData, 1800000);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(port, () => console.log(`Listening on http://127.0.0.1:${port}`));