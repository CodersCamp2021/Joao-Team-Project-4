export{};
//VALIDATION
const Joi = require('@hapi/joi')

//register validation
const registerValidation = (data: any) => {
	const schema = {
		name: Joi.string().min(3).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	}
	return Joi.validate(data, schema)
}

//login validation
const loginValidation = (data: any) => {
	const schema = {
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	}
	return Joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
