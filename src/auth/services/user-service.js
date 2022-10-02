const { Usuario, Perfil } = require("../models/models")
const bcrypt = require('bcrypt');

class UserServiceSequelMySQL{

    findUserByUsername = async (username) => {
        const user = await Usuario.findOne({
            where: {
                usuario: username
            }
        })
        /**Retorna nulo si no existe */
        return user;
    }
    
    findUsersByProfile = async (profile) => {
        const users = await Usuario.findAll(
            { include: {
                model: Perfil,
                where: {
                    tipo: profile
                }
            } }
            )
        return users;
    }
    
    
    addUser = async (userData) => {
        const date = new Date();
        const password = await bcrypt.hash(userData.contrasena, 5)
        const newUser = await Usuario.create({
            usuario: userData.usuario,
            contrasena: password,
            fecha_expiracion: date.setDate(date.getDate() + 31),
            nombre: userData.nombre,
            apellido: userData.apellido,
            mail: userData.mail,
        })
    
        const profile = await Perfil.findOne({
            where: {
                tipo: userData.perfil
            }
        })
    
        await newUser.setPerfil(profile)


        newUser.setDataValue('userProfile', await newUser.getPerfil());
    
        return newUser;
    
    
    }

}



exports.UserService = new UserServiceSequelMySQL;