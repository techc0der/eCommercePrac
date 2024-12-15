const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    console.log(authorization);
    const token = authorization.split(' ')[1];
    console.log(token);
    if (!token) res.status(400).json({ error: "Unauthorized" });
    try {
        const response = await jwt.verify(token,process.env.tokenKey);
        req.user = response;
        next();
    } catch (error) {
        res.status(500).json({error:error});
    }
}
const GenerateToken = async (user)=>{
    const token  = await jwt.sign(user,process.env.tokenKey);
    return token;
}
module.exports = {verifyToken,GenerateToken};
