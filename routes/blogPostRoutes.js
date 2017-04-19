const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('../models.js');


BlogPosts.create('Moby Dick', 'Trash', 'Dakota', '1703');


router.get('/', (req, res) =>{
  res.json(BlogPosts.get());
})
