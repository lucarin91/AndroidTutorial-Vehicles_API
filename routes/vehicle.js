var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Veicles = require('../models/Vehicle.js');

/* GET /projects listing. */
router.get('/', function(req, res, next) {
  Veicles.find({}, function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* GET /projects */
router.get('/:id', function(req, res, next) {
  Veicles.find({_id:req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /projects */
router.post('/', function(req, res, next) {
  Veicles.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });

});
module.exports = router;
