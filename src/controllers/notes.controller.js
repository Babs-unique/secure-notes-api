const Notes = require('../models/notes.models')


const createNotes = async ( req, res) =>{
    const {title , content} = req.body;
    try {
        const userId = req.user.id;
        console.log(userId)
        if(!userId) {
            return res.status(401).json({Message: "User not logged In/ User not found"})
        }
        const newNote = new Notes({
            title,
            content,
            user : userId
        })
        await newNote.save();
        return res.status(200).json({Message : 'Notes Created Successfully'})
    } catch (error) {
        console.log("Internal server Error", error);
        return res.status(500).json({Message: "Internal Server error"})
    }
}






module.exports = {createNotes}
