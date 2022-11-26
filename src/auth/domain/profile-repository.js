const {Profile, User} = require('./models')


const findAllProfile = async () => {
    try {
        const profiles = await Profile.findAll();
        return profiles;
    } catch (e) {
        return null;
    }
    
}

const findProfileById = async (profileId) => {
    try {
        const profile = await Profile.findOne({where:{id:profileId}});
        const permissions = await profile.getPermissions();
        const permisos = [];
        permissions.forEach(e => {
            permisos.push({permisoId: e.id, nombrePermiso:e.name})
        });
        profile.setDataValue('permisos', permisos)
        return profile;
    } catch (e) {
        return null;
    }
    
}
const findProfileFromUser = async (userId) => {
    return await Profile.findOne({ include: [{model: User, where: { id: userId}}]});
} 

exports.findProfileById = findProfileById;
exports.findAllProfile = findAllProfile;
exports.findProfileFromUser = findProfileFromUser;