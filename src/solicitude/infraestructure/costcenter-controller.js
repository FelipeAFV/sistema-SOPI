const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findAllCostCenter } = require("../domain/costcenter-repository")

const getAllCostCenter = async (req, res) => {
    const costCenters = await findAllCostCenter();

    if (!costCenters) {
        sendHttpResponse(res, 'Error al buscar centros de costo', 200);
        return;
        
    }
    sendHttpResponse(res, costCenters, 200);
    return;
}

exports.getAllCostCenter = getAllCostCenter;