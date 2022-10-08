const sendHttpResponse = (res, data='Respuesta genérica', status=400, err=null ) => {

    if (err) {
        res.status(status).json({
            data: data, 
            err
        })
        return;
    }
    res.status(status).json({
        data,
    })

}
exports.sendHttpResponse = sendHttpResponse;