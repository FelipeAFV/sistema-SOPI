const sendHttpResponse = (res, message='Respuesta genérica', status=400, err=null ) => {

    if (err) {
        res.status(status).json({
            message,
            err
        })
        return;
    }
    res.status(status).json({
        message,
    })

}
exports.sendHttpResponse = sendHttpResponse;