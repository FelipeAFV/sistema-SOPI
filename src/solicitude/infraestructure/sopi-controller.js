const { request } = require("express");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { getSopiById, getAllSopis } = require("../domain/sopi-repository");

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
        const statuses = await sopi.getLogStatus()
        sopi.status = statuses
        console.log(statuses)

        sendHttpResponse(res, sopi, 200);
        
    } catch (e) {
        console.log(e)
        sendHttpResponse(res, 'Error al buscar sopi con id ' + sopiId, 400);

    }
}

const updateSopi = async (req, res) => {

    try {
        const {sopiId, statusId, comment } = req.body;
        

        if (!sopiId || !statusId || !comment) {
            sendHttpResponse(res, '', 400, 'Datos faltantes en solicitud');
            return;
        }
    
        const updatedSopi = await sopiService.updateSopiStatus({sopiId, statusId, userId: req.user.id, comment});
    
        sendHttpResponse(res, updatedSopi,200);
        return;
        
    } catch (e) {
        console.log(e)
        sendHttpResponse(res, '', 500, 'Error al procesar la actualizacion de sopi');
        return;

    }
}

const getAllSopi = async (req, res) => {
    try {
        const sopis = await getAllSopis();
        sendHttpResponse(res, sopis, 200);
    } catch (e) {
        sendHttpResponse(res, 'Error', 500, 'Error al buscar sopis');
    }
}

exports.addNewSopi = addNewSopi;
exports.getSopi = getSopi;
exports.updateSopi = updateSopi;
exports.getAllSopi = getAllSopi;