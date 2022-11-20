const { PurchaseType } = require("./models")


const getAllPurchaseTypes = async () => {
    const purchases = await PurchaseType.findAll()
    return purchases;
}

const insertPurchaseType = async (name,minValue,maxValue) => {
    const exists = await PurchaseType.findOne({where:{name:name}})
    if(exists) throw new Error('tipo de compra ya existe')
    const purchaseType = await PurchaseType.create({name,minValue,maxValue})
    return purchaseType
}

const updatePurchaseType = async (purchaseTypeId, data) => {
    try {
        const purchaseType = await PurchaseType.findOne({where:{id:purchaseTypeId}})
        if(!purchaseType) throw new Error('typo de compra no existe con id especificado')
        purchaseType.update(data)
        return purchaseType;    
    } catch (error) {
        throw new Error(error.message)
    }
    
}

const deletePurchaseType = async (purchaseTypeId) => {
    try {
        const purchaseType = await PurchaseType.findOne({where:{id:purchaseTypeId}})
        if(!purchaseType) throw new Error('typo de compra no existe con id especificado')
        purchaseType.destroy()
        return 'tipo de compra eliminado con exito';    
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.deletePurchaseType = deletePurchaseType;
exports.updatePurchaseType = updatePurchaseType;
exports.insertPurchaseType = insertPurchaseType;
exports.getAllPurchaseTypes = getAllPurchaseTypes;