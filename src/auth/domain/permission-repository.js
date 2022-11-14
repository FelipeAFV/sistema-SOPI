const { Profile } = require("./models")
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

exports.findAllPermisionFromProfileId = findAllPermisionFromProfileId; 
exports.findAllPermissionsFromUserAndProfile = findAllPermissionsFromUserAndProfile;