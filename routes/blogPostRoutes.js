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

router.get('/', (req, res)=> {
    console.log('inside get');
    Post
    .find()
    .then((result) => res.json(result));
});

router.get('/:id', (req, res)=> {
    console.log('inside get');
    Post
    .find({_id: req.params.id})
    .then((result) => res.json(result));
});

router.post('/', jsonParser, (req,res)=>{
    //console.log('entered post thing');
    //console.log(req.body);
    Post.create(req.body).then((val)=>{
        //console.log("Yay!");
        res.status(201).json(val);
    });
});

router.put('/:id', jsonParser, (req,res)=>{
    //console.log('entered post thing');
    //console.log(req.body);
    Post.update({_id: req.params.id},{$set:req.body}).then((val)=>{
        //console.log("Yay!");
        res.status(201).json(val);
    });
});

router.delete('/:id',jsonParser,(req,res)=>{
    Post.remove({_id: req.params.id}).then((val, err)=>{
        res.json(val);
    })
});

module.exports = router;
