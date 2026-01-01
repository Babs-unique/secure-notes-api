const Notes = require('../models/notes.models')


const createNotes = async ( req, res) =>{
    const {title , content} = req.body;
    try {
        const userId = req.user.id;
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
const getAllNotes = async (req, res) =>{
    const userId = req.user.id;
    try {
        const notes = await Notes.find({user: userId});

        return res.status(200).json({notes})
    } catch (error) {
        console.log("Internal server Error", error);
        return res.status(500).json({Message: "Internal Server error"})
    }
}
const getNoteById = async (req, res) =>{
    const {id} = req.params;
    try {
        const note = await Notes.findById(id);
        if(!note){
            return res.status(404).json({Message: "Note not found"})
        }
        if(note.user.toString() !== req.user.id){
            return res.status(403).json({Message: "Access denied"})
        }
        return res.status(200).json({note});
    } catch (error) {
        console.log("Internal server Error", error);
        return res.status(500).json({Message: "Internal Server error"})
    }
}

const updateNote = async (req, res) =>{
    const {id} = req.params;
    try {
        const note = await Notes.findByIdAndUpdate(
            id,
            {title, content},
            {new: true}
        );
        if(!note){
            return res.status(404).json({Message: "Note not found"})
        }
        if(note.user.toString() !== req.user.id){
            return res.status(403).json({Message: "Access denied"})
        }
        return res.status(200).json({note});
    } catch (error) {
        console.log("Internal server Error", error);
        return res.status(500).json({Message: "Internal Server error"})
    }
}

const deleteNote = async (req, res) =>{
    const {id} = req.params;
    try {
        const note = await Notes.findByIdAndDelete(id);
        if(!note){
            return res.status(404).json({Message: "Note not found"})
        }
        if(note.user.toString() !== req.user.id){
            return res.status(403).json({Message: "Access denied"})
        }
        return res.status(200).json({Message: "Note deleted successfully"},note.length);
    } catch (error) {
        console.log("Internal server Error", error);
    }
}






module.exports = {createNotes, getAllNotes , getNoteById, updateNote, deleteNote}
