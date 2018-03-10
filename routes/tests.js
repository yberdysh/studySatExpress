const express = require('express');
//need to require express because then we need to create a router off of express
const router = express.Router();

let tests = [
    {id: 0, subject: 'Physics', score: 99, studentId: 0},
    {id: 1, subject: 'English', score: 78, studentId: 1},
    {id: 2, subject: 'Math', score: 90, studentId: 3},
    {id: 3, subject: 'English', score: 55, studentId: 3},
    {id: 4, subject: 'Physics', score: 88, studentId: 4},
]

let students = [
  { id: 0, name: 'Dan' },
  { id: 1, name: 'Rohan' },
  { id: 2, name: 'Sol' },
  { id: 3, name: 'Ella' },
  { id: 4, name: 'Michael' },
  { id: 5, name: 'Karen' },
];

router.get(['/'], function(req, res, next){
  res.json(tests);
});

router.get('/:id', (req, res, next) => {
  var test = tests.find(item => {
    if (item.id === Number(req.params.id)){
      return item;
    }
  })
  res.json(test);
})

router.post('/', (req, res, next) => {
  let newId = tests.length;
  //const { name } = req.body
  // let student = { id, name };
  //easier way to do
  let test = {
    id: newId,
    subject: req.body.subject,
    score: req.body.score,
    studentId: req.body.studentId
  }
  tests.push(test);
  res.json(test);
})

router.delete('/:id', (req, res, next) => {
  let newClass = tests.filter(test => test.id !== +req.params.id);
  console.log(newClass);
  res.json(newClass);
})

router.put('/:id', (req, res, next) => {
  //filter students and check them so better to use map
  let updatedTest = tests.map(test => {
    if (test.id === +req.params.id){
      test.score = req.body.score;
    }
      return test;
  })
  res.json(updatedTest);
})

module.exports = router;
