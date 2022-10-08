const {UserService} = require('../application/user-service')
const {Profile} = require('../domain/models')
const bcrypt = require('bcrypt');
const { sendHttpResponse } = require('../../share/utils/response-parser');
const jwt = require("jsonwebtoken");
const {sequelize} = require('../../database/db-init')



class AuthController {

    addUser = async (req, res) => {
        try {
            const userData = req.body;

        if(!userData){
            res.status(400).json({
                message: 'body is empty'
            })
        }else{

            const check = await UserService.findUserByUsername(userData.username)
            if(check) {
                sendHttpResponse(res, 'nombre de usuario en uso')
            }else{
                const profile = await Profile.findOne({
                    where: {
                        name: userData.profile
                    }
                })
        
                if(!profile){
                    sendHttpResponse(res, 'perfil no existe')
                }else{

                    const userCreated = await UserService.addUser(userData)
                    if(!userCreated){
                        sendHttpResponse(res,'error al crear usuario')
                    }else {

                        const token = (jwt.sign({
                            id: userCreated.id,
                            username: userCreated.username
                        },process.env.SECRET_KEY))
            
                        res.cookie('jwt',token,{httpOnly:true})
                        console.log(token);
            
                        res.status(200).json(userCreated)

                    }
                }  
            }
        }
            
        } catch (error) {
            sendHttpResponse(res,'error interno de servidor')
        }
        
    }

    loginUser = async (req,res) => {

        try {
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
            const profile = await Profile.findOne({
                where: {
                    id: user.profileId
                }
            })
            user.setDataValue('userProfile', profile.name);
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
            
        } catch (error) {
            sendHttpResponse(res,'error interno de servidor')
        }
        
    }

    logOutUser = (req,res) => {

        try {
            const cookie = req.cookies['jwt']
            if(!cookie){
                sendHttpResponse(res,'Cookie no encontrada',400);
            }else {
                res.clearCookie('jwt')
                sendHttpResponse(res,'Sesion finalizada con exito',200);
            }
            
        } catch (error) {
            sendHttpResponse(res,'error interno de servidor')
        }
        
        

    }




}

exports.AuthController = new AuthController;