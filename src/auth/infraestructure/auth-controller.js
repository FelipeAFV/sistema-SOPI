const {userRepository} = require('../domain/user-repository')
const {Profile} = require('../domain/models')
const bcrypt = require('bcrypt');
const { sendHttpResponse } = require('../../share/utils/response-parser');
const jwt = require("jsonwebtoken");
const {sequelize} = require('../../database/db-init')
const {login} = require('../application/auth-service')
const {add} = require('../application/auth-service')



class AuthController {

    addUser = async (req,res) => {
        try {
            const resp = await add(req.body)
            sendHttpResponse(res, resp,200)

            
        } catch (error) {

            sendHttpResponse(res, 'Error al registrarse', 500, error.message || '');
            
        }
    }

    loginUser = async (req,res) => {
        try {

            const resp = await login(req.body)
            const token = (jwt.sign({
                id: resp.id,
                username: resp.username,
                profileId: resp.profile.id
            },process.env.SECRET_KEY, { expiresIn: '8h'}))  
            
            res.cookie('jwt',token,{httpOnly:true})
            sendHttpResponse(res, resp,200)
        } catch (error) {
            sendHttpResponse(res, 'Error al ingresar', 500, error.message || '');
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