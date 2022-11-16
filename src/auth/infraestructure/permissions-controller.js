const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findAllPermissionsFromUserAndProfile } = require("../domain/permission-repository");
const { userRepository } = require("../domain/user-repository");


const getUserPermissions = async (req, res) => {

    try {
        const { userId } = req.params;

        if (userId) {
            const user = await userRepository.findUserById(userId);
            if (!user) {
                sendHttpResponse(res, 'Error', 400, `Usuario con id ${userId} no existe`)
            }

            const permissions = await findAllPermissionsFromUserAndProfile(user.id, user.profile.id);
            

            sendHttpResponse(res, permissions, 200);
            
        } else {
            
            
            const { user } = req;
            const permissions = await findAllPermissionsFromUserAndProfile(user.id, user.profileId);
            sendHttpResponse(res, permissions, 200);

        }
    } catch (e) {
        sendHttpResponse(res, 'Error', 500, 'Error al consultar permisos');
    }
}

exports.getUserPermissions = getUserPermissions;