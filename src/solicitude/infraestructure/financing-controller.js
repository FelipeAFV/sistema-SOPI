const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findAllCostCenter } = require("../domain/costcenter-repository");
const { findAllFinancing } = require("../domain/financing-repository");

const getAllFinancing = async (req, res) => {
    
    const financings = await findAllFinancing();

    if (financings == null) {
        sendHttpResponse(res, 'Error al buscar financiamientos', 500, 'Error al buscar financiamientos');
        return;
    }
    sendHttpResponse(res, financings, 200);
    return;
}

exports.getAllFinancing = getAllFinancing;