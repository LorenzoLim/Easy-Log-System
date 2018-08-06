const express = require('express');
const csv = require('express-csv');
const Project = require('../models/Project');
const User = require('../models/User');
const Hour = require('../models/Hour');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ELS-Back-End' });
});

router.get('/report.csv', (req, res) =>{
  Hour.find().populate('project_id').populate('user_id').then((hours) =>{
    const newArray = hours.map((hour) => ({
      type: hour.type,
      total: hour.total,
      userFirstName: hour.user_id.firstName,
      userLastName: hour.user_id.lastName,
      project: hour.project_id.projectName
    }))
    console.log(newArray);
      res.csv(newArray)
  });
});

/* Get CSV Data */
// router.get('/report.csv',(req, res) => {
//   const flatUsers = []
//   Promise.all([
//     User.find(),
//     Project.find()
//   ]).then(([users, projects]) => {
//     projects.forEach((project) => {
//       users.forEach((user) => {
//           let counter = 0;
//           user.hours.forEach((hour) => {
//             const result = {
//               firstName: user.firstName,
//               lastName: user.lastName,
//               type: hour.type,
//               project: project.projectName,
//               total: hour.total
//             }
//             flatUsers.push(result)
//           })
//       })
//     })
//     res.csv(flatUsers);
//   })
// });

module.exports = router;
