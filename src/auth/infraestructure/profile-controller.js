const {sendHttpResponse} = require('../../share/utils/response-parser');
const { findAllPermisionFromProfileId } = require('../domain/permission-repository');
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
        const accesses = await findAllPermisionFromProfileId(profile.id)
        profile.setDataValue('accesos', accesses)
        if(!profile) {
            sendHttpResponse(res, 'Error al buscar perfiles', 400, 'Error al buscar perfiles');
            return;
        }else {
            sendHttpResponse(res, profile, 200);
            return;
        }
    }

    

    
}

const getProfileAccesses = async (req,res) => {
    console.log('holaaaa');
    //const accesses = await findAllPermisionFromProfileId(req.user.profileId);
    sendHttpResponse(res,'alo', 200)

    

    
}


exports.getProfileAccesses = getProfileAccesses;
exports.getAllProfile = getAllProfile;