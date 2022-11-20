const { request } = require("express");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const sopiRepo = require("../domain/sopi-repository");

const sopiService = require("../application/sopi-service");
const { findAllPermisionFromProfileId, findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");


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
        const sopiWithDetails = await sopiService.getSopiByIdWithDetails(sopiId);

        sendHttpResponse(res, sopiWithDetails, 200);
        
    } catch (e) {
        console.log(e)
        sendHttpResponse(res, 'Error al buscar sopi con id ' + sopiId, 400);

    }
}

const updateSopi = async (req, res) => {

    try {
        const {sopiId, statusId, comment, financingId, costCenterId} = req.body;
        
        
        if (!sopiId) {
            sendHttpResponse(res, '', 400, 'Datos faltantes en solicitud');
            return;
        }

        let updatedSopi = '';
        if (statusId) {

            updatedSopi = await sopiService.updateSopiStatus({sopiId, statusId, userId: req.user.id, comment});
        }
        if (financingId || costCenterId) {
            const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId);
            if (!permissions.find(p => p.name == 'SOPI_EDITAR')) {
                sendHttpResponse(res, 'Error', 403, 'No tienes permisos para editar');
                return;
            }
            updatedSopi = await sopiRepo.updateSopi(sopiId, {financingId, costCenterId});
        }
    
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
        const user = req.user;

        const sopisFiltered = await sopiService.getSopisFilteredByUserPermissions(user.profileId, user.id );

        sendHttpResponse(res, sopisFiltered, 200);
    } catch (e) {
        console.log(e)
        sendHttpResponse(res, 'Error', 500, 'Error al buscar sopis');
    }
}

exports.addNewSopi = addNewSopi;
exports.getSopi = getSopi;
exports.updateSopi = updateSopi;
exports.getAllSopi = getAllSopi;