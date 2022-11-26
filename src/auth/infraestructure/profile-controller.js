const {sendHttpResponse} = require('../../share/utils/response-parser')
const {findAllProfile, findProfileById} = require('../domain/profile-repository')


const getAllProfile = async (req,res) => {

    const {profileId} = req.params;
    if(!profileId){
        const profiles = await findAllProfile();
        if(!profiles) {
            sendHttpResponse(res, 'Error al buscar perfiles', 400, 'Error al buscar perfiles');
            return;
        }else {
            sendHttpResponse(res, profiles, 200);
            return;
        }
    }else {
        const profile = await findProfileById(profileId)
        if(!profile) {
            sendHttpResponse(res, 'Error al buscar perfiles', 400, 'Error al buscar perfiles');
            return;
        }else {
            sendHttpResponse(res, profile, 200);
            return;
        }
    }

    

    
}




exports.getAllProfile = getAllProfile;