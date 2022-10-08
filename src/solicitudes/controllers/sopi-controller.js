const { request } = require("express");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const sopiService = require("../services/sopi-service");


const addNewSopi = async (req, res) => {

    try {
        const sopiData = req.body;
        sopiData.userId = req.user.id;

        const sopiCreated = await sopiService.createSopi(sopiData);

        sendHttpResponse(res, sopiCreated, 200);

    } catch (e) {
        console.log('Error',e)
        sendHttpResponse(res, 'Error al ingresar sopi', 500, e.message);
    }
}

exports.addNewSopi = addNewSopi;