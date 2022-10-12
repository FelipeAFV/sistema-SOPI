const { findAllPermisionFromProfileId } = require("../../auth/domain/permission-repository");
const { userRepository } = require("../../auth/domain/user-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");
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

exports.verifyUpdateStatusPermissions = verifyUpdateStatusPermissions;