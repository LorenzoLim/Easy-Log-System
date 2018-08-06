const express = require('express');
const { register, signIn, signJWTForUser} = require('../middleware/auth')

const router = new express.Router();

// Registration
router.post('/auth/register', register, signJWTForUser )

// Sign in
router.post('/auth', signIn, signJWTForUser)

module.exports = router;
