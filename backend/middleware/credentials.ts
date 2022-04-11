export{};
const allowedOrigins = require('../config/allowedOrigins')

const credentials = (req: any, res: any, next: any) => {
	const origin = req.headers.origin
	if (allowedOrigins.includes(origin)) {
		res.header('Access-Control-Allow-Credentials', true)
	}
	next()
}

module.exports = credentials
