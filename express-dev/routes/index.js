var express = require('express');
var router = express.Router();
var elasticsearch = require('../elasticsearch').elasticClient
// import { elasticClient } from "../elasticsearch";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/elasticsearch', (req, res, next) => {
  
  res.render('index', { title: 'Express' });
})

module.exports = router;
