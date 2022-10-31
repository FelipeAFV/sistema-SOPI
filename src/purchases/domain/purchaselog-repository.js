const { PurchaseStatus, PurchaseLog } = require("./models")

const addlogByStatusId = async (purchaseId, statusId, userId) => {
    try {
        const logEntry = await PurchaseLog.create({purchaseId, statusId: statusId, userId})

        return logEntry;
    } catch (error) {
        console.log(error)
        throw new Error("Error en repositorio compras")
    }
    
}

const getLogEntryByPurchaseId = async (purchaseId) => {
    return await PurchaseLog.findAll({ where: { purchaseId}})
}


exports.addlogByStatusId = addlogByStatusId;
exports.getLogEntryByPurchaseId = getLogEntryByPurchaseId;