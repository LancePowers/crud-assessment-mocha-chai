var express = require('express');
var router = express.Router();
var Llama = require('../models/llamas.js');

// get all
router.get('/llamas', function(req, res, next) {
  Llama.find(function(err,llamas){
    if (err) {
      res.json({ 'message': err })
    } else {
      res.json(llamas);
    }
  })
});

//post one
router.post('/llamas', function(req, res, next) {
  var newLlama = new Llama({
    name: req.body.name,
    age: req.body.age,
    spitter: req.body.spitter
  });
  newLlama.save(function(err,llama){
    if (err) {
      res.json({ 'message': err })
    } else {
      res.json(llama);
    }
  })
});

//get one
router.get('/llama/:id', function(req, res, next) {
  Llama.findById(req.params.id, function(err,llama){
    if(err){
      res.json({"message": err})
    } else {
      res.json(llama);
    }
  })
});

//edit one
router.put('/llama/:id', function(req, res, next) {
  Llama.findOneAndUpdate(req.params.id, req.body, {new: true}, function(err,llama){
    if(err){
      res.json({"message": err})
    } else {
      res.json(llama);
    }
  })
});

//delete one
router.delete('/llama/:id', function(req, res, next) {
  Llama.remove(req.params.id, function(err,llama){
    if(err){
      res.json({"message": err})
    } else {
      res.json(llama);
    }
  }))
});
module.exports = router;
