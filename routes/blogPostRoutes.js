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
let str = `<body style="background: linear-gradient(to bottom, #b2e1ff 0%,#66b6fc 100%);">`;
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
            <p>By: ${val.author.firstName} ${val.author.lastName} on ${val.publishDate}
            </div>
            `;
        })
        str += `</body>`;
        res.send(str)
    })
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
