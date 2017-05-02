const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Post} = require('../models');




// const {
//     BlogPosts
// } = require('../models.js');
let str = `<body style="background: linear-gradient(to bottom, #b2e1ff 0%,#66b6fc 100%);"><h1>Blog Posts of Awesomeness</h1>`;
router.get('/', (req, res)=> {
    console.log('inside get');

    Post
    .find()
    .then((result) => {
        result.forEach(val=>{
            str+=`
            <div style="background:linear-gradient(to bottom, rgba(30,87,153,0) 0%,rgba(55,145,192,1) 100%);">
            <h2>${val.title}</h2>
            <p>${val.content}</p>
            <p>By: ${val.author.firstName} ${val.author.lastName} on ${val.publishDate}</p>
            <p>post id: <i>${val._id}</i></p>
            </div>
            <hr>
            `;
        })
        str += `</body>`;
        res.send(str)
    })
    .catch(err => res.status(500).send("Internal server error"));
});

router.get('/:id', (req, res)=> {
    console.log('inside get');
    Post
    .find({_id: req.params.id})
    .then((result) => res.json(result))
    .catch(err => res.status(500).send("Internal server error"));

});

router.post('/', jsonParser, (req,res)=>{
    //console.log('entered post thing');
    //console.log(req.body);
  const requiredFields = ['title', 'content'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }


    Post.create(req.body).then((val)=>{
        //console.log("Yay!");
        res.status(201).json(val);
    })
    .catch(err => res.status(500).send("Internal server error"));

});

router.put('/:id', jsonParser, (req,res)=>{
    //console.log('entered post thing');
    //console.log(req.body);
    if (req.params.id !== req.body.id){
        res.status(400).send("body and parameter ID not equal!");
    }
    Post.update({_id: req.params.id},{$set:req.body}).then((val)=>{
        //console.log("Yay!");
        res.status(201).json(val);
    })
    .catch(err => res.status(500).send("Internal server error"));

    
});

router.delete('/:id',jsonParser,(req,res)=>{
    Post.remove({_id: req.params.id}).then((val)=>{
        res.status(204).json(val);
    })
    .catch(err => res.status(500).send("Internal server error"));

});

module.exports = router;
