const {sendHttpResponse} = require('../../share/utils/response-parser')
const {findAllProfile} = require('../domain/profile-repository')


const getAllProfile = async (req,res) => {
    const profiles = await findAllProfile();

    if(!profiles) {
        sendHttpResponse(res, 'Error al buscar perfiles', 400, 'Error al buscar perfiles');
        return;
    }else {
        sendHttpResponse(res, profiles, 200);
        return;
    }
}


exports.getAllProfile = getAllProfile;