const {userRepository} = require('../domain/user-repository')
const {Profile, User} = require('../domain/models')
const bcrypt = require('bcrypt');
const { sendHttpResponse } = require('../../share/utils/response-parser');
const jwt = require("jsonwebtoken");
const {sequelize} = require('../../database/db-init')
const {login, updateUserData} = require('../application/auth-service')
const {add} = require('../application/auth-service');
const { findAllAccessFromUserId, createUserAccess, findAllPermissionsFromUserAndProfile, getAllPermissions } = require('../domain/permission-repository');
const { modifyUserPermissions } = require('../application/permissions-service');



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
            
            res.cookie('jwt',token,{httpOnly:false, sameSite: 'none', secure: false})
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

    getManagerUsers = async (req, res) => {
        try {
            const users = await userRepository.findAll()
            sendHttpResponse(res, users, 200)
            return
        } catch (e) {
            console.log(e)
            sendHttpResponse(res, 'Error', 500)
            return 
        }
    }

    userData = async (req, res) => {
        sendHttpResponse(res,'Authenticated', 200)
        return
    }

    userUpdateData = async (req,res) => {
        const {userId} = req.params;
        const data = req.body;
        try {
            if(userId){
                const permissions = await findAllPermissionsFromUserAndProfile(req.user.id,req.user.profileId)
                const auth = permissions.find((a) => a.name == "USUARIO_EDITAR");
                if(auth || (req.user.id == userId)){
                    const userUpdated = await updateUserData(userId, data)
                    sendHttpResponse(res,userUpdated,200)
                }else{
                    sendHttpResponse(res,'no tienen los permisos necesarios',403)
                }
                
            }else{
                
                sendHttpResponse(res,'userId no entregado',400)
            }    
        } catch (error) {
            sendHttpResponse(res,error.message, 400)
        }
        
    }


    getUserAccesses = async (req,res) => {
        const {userId} = req.params;
        if(!userId) {
            sendHttpResponse(res,'usuario no entregado',400)
        }else {
            const usuario = await userRepository.findUserById(userId)
            if(!usuario) {
                sendHttpResponse(res,'usuario no existe', 400)
            }else{
                const accessos = await findAllAccessFromUserId(userId);
                sendHttpResponse(res,accessos,200)
            }
            

        }
    }

    getAllUsers = async (req,res) => {
        try {

            const permissions = await findAllPermissionsFromUserAndProfile(req.user.id,req.user.profileId)
            const auth = permissions.find((a) => a.name == "USUARIO_VER");
            const {userId} = req.params;
            if(userId && (auth || userId == req.user.id)){
                const users = await userRepository.findUserById(userId)
                sendHttpResponse(res,users,200)    
            }else if (auth){
                console.log('hola');
                const users = await userRepository.findAll()
                sendHttpResponse(res,users,200)
            }else {
                sendHttpResponse(res,'No tienes los permisos necesarios',403)
            }
            
        } catch (error) {
            
        }
    }

    giveAccess = async(req,res) => {
        const {userId, permissionId} = req.body
        const resp = await createUserAccess(userId,permissionId)
        sendHttpResponse(res,resp,200)
    }

    modifyAccesses = async(req,res) => {
        const {userId} = req.params
        const {newAccesses} = req.body;
        if(!userId || !newAccesses){
            sendHttpResponse(res,'body incompleto', 400)
        }else {
            const currentPermissions = await findAllAccessFromUserId(userId)
            const updatedPermissions = await modifyUserPermissions(userId, currentPermissions,newAccesses);
            sendHttpResponse(res,updatedPermissions,200)
        }
    }

    allPermissions = async (req,res) => {
        try {
            const permissions = await getAllPermissions();
            sendHttpResponse(res,permissions,200)
        } catch (error) {
            sendHttpResponse(res,'error al obtener permisos',400)
        }
    } 




}

exports.AuthController = new AuthController;