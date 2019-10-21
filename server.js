const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
// mongodb connection & env variables
require('./db');
require('dotenv').config();

const router = require('./api/routes');
const app = express();

const port = process.env.PORT || 5000;
const staticDir = path.resolve('static');

app.use(cors())
  .use(express.json())
  .use(express.static(staticDir))
  .use(express.urlencoded({ extended:false }))  
  .use(morgan('combined'))
  .use(router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
