const { findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { getPurchase, getAllPurchasesWithManager } = require("../domain/purchase-repository");

const purchaseDetailPermission = () => {
    return async (req, res, next) => {
        const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId);
        const viewAll = permissions.find((permission) => permission == 'COMPRA_VER');
        if (!req.params.compraId) {
            sendHttpResponse(res, 'Error', 400, 'Debes enviar el {compraId}')
            return;
        };
        if (viewAll) {
            next();
        };
        const managerPermission = permissions.find((permission)=>permission.name== 'COMPRA_VER_GESTOR');
        const ownerPermission = permissions.find((permission)=>permission.name== 'COMPRA_VER_SOPI_CREADOR');
        //console.log(managerPermission)
        const requestedPurchase = await getPurchase({id:req.params.compraId});

        if(!requestedPurchase) sendHttpResponse(res, 'Error', 400, 'No existe esa compra');
        if(ownerPermission) sendHttpResponse(res, 'Error', 400, 'No tienes permisos necesarios');
        
        if(managerPermission) {
            try {
                const purchaseManager = await getAllPurchasesWithManager(req.user.id);
                if(!purchaseManager.find((purchase) => purchase.id === requestedPurchase.id)) sendHttpResponse(res, 'Error', 404, 'No tienes permisos para ver') 
                return;
            } catch (error) {
                throw new Error('Error', error.message);
            }
        };
        /**TODO: PERMISSIONS!! */
        /* const purchaseStatusPermission = permissions.filter(permission => permission.name.includes('COMPRA_VER_ESTADO')); */
        /* if(purchaseStatusPermission.length == 0 && !managerPermission && !ownerPermission) {
            sendHttpResponse(res, 'Error', 403, 'No tienes los permisos necesarios')
            return
        } else if (purchaseStatusPermission.length > 0 && !purchaseStatusPermission.find(p => p.name.includes(requestedPurchase.status.name))) {

            sendHttpResponse(res, 'Error', 403, 'No tienes los permisos necesarios')
            return

        } */
        next();

    }
};

exports.purchaseDetailPermission = purchaseDetailPermission;