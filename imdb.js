var fs = require('fs');
var express = require('express');

var data = JSON.parse(fs.readFileSync('ratings.json','utf8'));

var app = express();

app.get('/', function(req, res) {
  res.send('API Working - IMDB');
});

app.get('/movie/id/:id', function(req, res) {
  res.json(data[req.params.id]);
});

app.get('/movie/random', function(req, res){
  if(req.query.nomovies == null){
    res.json(data[Math.floor(Math.random() * data.length)]);
  }
  else {
    var randommovies = [];

    for(i = 0; i < req.query.nomovies; i++){
      randommovies.push(data[Math.floor(Math.random() * data.length)]);
    }

    res.json(randommovies);
  }
});

app.get('/movie/search/:term', function(req, res){
  var results = [];
  data.forEach(function(entry){
    if(entry.title.search(req.params.term) != -1){
      results.push(entry);
    }
  });

  res.json(results);
});

var server = app.listen(8000);