const { PermissionError } = require("../models/errors");

const sendHttpResponse = (res, data='Respuesta genérica', status=400, err=null ) => {

    if (err && err instanceof PermissionError) {
        res.status(status).json({
            data: data, 
            err: {
                message: err.message,
                permissionFail: err.permissionFailed

            }
        })
        return;
    } else if (err) { 
        res.status(status).json({
            data: data, 
            err: {
                message: err.message,

            }
        })
        return;
        
    }
    res.status(status).json({
        data,
    })

}
exports.sendHttpResponse = sendHttpResponse;