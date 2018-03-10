const express = require('express');
//need to require express because then we need to create a router off of express
const router = express.Router();

let students = [
  { id: 0, name: 'Dan' },
  { id: 1, name: 'Rohan' },
  { id: 2, name: 'Sol' },
  { id: 3, name: 'Ella' },
  { id: 4, name: 'Michael' },
  { id: 5, name: 'Karen' },
];

let tests = [
    {id: 0, subject: 'Physics', score: 99, studentId: 0},
    {id: 1, subject: 'English', score: 78, studentId: 1},
    {id: 2, subject: 'Math', score: 90, studentId: 3},
    {id: 3, subject: 'English', score: 55, studentId: 3},
    {id: 4, subject: 'Physics', score: 88, studentId: 4},
]

//GET ALL OUR STUDENTS
router.get('/', function(req, res, next){
  var allStudents = students;
  var highScore = 0;
  allStudents.forEach(function(student){
    if (student.average > highScore){
      highScore = student.average;
    }
  })
  var highestScoringStudent = [];
  allStudents.forEach(student => {
    if (student.average === highScore){
      highestScoringStudent.push(student);
    }
  })
  res.json(students, highestScoringStudent);
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

  // res.render('index', {students})

});

//GET STUDENTS BY ID
router.get('/:id', (req, res, next) => {
  var student = students.find(item => {
    if (item.id === Number(req.params.id)){
      return item;
    }
  })
  var studentGrades = tests.filter(test => {
    if (test.studentId === +req.params.id){
      return test
    }
  })
  console.log(studentGrades);
  if (studentGrades.length > 1){
    var sum = studentGrades.reduce(function(accum, currentVal){
      return accum.score + currentVal.score;
    })
  student["average"] = sum/studentGrades.length;
  } else {
    student["average"] = studentGrades[0].score;
  }

  // console.log(studentGrades);
  console.log(student);
  res.json(student);
})

//ADD A STUDENT
router.post('/', (req, res, next) => {
  let newId = students.length;
  //const { name } = req.body
  // let student = { id, name };
  //easier way to do
  let student = {
    id: newId,
    name: req.body.name
  }
  students.push(student);
  res.json(student);
})

//DELETE A STUDENT
router.delete('/:id', (req, res, next) => {
  let newClass = students.filter(student => student.id !== +req.params.id);
  res.json(newClass);
})

//UPDATE A STUDENT
router.put('/:id', (req, res, next) => {
  //filter students and check them so better to use map
  let updatedStudent = students.map(student => {
    if (student.id === req.params.id){
      student.name = req.body.name;
      return student;
    } else {
      return student;
    }
  })
  res.json(updatedStudent);
})

module.exports = router;
