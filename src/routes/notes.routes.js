const express = require('express')
const auth = require("../config/auth");
const  {createNotes}  = require('../controllers/notes.controller');


const NotesRouter = express.Router()

NotesRouter.post('/createNote', auth , createNotes )
NotesRouter.post('/',(req,res)=>{
    res.status(200).json({Message: "Welcome to my notes homepage"})
})
module.exports = NotesRouter;