const { User, Profile, UserAccess } = require("./models")
const bcrypt = require('bcrypt');
const {sendHttpResponse} = require('../../share/utils/response-parser');
const { findAllAccessFromUserId } = require("./permission-repository");

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

    findUserById = async (id) => {
        const user = await User.findOne({
            where: {
                id: id
            }, 
            include: Profile
        },)
        const accesses = await findAllAccessFromUserId(id);
        user.setDataValue('accesos', accesses);
        
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

    saveUser = async (user) => {
        const userCreated = await User.create(user)
        return userCreated;
    }

    findAll = async () => {
        const users = await User.findAll();
        
        return users;
    }

    dataUpdateUser = async (id, data) => {
        try {
            const user = await User.findOne({where:{id:id}})
            if(!user) throw new Error('usuario no existe')
            if(data.password == "") {
                
                delete data.password;
                
            }else {

                data.password = await bcrypt.hash(data.password, 5)
            }
            return await user.update(data)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    
}



exports.userRepository = new UserRepositorySequelMySQL;