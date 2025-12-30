const express = require('express');


const UserRouter = express.Router();

const {signUp , login} = require('../controllers/users.controller');

UserRouter.post('/signup' , signUp);
UserRouter.post('/login' , login);




module.exports = UserRouter;