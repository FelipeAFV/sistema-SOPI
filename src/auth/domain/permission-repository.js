const { Profile, UserAccess, Permission } = require("./models")
const {sequelize} = require('../../database/db-init')

const findAllPermisionFromProfileId = async (profileId) => {
    const profile = await Profile.findOne({where: { id: profileId}});
    const permissions = await profile.getPermissions();
    return permissions;

} 

const findAllPermissionsFromUserAndProfile = async (userId, profileId) => {
    const [permissions, metadata] = await sequelize.query({query: 'select p.id, p.nombre from permisos p right join accesos_usuario au on p.id = au.permiso_id where au.usuario_id = ? union (select pp.id, pp.nombre  from permisos pp right join accesos a on pp.id = a.permiso_id where a.perfil_id = ?) order by id;'},
     { replacements: [userId, profileId]})
    return permissions.map((permission) => { 
        return {id: permission.id, name: permission.nombre }});

}

const findAllAccessFromUserId = async (userId) => {
    const accesses = await UserAccess.findAll({where: { userId: userId}});
    return accesses;

}

const createUserAccess = async (userId,permissionId) => {
    const accesses = await UserAccess.create({userId:userId, permissionId:permissionId})
    return accesses;
}

const removeUserAccess = async (userId,permissionId) => {
    const accesses = await UserAccess.destroy({where:{userId:userId, permissionId:permissionId}})
    return accesses;
}

const getAllPermissions = async () => {
    const permssions = await Permission.findAll();
    return permssions
}



exports.getAllPermissions = getAllPermissions;
exports.removeUserAccess = removeUserAccess;
exports.createUserAccess = createUserAccess;
exports.findAllAccessFromUserId = findAllAccessFromUserId
exports.findAllPermisionFromProfileId = findAllPermisionFromProfileId; 
exports.findAllPermissionsFromUserAndProfile = findAllPermissionsFromUserAndProfile;