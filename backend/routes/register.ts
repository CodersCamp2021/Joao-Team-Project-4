import * as express from 'express'
let router = express.Router()
import User from '../model/User'
import bcrypt from 'bcryptjs'
import { registerValidation } from '../validation'

//REGISTER
router.post('/', async (req, res) => {
	//validate the data
	const { error } = registerValidation(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	//check if the user is already in the db
	const emailExist = await User.findOne({ email: req.body.email })
	if (emailExist)
		return res.status(400).send({ message: 'Email already exist' })

	//hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	//create a new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	})
	try {
		const savedUser = await user.save()
		if (savedUser) res.json({ message: 'Thanks for registering' })
	} catch (err) {
		res.status(404).send(err)
	}
})

export default router
