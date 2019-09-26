const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const router = require('./api/routes');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 5000;
const db_uri = process.env.MONGODB_LOCAL;

// mongoose.connect(db_uri, { useNewUrlParser: true });

const staticDir = path.resolve('static');

app.use(express.static(staticDir));
app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
