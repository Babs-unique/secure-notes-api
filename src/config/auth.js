const jwt = require('jsonwebtoken');
const User = require ('../models/users.models.js')


const authenticate = async (req, res , next) => {
    const header = req.headers.authorization;
    if(!header || !header.startsWith('Bearer ')){
        return res.status(401).json({Message: 'Unauthorized'})
    }

    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select('-password')
        if(!user){
            return res.status(401).json({Message:"User no found"})
        }
        req.user = user;

        next()
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({message : "Invalid Token"});
    }
}
module.exports = authenticate