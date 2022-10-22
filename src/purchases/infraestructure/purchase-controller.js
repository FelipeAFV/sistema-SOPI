const { createPurchaseFromCompleteSopi, findPurchasesAsignedToManager, findAllPurchases } = require("../application/purchase-service");
const { sendHttpResponse } = require('../../share/utils/response-parser');

const createPurchase = async (req, res) => {

    const {sopiId, creationType } = req.body;
    let response = null;
    try {
        switch (creationType) {
            case 'SOPI_COMPLETA':
                response = await createPurchaseFromCompleteSopi({sopiId});
            default:
        }
        if (!response) {
            sendHttpResponse(res, 'Falta indicar el tipo de creacion', 400);
            return;
        }
        sendHttpResponse(res, response, 200);
        return;

    } catch (e) {
        console.log(e)
        sendHttpResponse(res, 'Error', 500, 'Error al procesar la creación de orden de compra');
        return;
    }

}

const findPurchasesFromManager = async (req,res) => {

    const userId = req.params.userId

    try {
        const response = await findPurchasesAsignedToManager(userId)
        sendHttpResponse(res,response,200)    
    } catch (error) {
        sendHttpResponse(res,error.message,400)
    }
}

const findPurchases = async (req,res) => {
    try {
        const response = await findAllPurchases()
        sendHttpResponse(res,response,200)    
    } catch (error) {
        sendHttpResponse(res,error.message,400)
    }
}

exports.createPurchase = createPurchase;
exports.findPurchasesFromManager = findPurchasesFromManager;
exports.findAllPurchases = findPurchases;