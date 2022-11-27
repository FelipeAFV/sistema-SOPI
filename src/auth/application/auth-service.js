const {userRepository} = require('../domain/user-repository')
const {Profile} = require('../domain/models')
const bcrypt = require('bcrypt');


const login = async ({username, password}) => {
    try {
        

    if (!username || !password) {
        throw new Error('Body vacio')
    }
    
    const user = await userRepository.findUserByUsername(username)
    console.log(user)
    
    if(!user) {
        throw new Error('Usuario no existe')
    }


    const result = await bcrypt.compare(password ,user.password)

    if(result){
        const profile = await Profile.findOne({
            where: {
                id: user.profileId
            }
        })
        

        const req_response = {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            mail: user.mail,
            profile: profile
        }
        //res.cookie('jwt',token,{httpOnly:true})
        return req_response
        
    }else {
        throw new Error('contrasena no coincide')
        
    }
        
    } catch (error) {
        throw new Error(error.message)
    }
}

const add = async (userData) => {
    try {
        

    if(!userData){
        throw new Error('Body vacio')
    }else{

        const check = await userRepository.findUserByUsername(userData.username)
        if(check) {
            throw new Error('nombre de usuario en uso')
        }else{
            const profile = await Profile.findOne({
                where: {
                    name: userData.profile
                }
            })
    
            if(!profile){
                throw new Error('Perfil no existe')
            }else{

                const userCreated = await userRepository.addUser(userData)
                if(!userCreated){
                    throw new Error('error al crear usuario')
                }else {


                    const req_response = {
                        username: userCreated.username,
                        firstname: userCreated.firstname,
                        lastname: userCreated.lastname,
                        mail: userCreated.mail,
                        profile: profile                        
                    }
                    
                    return req_response;

                }
            }  
        }
    }
        
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateUserData = async (userId,data) => {

    try {
        if(data.username){
            const user = await userRepository.findUserByUsername(data.username)
            console.log(user);
            if(user){
                if(user.id != userId) throw new Error('nombre de usuario en uso')
            } 
        }
        const updatedUser = await userRepository.dataUpdateUser(userId, data)
        return updatedUser
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.updateUserData = updateUserData;
exports.login = login;
exports.add = add;