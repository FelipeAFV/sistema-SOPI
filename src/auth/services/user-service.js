const { User, Profile } = require("../models/models")
const bcrypt = require('bcrypt');
const {sendHttpResponse} = require('../../share/utils/response-parser')

class UserServiceSequelMySQL{

    findUserByUsername = async (username) => {
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        
        /**Retorna nulo si no existe */
        return user;
    }
    
    findUsersByProfile = async (profile) => {
        const users = await User.findAll(
            { include: {
                model: Profile,
                where: {
                    name: profile
                }
            } }
            )
        return users;
    }
    
    
    addUser = async (userData) => {
        const date = new Date();
        const password = await bcrypt.hash(userData.password, 5)
        const newUser = await User.create({
            username: userData.username,
            password: password,
            expirationDate: date.setDate(date.getDate() + 31),
            firstname: userData.firstname,
            lastname: userData.lastname,
            mail: userData.mail,
        })
    
        const profile = await Profile.findOne({
            where: {
                name: userData.profile
            }
        })
    
        await newUser.setProfile(profile)


        newUser.setDataValue('userProfile', await newUser.getProfile());
    
        return newUser;
    
    
    }

}



exports.UserService = new UserServiceSequelMySQL;