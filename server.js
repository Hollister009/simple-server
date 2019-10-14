const path = require('path');
const express = require('express');
// mongodb connection & env variables
require('./db');
require('dotenv').config();

const router = require('./api/routes');
const app = express();

const port = process.env.PORT || 5000;
const staticDir = path.resolve('static');

app.use(express.static(staticDir));
app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
