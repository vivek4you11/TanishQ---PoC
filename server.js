var express = require('express');
var cors = require('cors')
var app = express();
app.use(cors());
app.get('/demo', cors(), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for a Single Route'})
  })
app.use(express.static(__dirname + '/www'));

app.listen('3000');
console.log('working on 3000');

