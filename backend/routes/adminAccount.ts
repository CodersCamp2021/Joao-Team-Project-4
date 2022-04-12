import * as express from 'express'
let router = express.Router()
import { Request, Response } from 'express'
import User from '../model/User'
import ROLES_LIST from '../config/roles_list'
import verifyRoles from '../middleware/verifyRoles'

router.get(
	'/',
	verifyRoles(ROLES_LIST.Admin),
	(req: Request, res: Response) => {
		res.json(req.user)
		User.findOne({ user: req.user })
	}
)

module.exports = router
