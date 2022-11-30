const { findAllPermisionFromProfileId, findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");
const { userRepository } = require("../../auth/domain/user-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findSopi, getSopiFromPurchaseManager } = require("../domain/sopi-repository");
const { findStatusById } = require("../domain/sopistatus-repository");

const verifyUpdateStatusPermissions = () => {
    return async (req, res, next) => {



        const { statusId } = req.body;

        if (!statusId) {
            next();
            return;
        }


        const status = await findStatusById(statusId);
        if (!status) {
            sendHttpResponse(res, `No existe el estado con id ${statusId}`, 400);
            return;

        }
        const user = await userRepository.findUserByUsername(req.user.username);

        const profile = await user.profile;

        const permissions = await findAllPermissionsFromUserAndProfile(user.id, profile.id);

        const sopiPermissions = permissions.filter(p => p.name.includes('SOPI'))

        let hasPermission = false;
        for (let permission of sopiPermissions) {
            if (permission.name.includes(status.name)) {
                hasPermission = true;
                break;
            }

        }

        if (!hasPermission) {
            sendHttpResponse(res, 'No puedes ejecutar esta accion', 403);
            return;
        }
        next();
        return;
    }
}

const sopiDetailPermission = () => {
    return async (req, res, next) => {
        const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId);
        const viewAll = permissions.find((permission) => permission.name == 'SOPI_VER');

        if (!req.params.sopiId) {
            sendHttpResponse(res, 'Error', 400, 'Debes enviar el {sopiId}')
            return;
        }
        if (viewAll) {
            console.log('View all ', viewAll)
            next();
            return;

        }
        const ownerPermission = permissions.find((permission) => permission.name == 'SOPI_VER_CREADOR');
        const managerPermission = permissions.find((permission) => permission.name == 'SOPI_VER_COMPRA_GESTOR');
        const requestedSopi = await findSopi({ id: req.params.sopiId });

        if (!requestedSopi) {
            sendHttpResponse(res, 'Error', 400, 'Sopi no existe')
            return;
        }
        if (ownerPermission && (requestedSopi.userId != req.user.id)) {
            sendHttpResponse(res, 'Error', 403, 'No tienes los permisos necesarios')
            return;
        }

        if (managerPermission) {

            try {
                const sopisManager = await getSopiFromPurchaseManager(req.user.id);
                console.log(sopisManager)

                if (!sopisManager.find(s => s.id == requestedSopi.id)) {
                    sendHttpResponse(res, 'Error', 403, 'No tienes los permisos necesarios')
                    return;
                }
            } catch (e) {
                console.log('Error', e)
            }
        }


        const sopiStatusPermission = permissions.filter(permision => permision.name.includes('SOPI_VER_ESTADO'));

        if (sopiStatusPermission.length == 0 && !managerPermission && !ownerPermission) {
            sendHttpResponse(res, 'Error', 403, 'No tienes los permisos necesarios')
            return

        } else if (sopiStatusPermission.length > 0 && !sopiStatusPermission.find(p => p.name.includes(requestedSopi.status.name))) {

            sendHttpResponse(res, 'Error', 403, 'No tienes los permisos necesarios')
            return

        }

        next();

    }
}


const sopiDetailPermission2 = () => {
    return async (req, res, next) => {
        const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId);
        const viewAll = permissions.find((permission) => permission.name == 'SOPI_VER');
        const view = permissions.find((permission) => permission.name == 'SOPI_EDITAR_ESTADO_REVISADO_REFERENTE');

        if (!req.params.sopiId) {
            sendHttpResponse(res, 'Error', 400, 'Debes enviar el {sopiId}')
            return;
        }
        if (viewAll) {
            console.log('View all ', viewAll)
            next();
            return;

        }
        if(view) {
            
            next();
            return;
        }
        const requestedSopi = await findSopi({ id: req.params.sopiId });

        if (!requestedSopi) {
            sendHttpResponse(res, 'Error', 400, 'Sopi no existe')
            return;
        }
    
        if (requestedSopi.userId != req.user.id) {
            sendHttpResponse(res, 'Error', 403, 'No tienes los permisos necesarios')
            return;
        }
        next();

       

    }
}
exports.verifyUpdateStatusPermissions = verifyUpdateStatusPermissions;
exports.sopiDetailPermission = sopiDetailPermission2;