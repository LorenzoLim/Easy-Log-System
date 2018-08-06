const express = require('express');
const User = require('../models/User');
const Hour = require('../models/Hour');
const csv = require('express-csv');
const Project = require('../models/Project');
const ObjectId = require('mongoose').Types.ObjectId;
const router = express.Router();

router.get('/', (req, res) => {
  if(req.query.projectId){
    Hour.aggregate([
      {"$match" : {"project_id": new ObjectId(req.query.projectId)}}
    ]).then((hours) => {
      User.populate(hours, {path: "user_id"}).then((result) => {
        Hour.populate(result, {path: "project_id"}).then((final) => {
          res.json(final);
        })
      })
    })
  }else{
    Hour.find().populate('project_id').populate('user_id').then((hours) =>{
      res.json(hours);
    });
  }
});

router.get('/:id', (req, res) =>{
  Hour.findById(req.params.id).then((hour) =>{
    res.send(hour);
  })
});

router.post('/', (req, res) => {
  Hour.create({
    type: req.body.selectedHourType,
    total: req.body.total,
    project_id: req.body.selectedProject,
    user_id: req.body.userId
  }).then((hour) => {
    res.send(hour)
  })
});

// router.patch('/project/:projectId/users/:userId/hours/:hoursId', (req, res) => {
// router.patch('/', (req, res) => {
//   Project.findById(req.body.selectedProject).populate('projectUsers').then((project) => {
//   User.findOne({email:req.body.userEmail}).then((project) => {
//     project.projectUsers.forEach((user) => {
//       if (user.email == req.body.userEmail){
//         user.hours.forEach((hour, index) => {
//           if(hour.type == req.body.selectedHourType){
//             let mathTotal = req.body.totalTime + hour.total;
//             // user.hours[index] = {type: req.body.selectedHourType, total: mathTotal};
//             user.hours[index].type = req.body.selectedHourType;
//             user.hours[index].total = mathTotal;
//             user.save((err) => {
//               if (err) throw err;
//               res.send(project);
//             })
//             // user.hours.push({type: req.body.selectedHourType, total: mathTotal});
//           }
//         })
//       }
//     })
//
//   })
// });

module.exports = router;
