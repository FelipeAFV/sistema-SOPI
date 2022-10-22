const { sendHttpResponse } = require("../../share/utils/response-parser");
const { addManagerForSopi } = require("../application/responsible-service");
const { ApiValidationError } = require("../domain/api-errors");
const { saveManager } = require("../domain/manager-repository");
const {getManagerPurchase} = require('../application/management-service')
const {getAllManagers} = require('../application/management-service')


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

const checkManagerPurchase = async (req,res) => {
    const userId = req.params.userId;
    
    try {
        const response = await getManagerPurchase(userId)
        sendHttpResponse(res,response,200)    
    } catch (error) {
        sendHttpResponse(res,error.message,400)
    }
}

const checkAllManager = async (req,res) => {
    try {
        const response = await getAllManagers()
        sendHttpResponse(res,response,200)    
    } catch (error) {
        sendHttpResponse(res,error.message,400)
    }
}



exports.addManager = addManager;
exports.checkManagerPurchase = checkManagerPurchase;
exports.checkAllManager = checkAllManager;