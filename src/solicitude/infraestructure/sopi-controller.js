const { request } = require("express");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { getSopiById } = require("../domain/sopi-repository");

const sopiService = require("../application/sopi-service");


const addNewSopi = async (req, res) => {

    try {
        const sopiData = req.body;
        sopiData.userId = req.user.id;

        const sopiCreated = await sopiService.createSopi(sopiData);

        sendHttpResponse(res, sopiCreated, 200);

    } catch (e) {
        console.log('Error',e)
        sendHttpResponse(res, 'Error al ingresar sopi', 500, e.message || '');
    }
}

const getSopi = async  (req, res) => {
    const sopiId = req.params.sopiId;
    try {
        const sopi = await getSopiById(sopiId);
        sendHttpResponse(res, sopi, 200);
        
    } catch (e) {
        sendHttpResponse(res, 'Error al buscar sopi con id ' + sopiId, 400);

    }
}

exports.addNewSopi = addNewSopi;
exports.getSopi = getSopi;