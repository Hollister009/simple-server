const path = require('path');
const cors = require('cors');
const pino = require('pino');
const express = require('express');
const expressPino = require('express-pino-logger');
// mongodb connection & env variables
process.env.NODE_ENV !== 'production' && require('dotenv').config();
require('./db');

const router = require('./api/routes');
const app = express();

const port = process.env.PORT || 5000;
const staticDir = path.resolve('static');

const logger = pino();
const expressLogger = expressPino({ logger });

app.use(cors())
  .use(express.json())
  .use(express.static(staticDir))
  .use(express.urlencoded({ extended:false }))  
  .use(expressLogger)
  .use(router);

app.listen(port, () => {
  logger.info('Server is running on port %d', port)
});
