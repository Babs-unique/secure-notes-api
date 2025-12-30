const express = require('express')
const app = express();


const notesRouter = express.Router()


app.get('/',(req,res)=>{
    res.send('Welcome to the notes routes')
})


module.exports = notesRouter;