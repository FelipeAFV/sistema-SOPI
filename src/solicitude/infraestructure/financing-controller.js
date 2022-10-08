const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findAllCostCenter } = require("../domain/costcenter-repository")

const getAllFinancing = async (req, res) => {
    
    const financings = await findAllCostCenter();

    if (financings == null) {
        sendHttpResponse(res, 'Error al buscar financiamientos', 500);
        return;
    }
    sendHttpResponse(res, financings, 500);
}

exports.getAllFinancing = getAllFinancing;