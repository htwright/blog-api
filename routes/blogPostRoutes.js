const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {
    BlogPosts
} = require('../models.js');


BlogPosts.create('Moby Dick', 'Trash', 'Dakota', '1703');


router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ["title", "content", "author", "publishDate"];
    for (i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Hey dude, you're missing ${field}`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
})
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ["id","title", "content", "author", "publishDate"];
  for (i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
          const message = `Hey dude, you're missing ${field}`;
          console.error(message);
          return res.status(400).send(message);
      }
  }
    if (req.body.id !== req.params.id) {
        const message = `Hey hombre, your ids don't match. Check yourself`;
        console.error(message);
        return res.status(400).send(message);
    }
    const updatedItem = BlogPosts.update(req.body);
    res.status(201).json(updatedItem);
})
router.delete('/', jsonParser, (req, res) => {

})

module.exports = router;
