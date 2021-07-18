  
const jwt = require('jsonwebtoken');

userAuthVerify=(req, res, next)=> {
    const token = req.header('auth-token');
    if(!token) return   res.json({"message":"acces denied"});    
    //verify token
    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified
        next()
    }catch(err){
        res.json({"auth error":err});
    }

}

module.exports = userAuthVerify;