const { sequelize } = require("../../database/db-init");
const { findSopi } = require("../../solicitude/domain/sopi-repository")
const { savePurchase } = require("../domain/purchase-repository");
const { savePurchaseDetail, saveAllPurchaseDatails } = require("../domain/purchasedetail-repository");


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

            //STEP 2: Create purchase
            const purchaseSaved = await savePurchase();

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
            console.log(jsonPurchase)
            return jsonPurchase;
        })

        // Response from inside transaction
        return response;
    } catch (e) {
        console.log(e)
        throw new Error('Error en servicio-compras');

    }
}

exports.createPurchaseFromCompleteSopi = createPurchaseFromCompleteSopi;