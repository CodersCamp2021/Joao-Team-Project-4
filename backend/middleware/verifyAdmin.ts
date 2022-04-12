import User from '../model/User'
import * as express from 'express'

module.exports = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const user = await User.findOne({ email: req.body.email })

	if (user.roles.Admin !== 'Admin') res.status(400).send('Access Denied')

	try {
		next()
	} catch (err) {
		res.status(400).send('Invalid role')
	}
}
