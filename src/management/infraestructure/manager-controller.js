const { sendHttpResponse } = require("../../share/utils/response-parser");
const { addManagerForSopi } = require("../application/responsible-service");
const { ApiValidationError } = require("../domain/api-errors");
const { saveManager } = require("../domain/manager-repository");



const addManager = async (req, res) => {

    const {managerId, purchaseId} = req.body;

    try {
        const manager = await addManagerForSopi({managerId, purchaseId})
        sendHttpResponse(res, manager, 200);
        return;
    } catch (e) {
        if (e instanceof ApiValidationError) {
            sendHttpResponse(res, 'Error', 400, e);
            return;
            
        }
        console.log(e)
        sendHttpResponse(res, 'Error', 500, 'Error al ingresar gestor de compra');
        return;
    }


    

}



exports.addManager = addManager;
