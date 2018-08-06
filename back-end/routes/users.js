const express = require('express');
const User = require('../models/User');
const router = express.Router();

/* Find user by ID */
router.get('/:id', (req, res) =>{
  User.findById(req.params.id).then((user) =>{
    res.send(user);
  })
});

/* Returns all users */
router.get('/', (req, res) => {
  User.find().then((users) =>{
    res.json(users);
  });
});

/* Update data from database */
router.put('/:id', (req,res) => {
  console.log(req.params.id, 'User ID');
  User.findOneAndUpdate({_id: req.params.id}, req.body).then((user) =>{
    // user.startTime = Date.now();
    console.log('!!!!!')
    console.log(user);
    res.send('Updated');
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send();
  });
});

/* Delete data from database */
router.delete('/:id', (req,res) => {
  User.findByIdAndRemove(req.params.id).then((user) =>{
    res.send('Deleted');
  });
});

module.exports = router;
