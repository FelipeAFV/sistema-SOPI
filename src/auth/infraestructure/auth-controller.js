const {userRepository} = require('../domain/user-repository')
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

            const check = await userRepository.findUserByUsername(userData.username)
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

                    const userCreated = await userRepository.addUser(userData)
                    if(!userCreated){
                        sendHttpResponse(res,'error al crear usuario')
                    }else {

                        const token = (jwt.sign({
                            id: userCreated.id,
                            username: userCreated.username
                        },process.env.SECRET_KEY))
            
                        res.cookie('jwt',token,{httpOnly:true})
                        console.log(token);

                        const req_response = {
                            username: userCreated.username,
                            firstname: userCreated.firstname,
                            lastname: userCreated.lastname,
                            mail: userCreated.mail,
                            profile: profile                        
                        }
                        
                        sendHttpResponse(res,req_response,200)

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
        
        const user = await userRepository.findUserByUsername(username)
        
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
            const token = (jwt.sign({
                id: user.id,
                username: user.username
            },process.env.SECRET_KEY))
    
            const req_response = {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                mail: user.mail,
                profile: profile
            }
            res.cookie('jwt',token,{httpOnly:true})
            sendHttpResponse(res,req_response,200);
            return
            
        }else {
            sendHttpResponse(res,'Contraseña no coincide',400);
            return;
            
        }
            
        } catch (error) {
            console.log(e)
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