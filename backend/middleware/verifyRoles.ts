const verifyRoles = (...allowedRoles: any[]) => {
	return (req: any, res: any, next: any): any => {
		if (!req?.roles) return res.status(401).send('Not authorized')
		const rolesArray = [...allowedRoles]
		console.log(rolesArray)
		console.log(req.roles)
		const result = req.roles
			.map((role: any) => rolesArray.includes(role))
			.find((val: any) => val === true)
		if (!result) return res.status(401).send('You are not authorized')
		next()
	}
}

module.exports = verifyRoles
