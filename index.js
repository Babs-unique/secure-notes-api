const express = require('express');
const noteDb = require('./src/config/db')
const app = express();
const morgan = require('morgan')
require('dotenv').config();


const userRoutes = require('./src/routes/users.routes');
const noteRoutes = require('./src/routes/notes.routes');
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(morgan('dev'));

noteDb();

app.get('/', (req, res) =>{
    res.send('Welcome to my notes API')

} )


app.use('/api/users' , userRoutes)
app.use('/api/notes', noteRoutes)


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`); 
    
})


