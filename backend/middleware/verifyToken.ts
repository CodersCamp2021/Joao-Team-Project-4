
import jwt from 'jsonwebtoken'

import * as express from 'express'


import 'dotenv/config'


const verifyJWT = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const authHeader =
		<string>req.headers.authorization || <string>req.headers.Authorization
	if (!authHeader) return res.status(401).send('No auth')
	console.log(authHeader) // Bearer token
	const token = authHeader.split(' ')[1]
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET as any,
		(err: any, decoded: any) => {
			if (err) return res.status(403).send('Invalid token')
			req.user = decoded.user_details.email
			req.roles = decoded.user_details.roles
			next()
		}
	)
}

export default verifyJWT;
