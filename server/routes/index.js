const express = require('express');
var router = express.Router();

router.get('/api/hello', function(req,res){
  res.send({greeting:'Hello React x Node.js'});
});

module.exports = router;