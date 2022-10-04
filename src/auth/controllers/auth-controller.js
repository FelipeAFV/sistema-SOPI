const {UserService} = require('../services/user-service')
const bcrypt = require('bcrypt');
const { sendHttpResponse } = require('../../share/utils/response-parser');
const jwt = require("jsonwebtoken");



class AuthController {

    addUser = async (req, res) => {
        const userData = req.body;

        if(!userData){
            res.status(400).json({
                message: 'body is empty'
            })
        }

        const userCreated = await UserService.addUser(userData)

        const token = (jwt.sign({
            id: userCreated.id,
            username: userCreated.username
        },process.env.SECRET_KEY))

        res.cookie('jwt',token,{httpOnly:true})
        console.log(token);

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

        const result = await bcrypt.compare(password ,user.password)

        if(result){
            const token = (jwt.sign({
                id: user.id,
                username: user.username
            },process.env.SECRET_KEY))
    
            res.cookie('jwt',token,{httpOnly:true})
            sendHttpResponse(res,user,200);
            return
            
        }else {
            sendHttpResponse(res,'Contraseña no coincide',400);
            return;
            
        }
    }

    logOutUser = (req,res) => {
        const cookie = req.cookies['jwt']
        if(!cookie){
            sendHttpResponse(res,'Cookie no encontrada',400);
        }else {
            res.clearCookie('jwt')
            sendHttpResponse(res,'Sesion finalizada con exito',200);
        }
        

    }




}

exports.AuthController = new AuthController;