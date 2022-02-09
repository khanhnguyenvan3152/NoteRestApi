const Joi = require('joi')

const validateRegister = function(data){
    const schema = new Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    return schema.validate(data)
}

const validateLogin = function(data){
    const schema = new Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports = {validateLogin,validateRegister}