var jwt = require('jsonwebtoken');
const config = require('../config');


createAccessToken= (payload)=>{
    return jwt.sign(payload, config.jwt.secret, {
        algorithm: "HS256",
        expiresIn: parseInt(config.jwt.accessExpirationMinutes)*60
    })
}

validateAccessToken = (req, res, next)=>{
   
    if (typeof req.headers.authorization  != 'undefined' ) {

        authorizationHeaderArray = req.headers.authorization.split(' ');
       
        if( authorizationHeaderArray[0] && authorizationHeaderArray[0] === 'Bearer' && authorizationHeaderArray[1] && authorizationHeaderArray[1].length > 20 ){
            let token = authorizationHeaderArray[1];
            jwt.verify(token, config.jwt.secret, function(err, decoded) {
                
                if(err){
                  
                    
                    return res.status(401).send({
                        success : 0,
                        Message : "Session auhentication error",
                        error : err
                    })
                    
                }
                else{
                    
                    
                    res.locals.authuser = decoded;  
                    return next();
                }
                
            });
        }
        else{
            return res.status(401).send({
                success : 0,
                error : "Authentication Header not valid"
            }) 
        }
        
    } else {
        return res.status(401).send({
            success : 0,
            error : "Authentication Header is not available"
        })
    }
    
}


module.exports = {
    createAccessToken,
    validateAccessToken
}
