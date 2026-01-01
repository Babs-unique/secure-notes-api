const express = require('express')
const auth = require("../config/auth");
const  {createNotes, getAllNotes, getNoteById, updateNote, deleteNote}  = require('../controllers/notes.controller');


const NotesRouter = express.Router()

NotesRouter.post('/createNote', auth , createNotes );
NotesRouter.get('/getNotes', auth , getAllNotes);
NotesRouter.get('/getNote/:id', auth , getNoteById);
NotesRouter.put('/updateNote/:id', auth , updateNote);
NotesRouter.delete('/deleteNote/:id', auth , deleteNote);
NotesRouter.post('/',(req,res)=>{
    res.status(200).json({Message: "Welcome to my notes homepage"})
})
module.exports = NotesRouter;