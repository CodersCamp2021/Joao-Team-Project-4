import * as express from 'express'

const verifyRoles = (
	...allowedRoles: number[]
): ((
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => any) => {
	return (req, res, next) => {
		if (!req?.roles) return res.status(401).send('Not authorized')
		const rolesArray = [...allowedRoles]
		console.log(rolesArray)
		console.log(req.roles)
		const result: boolean = req.roles
			.map((role: number): boolean => rolesArray.includes(role))
			.find((val: boolean) => val === true)
		if (!result) return res.status(401).send('You are not authorized')
		next()
	}
}

export default verifyRoles
