const jwt = require('jsonwebtoken')

const authMiddleware = async (req ,res , next) => {
    try {
        const token = await req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "unauthrized user" })
        }
        const decode =  jwt.verify(token , "jwt");
        req.userId = decode.userId;
        next();
    } catch (error) {
       console.log(`error in auth middle warw ${error}`);
       return res.status(402).json({message : "invalid token"});
    }
}

module.exports = authMiddleware;