const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const cookie = req.cookies['jwt'];

        const token = (cookie.split(' ').length > 1) ? cookie.split(' ')[1] : cookie;
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = payload;
        next();
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {

            res.status(401).json({message: 'Token no válido'});
            return;
        }
        res.status(400).json({message: 'Error al verificar token'});
        return;
        
    }
}

exports.verifyToken = verifyToken;