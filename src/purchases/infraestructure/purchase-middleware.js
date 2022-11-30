const { findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findPurchaseDetailByPurchaseId } = require("../application/purchase-service");
const { getPurchase, getAllPurchasesWithManager, getPurchaseFromManagerId, getPurchaseById, getPurchaseWithUserTickets } = require("../domain/purchase-repository");

const purchaseDetailPermission = () => {
    return async (req, res, next) => {
        const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId);

        const viewAll = permissions.find((permission) => permission.name == 'COMPRA_VER');
        if (!req.params.compraId) {
            sendHttpResponse(res, 'Error', 400, 'Debes enviar el {compraId}')
            return;
        };
        if (viewAll != null) {
            console.log('Tiene permiso')
            next();
            return;
        };
        
        const requestedPurchase = await getPurchaseById(req.params.compraId);
        if (!requestedPurchase) {
            sendHttpResponse(res, 'Error', 400, 'No existe compra con id: '+ req.params.compraId );
            return;
        };
        //const managerPermission = await getPurchaseFromManagerId(req.params.compraId, req.user.id);
        const m = await getPurchaseFromManagerId(req.params.compraId, req.user.id);
        const purchases = await getPurchaseWithUserTickets(req.user.id, req.params.compraId)

        console.log(purchases.tickets)

        if(!m && purchases.tickets.length == 0) {
            sendHttpResponse(res, 'Error', 403, 'No tienes permisos')
            return;
        }
        
        next();

    }
};

exports.purchaseDetailPermission = purchaseDetailPermission;