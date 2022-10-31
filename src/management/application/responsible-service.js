const { userRepository } = require("../../auth/domain/user-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { ApiValidationError } = require("../domain/api-errors");
const { saveManager, findManager } = require("../domain/manager-repository");

const addManagerForSopi = async ({managerId, purchaseId}) => {
    
    const user = await userRepository.findUserById(managerId);
    console.log(user);

    if (user.profile.name != 'gestor_compra') {
        throw new ApiValidationError('El usuario no tiene el perfil gestor_compra');
        
    }
    
    const existingManager = await findManager({managerId, purchaseId});
    if (existingManager) {

        throw new ApiValidationError(`El gestor ya se encuentra asociado a la compra con id ${purchaseId}`);

    }

    const manager = await saveManager({userId: managerId, purchaseId});

    return manager;
}

exports.addManagerForSopi = addManagerForSopi;