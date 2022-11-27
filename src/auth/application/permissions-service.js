const { removeUserAccess, findAllAccessFromUserId, createUserAccess } = require("../domain/permission-repository");



const modifyUserPermissions = async (userId,currentPermissions, updatedPermissions) => {
    //Removemos permisos que no esten presentes en el array enviado
    await currentPermissions.forEach(async e => {
        if(!updatedPermissions.find( a => a.id == e.permissionId)) await removeUserAccess(userId,e.permissionId)

        
    });
    await updatedPermissions.forEach(async e => {
        if(!currentPermissions.find( a => a.permissionId == e.id)) await createUserAccess(userId,e.id)

        
    });


    return await findAllAccessFromUserId(userId)
}

exports.modifyUserPermissions = modifyUserPermissions;