const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    title :{
        type  :String ,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    user : {
        type :  mongoose.Schema.Types.ObjectId,
        required : true
    }
},
    {
        timestamps : true,
        versionKey  : false
    }
)




const notes = mongoose.model('Notes' , noteSchema);

module.exports = notes;