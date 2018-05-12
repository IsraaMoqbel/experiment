const path = require('path');
const express = require('express');
const router = express.Router();
const home = require('./home');
const userPage = require('./userPage');
const postPage = require('./postPage');
const signup = require('./signup');
const login = require('./login');


router.get('/', home.get);
router.post('/post', home.post);
router.post('/:id/comment', postPage.post);
router.get('/signup', signup.get);
router.post('/signup', signup.post);
router.get('/login', login.get);
router.post('/login', login.check);
router.get('/:name/:id', postPage.get);
router.get('/:name', userPage.get);





module.exports = router;
