const { User } = require("../../auth/domain/models");
const { Purchase, PurchaseStatus } = require("../../purchases/domain/models");
const { Manager, Document } = require("./models")

const saveManager = async ({userId, purchaseId}) => {
    const manager = await Manager.create({userId, purchaseId});
    return manager
    
}

const findManager = async ({managerId, purchaseId}) => {
    const manager = await Manager.findOne({where:{userId: managerId, purchaseId:purchaseId}});
    return manager;

}

const findOneManager = async ({managerId}) => {
    const manager = await Manager.findOne({where:{id: managerId}});
    return manager;

}

const findOneManagerForPurchase = async ({creatorId, purchaseId}) => {
    const manager = await Manager.findOne({where:{userId: creatorId, purchaseId:purchaseId}});
    return manager;

}

const findManagerPurchase = async (userId) => {
    const result = await Manager.findAll({where:{userId},include: [{model: Purchase, include: [{ model: PurchaseStatus, as: 'status'}]}]})
    //console.log(result);
    /*if(result.length === 0){
        
        throw new Error('usuario no tiene asignado ningun proceso de compra')
    }*/
    
    return result;
}

const findAllManager = async () => {
    const result = await Manager.findAll({include: [Purchase, User]})
    if(!result){
        throw new Error('No hay managers asignados hasta el momento')
    }
    return result;
}

const findAllManagers = async (id) => {
    const managers = await Manager.findAll({where:{purchaseId:id}});
    if(!managers){
        throw new Error('No hay managers asociados a la compra')
    }
    return managers;
}

const findManagersWithConditions = async (conditions) => {
    return await  Manager.findAll({ where: conditions})
}

const findManagerFromPurchaseDocument = async (docId) => {
    return await Manager.findAll({ include: [{ model: Purchase, 
        include: [{ model: Document, where: {id: docId} }]}]});
}




exports.findManagerFromPurchaseDocument = findManagerFromPurchaseDocument;
exports.findManagerPurchase = findManagerPurchase;
exports.findAllManager = findAllManager;
exports.findOneManagerForPurchase = findOneManagerForPurchase;
exports.findManager = findManager;
exports.saveManager = saveManager;
exports.findOneManager = findOneManager;
exports.findManagersWithConditions = findManagersWithConditions;