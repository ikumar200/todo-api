const jwt =require('jsonwebtoken');

const data={
    id:user.id
}
const jwtSecret=process.env.JWT_SECRET;
const generateToken=(user)=>{
    return jwt.sign(data,jwtSecret);
};

const verifyToken=(token)=>{
    return jwt.verify(token,jwtSecret);
};

module.exports={generateToken,verifyToken};