const { User, Profile } = require("./models")
const bcrypt = require('bcrypt');
const {sendHttpResponse} = require('../../share/utils/response-parser')

class UserRepositorySequelMySQL{

    findUserByUsername = async (username) => {
        const user = await User.findOne({
            where: {
                username: username
            }, 
            include: Profile
        },)
        
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

    
        return newUser;
    
    
    }

}



exports.userRepository = new UserRepositorySequelMySQL;