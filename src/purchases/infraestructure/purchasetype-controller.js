const { sendHttpResponse } = require("../../share/utils/response-parser");
const { getAllPurchaseTypes, insertPurchaseType, updatePurchaseType, deletePurchaseType } = require("../domain/purchasetype-service")


const getPurchaseTypes = async (req,res) => {
    const purchasetypes = await getAllPurchaseTypes();
    sendHttpResponse(res,purchasetypes,200);
}

const createPurchaseType = async (req,res) => {
    try {

        const {name,minValue,maxValue} = req.body;
        if(!name || !minValue || !maxValue) throw new Error('body incompleto')
        const purchase = await insertPurchaseType(name,minValue,maxValue)
        sendHttpResponse(res,purchase,200)
        
    } catch (error) {
        sendHttpResponse(res,error.message,400)
    }
   
}

const updateTypePurchase = async (req,res) => {
    try {
        const {purchaseTypeId, ...data} = req.body;
        if(!purchaseTypeId || !data) throw new Error('body incompleto')
        const purchase = await updatePurchaseType(purchaseTypeId, data)
        sendHttpResponse(res,purchase,200)
    } catch (error) {
        sendHttpResponse(res,error.message,400)
    }
}

const deleteTypePurchase = async (req,res) => {
    try {
        const {purchaseTypeId} = req.body;
        if(!purchaseTypeId) throw new Error('body incompleto')
        const resp = await deletePurchaseType(purchaseTypeId)
        sendHttpResponse(res,resp,200)
    } catch (error) {
        sendHttpResponse(res,error.message,400)
    }
}

exports.deleteTypePurchase = deleteTypePurchase;
exports.updateTypePurchase = updateTypePurchase;
exports.createPurchaseType = createPurchaseType;
exports.getPurchaseTypes = getPurchaseTypes;