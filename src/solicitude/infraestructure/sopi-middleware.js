const { findAllPermisionFromProfileId, findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");
const { userRepository } = require("../../auth/domain/user-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findSopi } = require("../domain/sopi-repository");
const { findStatusById } = require("../domain/sopistatus-repository");

const verifyUpdateStatusPermissions = () => {
    return async (req, res, next) => {

        const {statusId} = req.body;


        const status = await findStatusById(statusId);
        const user = await userRepository.findUserByUsername(req.user.username);

        const profile = await user.profile;

        const permissions = await findAllPermisionFromProfileId(profile.id);

        let hasPermission = false;
        for (let permission of permissions) {
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
    }
}

const sopiDetailPermission = () => {
    return async (req, res, next) => {
        const permissions = await findAllPermissionsFromUserAndProfile(req.user.profileId);
        const viewAll = permissions.find((permission) => permission == 'SOPI_VER');

        if (viewAll) {
            next();
        }
        const ownerPermission = permissions.find((permission) => permission.name == 'SOPI_VER_CREADOR');
        const sopi = await findSopi({id: req.params.sopiId});

        if (ownerPermission) {

            if (!req.params.sopiId) {
                sendHttpResponse(res, 'Error',400, 'Debes enviar el {sopiId}')
                return;
            }
            
            if (!sopi) {
                sendHttpResponse(res, 'Error',400, 'Sopi no existe')
                return;
            }
            
            console.log(req.user)
            if (sopi.userId != req.user.id) {
                
                sendHttpResponse(res, 'Error',403, 'No tienes los permisos necesarios')
                return;
            }
        }
        
        const sopiStatusPermission = permissions.filter(permision => permision.name.includes('SOPI_VER_ESTADO'));
        
        if (sopiStatusPermission.length > 0) {
            let statusPermission = sopiStatusPermission.find(permission => permission.name = sopi.status.name);
            if (!statusPermission) {
                
                sendHttpResponse(res, 'Error',403, 'No tienes los permisos necesarios')
                return
            }
        }

        next();

    }
}

exports.verifyUpdateStatusPermissions = verifyUpdateStatusPermissions;
exports.sopiDetailPermission = sopiDetailPermission;