const { createPurchaseFromCompleteSopi, findPurchasesAsignedToManager, findAllPurchases, findSopiDetailByPurchaseId, updatePurchaseStatus } = require("../application/purchase-service");
const { sendHttpResponse } = require('../../share/utils/response-parser');

const createPurchase = async (req, res) => {

    // TODO: Add first status
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

    const userId = req.query.userId

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

const purchaseManage = (req,res) => {
    const opcion = req.query.userId
    if(opcion) {
        findPurchasesFromManager(req,res)
    }else {
        findPurchases(req,res)
    }
}

const getPurchaseDetail = async(req,res) => {
    const {compraId} = req.params;

    try {
        //const purchase = await getPurchaseById(compraId);
        const purchase = await findSopiDetailByPurchaseId(compraId);
        sendHttpResponse(res, purchase, 200);
    } catch (error) {
        console.log(error);
        sendHttpResponse(res, 'Error al buscar detalle solicitud de compra con id: '+ compraId, 400);
    }
    
}

const updatePurchase = async(req,res) => {
    try {
        const {purchaseId, statusId, typeId} = req.body;
        if(!purchaseId || !statusId || !typeId) {
            sendHttpResponse(res,'', 400, 'Faltan datos en la modificación');
            return;
        } 
        const updatedPurchase = await updatePurchaseStatus({
            purchaseId, statusId, typeId
        });
        sendHttpResponse(res, updatedPurchase, 200);
        return;
    } catch (error) {
        console.log(error);
        sendHttpResponse(res, '', 500, 'Error al actualizar proceso de compra' );
        return;
    }
}

exports.createPurchase = createPurchase;
exports.purchaseManage = purchaseManage;
exports.getPurchaseDetail = getPurchaseDetail;
exports.updatePurchase = updatePurchase;