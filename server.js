const express = require('express');
const path = require('path');

const config = require('./config');

const port = config.port;
const host = config.host;
const dir = config.dir;

const app = express();

app.use(express.static(path.join(__dirname, dir)))

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});