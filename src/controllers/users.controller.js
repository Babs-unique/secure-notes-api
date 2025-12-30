const User = require ('../models/users.models.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const signUp  = async(req , res) =>{
    const {email , name ,password} = req.body;
    try {
        if(!email || !name || !password){
            return res.status(400).json({Message : 'All fields are required'})
        }
        const existingUser = await User.findOne({email});
    
        if(existingUser) {
            return res.status(400).json({Message : 'User already exist kindly login'})
        }
    
        const hashedPassword = await bcrypt.hash(password , 10);
    
        const newUser = new User({
            name,
            password : hashedPassword,
            email
        })
        await newUser.save()
        return res.status(200).json({Message : 'User registered successfully'})
    } catch (error) {
        console.error('Internal Server Error', error);
        return res.status(500).json({Message  : ' Internal server error'})
    }
}


const login = async(req,res) =>{
    const {email , password} = req.body;
    try {
        if(!email || !password){
        return res.status(400).json({Message : 'All fields are required'})
    }
    const existingUser = await User.findOne({email})
    if(!existingUser){
        return res.status(400).json({Message : 'User not found , kindly signup'})
    }
    const isPasswordCorrect = await bcrypt.compare(password , existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({Message : 'Invalid credentials'})
    }
    const token = jwt.sign({userId : existingUser._id} , process.env.JWT_SECRET , {expiresIn  : '1h'})
    return res.status(200).json({Message : 'Login successful' , token})
    } catch (error) {
        console.error('Internal Server Error', error);
        return res.status(500).json({Message  : ' Internal server error'})
    }
}


module.exports = {signUp , login};