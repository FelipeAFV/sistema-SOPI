const bcrypt = require('bcrypt');
const { sendHttpResponse } = require('../../share/utils/response-parser');
const { userRepository } = require('../domain/user-repository');

// const addUser = async (req, res) => {
    
//     try {
//         const {username, password, firstname, lastname, mail, profileId} = req.body;
    
//         const hashedPass = await bcrypt.hash(password, 5)
    
//         const user = await userRepository.saveUser({username, password: hashedPass, firstname, lastname, mail, profileId});
    
//         sendHttpResponse(res, user, 200);
        
//     } catch (e) {
//         console.log(e)
//         sendHttpResponse(res, 'Error', 200, 'Error al crear usuario');

//     }



// }


// exports.addUser = addUser;