import * as express from 'express'
let router = express.Router()
import User from '../model/User'
import jwt from 'jsonwebtoken'

router.get('/', async (req, res) => {
	const cookies = req.cookies
	console.log(cookies)
	if (!cookies?.jwt) return res.sendStatus(401)

	const refreshToken = cookies.jwt

	const foundUser = await User.findOne({ refreshToken }).exec()
	if (!foundUser) return res.status(403).send('No user in DB') //Forbidden
	// evaluate jwt
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET as string,
		(err: any) => {
			if (err) return res.sendStatus(403)

			const roles = Object.values(foundUser.roles)
			const accessToken = jwt.sign(
				{
					user_details: {
						email: foundUser.email,
						roles: roles,
					},
				},
				process.env.ACCESS_TOKEN_SECRET as string,
				{ expiresIn: '30s' }
			)

			res.json({ accessToken })
		}
	)
})

export default router
