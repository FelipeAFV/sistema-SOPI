const { userRepository } = require("../../auth/domain/user-repository");
const { ApiValidationError } = require("../domain/api-errors");
const { saveManager } = require("../domain/manager-repository");

const addManagerForSopi = async ({managerId, purchaseId}) => {

    const user = await userRepository.findUserById(managerId);
    console.log(user);
    if (user.profile.name != 'gestor_compra') {
        throw new ApiValidationError('El usuario no tiene el perfil gestor_compra');

    }

    const manager = await saveManager({userId: managerId, purchaseId});

    return manager;
}

exports.addManagerForSopi = addManagerForSopi;