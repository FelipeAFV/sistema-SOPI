const { sendHttpResponse } = require("../../share/utils/response-parser");
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