const { findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");
const { userRepository } = require("../../auth/domain/user-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { ApiValidationError } = require("../domain/api-errors");
const { saveManager, findManager, findAllManager, findAllManagers } = require("../domain/manager-repository");

const addManagerForSopi = async ({managerId, purchaseId, profileId}) => {
    
    const user = await userRepository.findUserById(managerId);
    console.log(user);
    const permissions = await findAllPermissionsFromUserAndProfile(managerId, profileId);



    if ( !permissions.find((p) => p.name == 'RESPONSABLE_ASIGNABLE')) {
        throw new ApiValidationError('El usuario no tiene el perfil gestor_compra');
        
    }
    
    const existingManager = await findManager({managerId, purchaseId});
    if (existingManager) {

        throw new ApiValidationError(`El gestor ya se encuentra asociado a la compra con id ${purchaseId}`);

    }

    const manager = await saveManager({userId: managerId, purchaseId});

    return manager;
}

const findPossibleManagers = async () => {
    try {
        const newUsers = []
        const users = await userRepository.findAll();
        for (const i of users) {
            const permissions = await findAllPermissionsFromUserAndProfile(i.id, i.profileId)
            if(permissions.find(e => e.name == 'RESPONSABLE_ASIGNABLE')) newUsers.push(i)
        }
        return newUsers
        
        
    } catch (error) {
        throw new Error('Error al buscar managers')
    }
}

const findAllManagerInPurchase = async (id) => {
    try {
        const managersArray = [];
        const managers = await findAllManagers(id)
        managers.forEach(e => {
            managersArray.push({
                id: e.id,
                userId: e.userId,
                username:e.user.username,
                firstname: e.user.firstname,
                lastname: e.user.lastname,
                mail:e.user.mail,
                profileId: e.user.profileId
            })
        });
        return managersArray;
    } catch (error) {
        throw new Error(error.message)
    }
};

exports.findAllManagerInPurchase = findAllManagerInPurchase;
exports.findPossibleManagers = findPossibleManagers;
exports.addManagerForSopi = addManagerForSopi;