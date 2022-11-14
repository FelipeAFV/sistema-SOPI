const jwt = require("jsonwebtoken");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findAllPermisionFromProfileId, findAllPermissionsFromUserAndProfile } = require("../domain/permission-repository");
const { userRepository } = require("../domain/user-repository");

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies['jwt'];

        // const token = (cookie.split(' ').length > 1) ? cookie.split(' ')[1] : cookie;
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = payload;
        console.log(payload);
        next();
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            sendHttpResponse(res,'Token no válido o no existe', 401);
            return;
        }
        sendHttpResponse(res,'Error al verificar token', 500);
        return;
        
    }
}

const hasProfile = (profiles) => {
    const middleware = async (req, res, next) => {

        const user = await userRepository.findUserByUsername(req.user.username);
        const userProfile = await user.getProfile();
        for (let acceptedProfile of profiles) {
            console.log(userProfile)
            if (userProfile.name == acceptedProfile) {
                
                next()
                return;
            }
        }
        sendHttpResponse(res, 'No tienes el perfil necesario', 403);
        return;
        
    }
    return middleware;
    
}

const hasPermission = (permissionList) => {
    const middleware = async (req, res, next) => {
        const user = await userRepository.findUserByUsername(req.user.username);
        const permissions = await findAllPermissionsFromUserAndProfile(user.id, user.profileId);
        for (let requiredPermission of permissionList) {
            let containsPermission = false;
            for (let actualPermission of permissions) {
                if (actualPermission.name == requiredPermission) {
                    containsPermission = true;
                    break;
                }
            }
            if (!containsPermission) {
                sendHttpResponse(res,'No tienes los permisos necesarios', 403)
                return;
            } 
        }
        next();
        
    }
    return middleware;
}
exports.verifyToken = verifyToken;
exports.hasProfile = hasProfile;
exports.hasPermission = hasPermission;