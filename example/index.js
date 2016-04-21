'use strict';

var express = require('express')
var faker = require('faker');
var app = express();
var _  = require('underscore');

let data = function () {
  let out = [];
  let id = 0;
  for (let i = 0; i < 100; i++) {
    out.push({
      id: ++id,
      name: faker.name.firstName()
    });
  }
  
  return out;
  
}();


app.use(express.static('../dist'))

app.get('/', (req, res) => {
  res.render('index.jade');
});

app.get('/data', (req, res) => {
  let page = parseInt(req.query.page), 
    size = parseInt(req.query.pageSize);
  
  page = page == 0 ? 0 : --page
  let c = page*size;
  
  let links = {first: 1, last: Math.ceil(data.length / size)};
  
  if (page > 1) links.prev = page - 1
  
  if (page < links.last) links.next = page + 1; 
  
  for (let k in links) {
    links[k] = "http://localhost:3000/data?page=" + links[k];
  }
  res.set('content-type', 'application/json');
  res.links(links);
  if (c > data.length) {
    res.send([]);
  } else {
    if (c+size > data.length) {
      res.send(_.rest(data, c));
    } else {
      let out = [];
      while (size > 0) {
        out.push(data[c++]);
        size--;
      }
      res.send(out);
    }
  }
  
})


app.listen(4000)