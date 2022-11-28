const { createPurchaseFromCompleteSopi, findPurchaseDetailByPurchaseId, updatePurchaseStatus, findPurchasesFilteredByPermissions } = require("../application/purchase-service");
const { sendHttpResponse } = require('../../share/utils/response-parser');
const { updatePurchaseById, getAllPurchasesWithManager, getPurchaseById } = require("../domain/purchase-repository");
const { findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");

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
        const purchasesAllowed = await findPurchasesFilteredByPermissions(req.query,req.user.profileId, req.user.id);
        //console.log(purchasesAllowed)
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

        const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId);
        const editPermission = permissions.find((permission) => permission.name == 'COMPRA_EDITAR');

        const managedPurchases = await getAllPurchasesWithManager(req.user.id);

        const purchase = req.body;
        if (!editPermission && !managedPurchases.find( p => p.id == purchase.purchaseId)) {
            sendHttpResponse(res,'Error', 403, 'No tienes permisos de editar');
            return;
        }



        if(!purchase.purchaseId) {
            sendHttpResponse(res,'', 400, 'Debes indicar el id de la compra');
            return;
        } 

        const purchaseToUpdate = await getPurchaseById(purchase.purchaseId);

        let updatedPurchase = '';
        if (purchase.statusId && (purchaseToUpdate.statusId != purchase.statusId)) {
            updatedPurchase = await updatePurchaseStatus({
                purchaseId: purchase.purchaseId, statusId: purchase.statusId, userId: req.user.id
            });

        }

        if (purchase.purchaseTypeId  || purchase.supplierId || purchase.totalAmmount) {
            updatedPurchase = await updatePurchaseById(purchase.purchaseId, {purchaseTypeId: purchase.purchaseTypeId,
                 supplierId: purchase.supplierId, totalAmmount:  purchase.totalAmmount});

        }
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