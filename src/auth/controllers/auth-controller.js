const {UserService} = require('../services/user-service')
const bcrypt = require('bcrypt');



class AuthController {

    addUser = async (req, res) => {
        const userData = req.body;

        if(!userData){
            res.status(400).json({
                message: 'body is empty'
            })
        }

        const userCreated = await UserService.addUser(userData)

        res.status(200).json(userCreated)
    }

    loginUser = async (req,res) => {
        const {username, password} = req.body;

        if (!username || !password) {
            res.status(400).json({
                message: 'body is empty'
            })
        }

        const user = await UserService.findUserByUsername(username)

        if(!user) {
            res.status(400).json({
                error: "user doesnt exists"
            })
        }

        const result = await bcrypt.compare(password ,user.contrasena)

        if(result){
            res.status(200).json(user)
        }else {
            res.status(400).json({
                error: "password doesnt match"
            })
        }
    }




}

exports.AuthController = new AuthController;