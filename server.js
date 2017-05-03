const express = require('express');
const {PORT, DATABASE_URL} = require('./config');
const app = express();
const mongoose = require('mongoose');
//const ejs = require('ejs');
const blogPostRouter = require('./routes/blogPostRoutes');
//app.set('view engine', 'ejs');
app.use(express.static(__dirname + "views"));
app.use('/blog-posts', blogPostRouter);

let server;
mongoose.connect(
  DATABASE_URL, () => server = app.listen(
    PORT, () => {
      console.log(`listening on ${PORT}`);
    }
  )
);
