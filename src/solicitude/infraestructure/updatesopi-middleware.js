const { userRepository } = require("../../auth/domain/user-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findStatusById } = require("../domain/sopistatus-repository");

const verifyUpdatePermissions = () => {
    return async (req, res, next) => {

        const {statusId} = req.body;
        const status = await findStatusById(statusId);
        const user = await userRepository.findUserByUsername(req.user.username);

        const profile = user.profile;

        console.log(profile)
        console.log('status ', status)

        if (profile.name == 'referente' && status.name != 'REVISADO_REFERENTE') {
            sendHttpResponse(res, 'No puedes ejecutar esta accion', 403);
            return;
        }
        next();
    }
}

exports.verifyUpdatePermissions = verifyUpdatePermissions;