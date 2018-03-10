const express = require('express');
//need to require express because then we need to create a router off of express
const router = express.Router();
const _ = require('lodash');

let students = [
  { id: 0, name: 'Dan' },
  { id: 1, name: 'Rohan' },
  { id: 2, name: 'Sol' },
  { id: 3, name: 'Ella' },
  { id: 4, name: 'Michael' },
  { id: 5, name: 'Karen' },
];


router.get('/', function(req, res, next){
  // res.json(students);
  //can I do something with a forEach here to make the student look better?
  // students.forEach(function(student){
  //   res.send(`
  //   <html>
  //    <head>
  //      <title>My site</title>
  //    </head>
  //    <body>
  //      <h1>Hello World</h1>
  //    </body>
  //   </html>
  // `)
  // })

  res.render('index', {students})

});

module.exports = router;
