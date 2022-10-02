const {UserService} = require('../services/user-service')
const bcrypt = require('bcrypt');
const { sendHttpResponse } = require('../../share/utils/response-parser');



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
            sendHttpResponse(res, 'Empty body',400);
            return;
        }
        
        const user = await UserService.findUserByUsername(username)
        
        if(!user) {
            sendHttpResponse(res, 'Usuario no existe',400);
            return;
        }

        const result = await bcrypt.compare(password ,user.contrasena)

        if(result){
            sendHttpResponse(res,user,200);
            return
            
        }else {
            sendHttpResponse(res,'Contraseña no coincide',400);
            return;
            
        }
    }




}

exports.AuthController = new AuthController;