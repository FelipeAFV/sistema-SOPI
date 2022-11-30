const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findAllCostCenter, saveCostCenter, getCostCenterByName, updateCostCenterById, deleteCostCenterById } = require("../domain/costcenter-repository")

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
};

const updateCostCenter = async (req,res) => {
    try {
        const {id, name} = req.body;
        if(!id || !name) throw new Error('Body incompleto');
        const costCenter = await updateCostCenterById(id, {name});
        sendHttpResponse(res, costCenter, 200);

    } catch (error) {
        sendHttpResponse(res, error.message, 400);
    }
};

const deleteCostCenter = async(req,res) => {
    try {
        const {id} = req.body;
        if(!id) throw new Error('No hay id relacionado a dicho cost center');
        const deleteCostCenter = await deleteCostCenterById(id);
        sendHttpResponse(res, deleteCostCenter, 200);
    } catch (error) {
        sendHttpResponse(res, error.message, 400);
    }
}

exports.getAllCostCenter = getAllCostCenter;
exports.createCostCenter = createCostCenter;
exports.updateCostCenter = updateCostCenter;
exports.deleteCostCenter = deleteCostCenter;