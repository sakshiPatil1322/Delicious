const jwt = require('jsonwebtoken');
const secretKey = "jujutsu";


function setUser(user){
    return jwt.sign(user,secretKey,{expiresIn: '900s'});
}

function getUser(token){
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null; 
    }
}

module.exports = {
    setUser,
    getUser,
}