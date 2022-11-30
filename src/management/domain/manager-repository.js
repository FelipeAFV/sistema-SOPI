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

const findManagerPurchase = async (userId, page, perPage) => {
    let result = ''
    if (page && perPage) {

        result = await Manager.findAll({where:{userId},include: [{model: Purchase, include: [{ model: PurchaseStatus, as: 'status'}]}], offset: (page-1)*perPage, limit:perPage, distinct: true,order: [['createdAt','ASC'] ]})
    } else {
        result = await Manager.findAll({where:{userId},include: [{model: Purchase, include: [{ model: PurchaseStatus, as: 'status'}]}],  distinct: true,order: [['createdAt','ASC'] ]})

    }
    
    return result;
}

const findOneManagerByUserId = async ({userId}) => {
    const result = await Manager.findOne({where:{userId:userId}});
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
    const managers = await Manager.findAll({where:{purchaseId:id}, include:{model: User}});
    if(managers.length == 0){
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

const disableManagerById = async (id) => {
    try {
        const manager = await Manager.findOne({where:id});
        return await manager.update({isActive: false});
    } catch (error) {
        throw new Error('Error al actualizar Manager')
    }
}


exports.findAllManagers = findAllManagers;
exports.findManagerFromPurchaseDocument = findManagerFromPurchaseDocument;
exports.findManagerPurchase = findManagerPurchase;
exports.findAllManager = findAllManager;
exports.findOneManagerForPurchase = findOneManagerForPurchase;
exports.findManager = findManager;
exports.saveManager = saveManager;
exports.findOneManager = findOneManager;
exports.findManagersWithConditions = findManagersWithConditions;
exports.findOneManagerByUserId = findOneManagerByUserId;
exports.disableManagerById = disableManagerById;