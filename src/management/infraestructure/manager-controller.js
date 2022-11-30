const { userRepository } = require("../../auth/domain/user-repository");
const { Purchase } = require("../../purchases/domain/models");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { addManagerForSopi, findPossibleManagers, findAllManagerInPurchase } = require("../application/responsible-service");
const { ApiValidationError } = require("../domain/api-errors");
const { saveManager } = require("../domain/manager-repository");
const { Manager } = require("../domain/models");



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

const possibleManager = async (req,res) => {
    try {
        const {compraId} = req.query;
        if(!compraId){
            const possibleManagers = await findPossibleManagers();
            sendHttpResponse(res,possibleManagers,200)   
        }else{
            const managers = await findAllManagerInPurchase(compraId)
            sendHttpResponse(res,managers,200)
        }
         
    } catch (error) {
        sendHttpResponse(res,error.message, 403)
    }
    
}


exports.possibleManager = possibleManager;
exports.addManager = addManager;
