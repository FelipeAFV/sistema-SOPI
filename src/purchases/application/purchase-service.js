const { sequelize } = require("../../database/db-init");
const { findSopi } = require("../../solicitude/domain/sopi-repository")
const { savePurchase } = require("../domain/purchase-repository")


const createPurchaseFromCompleteSopi = async ({ sopiId }) => {

    try {

        const response = await sequelize.transaction(async () => {

            // STEP 1: Find sopi with items
            const sopi = await findSopi({ id: sopiId });

            // Sopi details availeble through sopiDetails list atribute
            console.log('sopi details' + sopi.sopiDetails[0].features)

            //STEP 2: Create purchase
            const purchaseSaved = await savePurchase();

            //STEP3: Add purchase details
            return purchaseSaved
        })

        // Response from inside transaction
        return response;
    } catch (e) {

        console.log(e)

    }
}

exports.createPurchaseFromCompleteSopi = createPurchaseFromCompleteSopi;