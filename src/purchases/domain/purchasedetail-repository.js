const { sequelize } = require("../../database/db-init");
const { SopiDetail } = require("../../solicitude/domain/models");
const { PurchaseDetail } = require("./models");


const savePurchaseDetail = async (purchaseDetail) => {
    const savedDetail = await PurchaseDetail.create(purchaseDetail);
    return savedDetail;
}

const saveAllPurchaseDatails = async (details) => {
    console.log('bulkCreate')
    const savedDetails = await PurchaseDetail.bulkCreate(details, {
    });
    return savedDetails;
} 

const getPurchaseDetailById = async(id)=> {
    const detail = await PurchaseDetail.findOne({
        where: {
            purchaseId:id
        }
    })
    return detail;
}

exports.savePurchaseDetail = savePurchaseDetail;
exports.saveAllPurchaseDatails = saveAllPurchaseDatails;
exports.getPurchaseDetailById = getPurchaseDetailById;