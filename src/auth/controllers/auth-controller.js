const {UserService} = require('../services/user-service')


class AuthController {

    addUser = async (req, res) => {
        const userData = req.body;

        if(!userData){
            res.status(400).json({
                message: 'body is empty'
            })
        }

        const userCreated = await UserService.addUserSequelMySQL(userData)

        res.status(200).json(userCreated)
    }




}

exports.AuthController = new AuthController;