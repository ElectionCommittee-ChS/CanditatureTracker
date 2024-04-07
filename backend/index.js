const getData = require('./getData.js');
const express = require('express');

getData();
// update data every 15 minutes
// chainging this to 24 hours since not in use anymore, please change back when used!
setInterval(getData, 24 * 60 * 60 * 1000);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('../frontend/dist/'));

app.listen(port, () => console.log(`Listening on http://127.0.0.1:${port}`));