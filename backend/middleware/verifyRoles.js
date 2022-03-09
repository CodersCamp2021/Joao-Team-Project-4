const verifyRoles = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req?.roles) return res.send('Not authorized').status(401)
		const rolesArray = [...allowedRoles]
		console.log(rolesArray)
		console.log(req.roles)
		const result = req.roles
			.map((role) => rolesArray.includes(role))
			.find((val) => val === true)
		if (!result) return res.send('You are not authorized').status(401)
		next()
	}
}

module.exports = verifyRoles
