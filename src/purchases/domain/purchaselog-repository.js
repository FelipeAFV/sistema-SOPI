const { PurchaseStatus, PurchaseLog } = require("./models")

const addlogByStatusId = async (purchaseId, statusId) => {
    try {
        const logEntry = await PurchaseLog.create({purchaseId, statusId: statusId})

        return logEntry;
    } catch (error) {
        throw new Error("Error en repositorio compras")
    }
    
}


exports.addlogByStatusId = addlogByStatusId;