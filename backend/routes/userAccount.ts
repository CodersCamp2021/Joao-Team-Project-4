import * as express from 'express'
let router = express.Router()
import User from '../model/User'
import ROLES_LIST from '../config/roles_list'
import verifyRoles from '../middleware/verifyRoles'

router.get('/', verifyRoles(ROLES_LIST.User), (req, res) => {
	res.json(req.user)
	User.findOne({ user: req.user })
})

export default router
