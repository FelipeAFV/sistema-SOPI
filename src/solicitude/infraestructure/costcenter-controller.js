const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findAllCostCenter, saveCostCenter, getCostCenterByName } = require("../domain/costcenter-repository")

const getAllCostCenter = async (req, res) => {
    const costCenters = await findAllCostCenter();

    if (!costCenters) {
        sendHttpResponse(res, 'Error al buscar centros de costo', 200, 'Error al buscar centros de costo');
        return;
        
    }
    sendHttpResponse(res, costCenters, 200);
    return;
};

const createCostCenter = async (req, res) => {
    const costCenterData = req.body;
    const isCreated = await getCostCenterByName(costCenterData.name);
    if(isCreated) {
        sendHttpResponse(res, 'El centro de costo ya existe, vuelva a intentarlo');
    } else {
        let name = costCenterData.name.toLowerCase().charAt(0).toUpperCase() +costCenterData.name.slice(1) ;
        costCenterData.name = name;
        const costCenterCreated = await saveCostCenter(costCenterData);
        sendHttpResponse(res,costCenterCreated,200);
    }
}

exports.getAllCostCenter = getAllCostCenter;
exports.createCostCenter = createCostCenter;