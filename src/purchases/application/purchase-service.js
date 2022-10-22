const { sequelize } = require("../../database/db-init");
const { findSopi } = require("../../solicitude/domain/sopi-repository");
const { PurchaseSopi } = require("../domain/models");
const { savePurchase } = require("../domain/purchase-repository");
const { savePurchaseDetail, saveAllPurchaseDatails } = require("../domain/purchasedetail-repository");
const { savePurchaseSopi } = require("../domain/purchasesopi-repository");
const { findStatusByName } = require("../domain/purchasestatus-repository");
const { findManagerPurchase,findAllManager } = require('../../management/domain/manager-repository');


const createPurchaseFromCompleteSopi = async ({ sopiId }) => {

    try {

        const response = await sequelize.transaction(async () => {

            // STEP 1: Find sopi with items
            const sopi = await findSopi({ id: sopiId });

            if (!sopi) {
                throw new Error(`Sopi con id ${sopiId} no existe`);
            }

            // Sopi details availeble through sopiDetails list atribute
            console.log('sopi details' + sopi.sopiDetails[0].features)

            const purchaseFirstStatus = await findStatusByName('PREPARANDO');
            //STEP 2: Create purchase
            const purchaseSaved = await savePurchase({statusId: purchaseFirstStatus.id});

            //STEP3: Add purchase details
            const items = sopi.sopiDetails;
            const purchaseDetails = items.map((item) => {
                return {
                    sopiDetailId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    purchaseId: purchaseSaved.id
                }
            })
            const purchaseDetailsCreated = await saveAllPurchaseDatails(purchaseDetails);
            const jsonPurchaseDetail = purchaseDetailsCreated.map(item => {
                return item.toJSON();
            })
            const jsonPurchase = purchaseSaved.toJSON();
            jsonPurchase.items = jsonPurchaseDetail;

            // STEP 4: Link SOPI to Purchase
            await savePurchaseSopi({sopiId: sopi.id, purchaseId: purchaseSaved.id});
            return jsonPurchase;
        })

        // Response from inside transaction
        return response;
    } catch (e) {
        console.log(e)
        throw new Error('Error en servicio-compras');

    }
}

const findPurchasesAsignedToManager = async (userId) => {

    try {

        const result = await findManagerPurchase(userId);
        
        return result;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

const findAllPurchases = async () => {
    try {

        const result = await findAllManager();
        return result;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.findPurchasesAsignedToManager = findPurchasesAsignedToManager;
exports.findAllPurchases = findAllPurchases;

exports.createPurchaseFromCompleteSopi = createPurchaseFromCompleteSopi;