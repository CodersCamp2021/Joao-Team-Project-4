import allowedOrigins from '../config/allowedOrigins'
import express from 'express'

const credentials = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
): void => {
	const origin = req.headers.origin
	if (allowedOrigins.includes(origin as string)) {
		res.header('Access-Control-Allow-Credentials', true as any) // ?
	}
	next()
}

export default credentials
