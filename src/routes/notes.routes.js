const express = require('express')
const auth = require("../config/auth");
const  {createNotes}  = require('../controllers/notes.controller');


const notesRouter = express.Router()

notesRouter.post('/createNote', auth , createNotes )

module.exports = notesRouter;