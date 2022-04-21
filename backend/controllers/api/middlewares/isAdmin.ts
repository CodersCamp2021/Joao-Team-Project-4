
import User from '../../../model/User'

module.exports = function (req: any , res: any, next: any) {
    User.findById(req.user._id, (err: any, user: any) => {
        if(err) {
            return res.status(500).send("Server error.")  
        }

        if(user.name != "administrator") {
            return res.status(401).send("Unauthorized.")
        } else {
            next()
        }

    })

    
}
