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
    const user = req.user;
    try {
        const sopiWithDetails = await sopiService.getSopiByIdWithDetails(sopiId , user.profileId, user.id);

        sendHttpResponse(res, sopiWithDetails, 200);
        
    } catch (e) {
        console.log(e.message)
        sendHttpResponse(res, 'Error al buscar sopi con id ' + sopiId, 400, e.message);

    }
}

const updateSopi = async (req, res) => {

    try {
        const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId);
        const {sopiId, statusId, comment, financingId, costCenterId, technicalSpecification, priority} = req.body;
        let updatedSopi = '';
        
        if (!sopiId) {
            sendHttpResponse(res, '', 400, 'Datos faltantes en solicitud');
            return;
        }

        if (permissions.find(p => p.name == 'SOPI_EDITAR_ESTADO_REVISADO_REFERENTE')) {
            const sopiToUpdate = await sopiService.getSopiByIdWithDetails(sopiId, req.user.profileId, req.user.id);
            const {sopi} = sopiToUpdate;
            if(sopi.status.name === 'REVISION_REFERENTE' && technicalSpecification && technicalSpecification != '') {
                updatedSopi = await sopiService.updateSopiWithStatus({sopiId, statusId:5 ,technicalSpecification:technicalSpecification, userId: req.user.id, comment: "Cambiado a revisado por referente"});
                sendHttpResponse(res, updatedSopi,200);
                return;
            }   
        }

        
        if (statusId) {
            updatedSopi = await sopiService.updateSopiStatus({sopiId, statusId, userId: req.user.id, comment});
        }
        if (financingId || costCenterId || priority) {
            updatedSopi = await sopiRepo.updateSopi(sopiId, {financingId, costCenterId, priority});
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

        const sopisFiltered = await sopiService.getSopisFilteredByUserPermissions(req.query,user.profileId, user.id );

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