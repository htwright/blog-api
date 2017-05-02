const express = require('express');
const blogPostRouter = require('./routes/blogPostRoutes');
const {PORT, DATABASE_URL} = require('./config');
const app = express();
const mongoose = require('mongoose');



app.use('/blog-posts', blogPostRouter);

let server;
mongoose.connect(
  DATABASE_URL, () => server = app.listen(
    PORT, () => {
      console.log(`listening on ${PORT}`);
    }
  )
);
