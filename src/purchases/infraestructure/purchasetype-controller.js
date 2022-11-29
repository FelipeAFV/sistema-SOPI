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
        const {id, ...data} = req.body;
        if(!id || !data) throw new Error('body incompleto')
        const purchase = await updatePurchaseType(id, data)
        sendHttpResponse(res,purchase,200)
    } catch (error) {
        sendHttpResponse(res,error.message,400)
    }
}

const deleteTypePurchase = async (req,res) => {
    try {
        const {id} = req.body;
        if(!id) throw new Error('body incompleto')
        const resp = await deletePurchaseType(id)
        sendHttpResponse(res,resp,200)
    } catch (error) {
        sendHttpResponse(res,error.message,400)
    }
}

exports.deleteTypePurchase = deleteTypePurchase;
exports.updateTypePurchase = updateTypePurchase;
exports.createPurchaseType = createPurchaseType;
exports.getPurchaseTypes = getPurchaseTypes;
const { getAllPurchaseType } = require("../domain/purchasetype-repository");


const getAll = async (req, res) => {

    try {
        const purchaseTypes = await getAllPurchaseType();
        sendHttpResponse(res, purchaseTypes, 200);
        return;
    } catch (e) {
        sendHttpResponse(res, 'Error', 500);
        console.log(e)
        return;

    }
}

exports.getAll = getAll;
