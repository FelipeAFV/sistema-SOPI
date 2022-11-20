const { createPurchaseFromCompleteSopi, findPurchaseDetailByPurchaseId, updatePurchaseStatus, findPurchasesFilteredByPermissions } = require("../application/purchase-service");
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

const getAllPurchases = async (req, res) => {

    try {
        const purchasesAllowed = await findPurchasesFilteredByPermissions(req.user.profileId, req.user.id);
        sendHttpResponse(res, purchasesAllowed, 200);
        return;

    } catch (e) {
        console.log(e)
        sendHttpResponse(res, 'Error', 500);
        return;

    }

}

const getPurchaseDetail = async(req,res) => {
    const {compraId} = req.params;

    try {
        const purchase = await findPurchaseDetailByPurchaseId(compraId);
        console.log(purchase)
        if (!purchase) {
            sendHttpResponse(res, 'Error',404)
        } else {
            sendHttpResponse(res, purchase, 200);
        }
        
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
            purchaseId, statusId, typeId, userId: req.user.id
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
exports.getPurchaseDetail = getPurchaseDetail;
exports.updatePurchase = updatePurchase;
exports.getAllPurchases = getAllPurchases;