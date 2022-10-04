const jwt = require("jsonwebtoken");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { UserService } = require("../services/user-service");

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

const hasProfile = (profile) => {
    const middleware = async (req, res, next) => {

        const user = await UserService.findUserByUsername(req.user.username);
        const profile = user.getProfile();
        if (profile.tipo != profile) {
            sendHttpResponse(res, 'No tienes los permisos necesarios', 403);
            return;

        }
        next()
        
    }
    return middleware;

}
exports.verifyToken = verifyToken;
exports.hasProfile = hasProfile;