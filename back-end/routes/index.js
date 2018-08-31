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
      res.csv(newArray)
  });
});

router.get('/report', (req, res) => {
  Hour.find({"project_id": req.query.projectId})
  .then((hours) => {
    User.populate(hours, {path: "user_id"}).then((result) => {
      Hour.populate(result, {path: "project_id"}).then((final) => {
        const newArray = final.map((data) => ({
          type: data.type,
          total: data.total,
          userFirstName: data.user_id.firstName,
          userLastName: data.user_id.lastName,
          project: data.project_id.projectName
        }))
        newArray.unshift(['Type', 'Total', 'First Name', 'Last Name', 'Project'])
        res.csv(newArray);
      })
    })
  })
});

module.exports = router;
