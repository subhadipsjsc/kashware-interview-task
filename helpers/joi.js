const Joi = require('joi');

const LoginUserschema = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
})

const validateLoginUser =  (userdata)=>{
    const result =  LoginUserschema.validate(userdata);
    return result;
}






const validateURL =  (url)=>{
    var URLexpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(URLexpression);
    if (url.match(regex)) {
       return({url,error:null})
    } else {
        return({url,error : 'not a valid url'})
    }
}

module.exports = {
    validateLoginUser,
    validateURL
}