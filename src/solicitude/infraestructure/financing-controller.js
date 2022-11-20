const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findAllCostCenter } = require("../domain/costcenter-repository");
const { findAllFinancing, getFinancingByName, saveFinancing } = require("../domain/financing-repository");

const getAllFinancing = async (req, res) => {
    
    const financings = await findAllFinancing();

    if (financings == null) {
        sendHttpResponse(res, 'Error al buscar financiamientos', 500, 'Error al buscar financiamientos');
        return;
    }
    sendHttpResponse(res, financings, 200);
    return;
};
const createFinancing = async (req, res) => {
    const financingData = req.body;
    const isCreated = await getFinancingByName(financingData.name);
    if(isCreated) {
        sendHttpResponse(res, 'El financiamiento ya existe, vuelva a intentarlo');
    } else {
        let name = financingData.name.toLowerCase().charAt(0).toUpperCase() +financingData.name.slice(1) ;
        financingData.name = name;
        const financingCreated = await saveFinancing(financingData);
        sendHttpResponse(res,financingCreated,200);
    }
};

const updateFinancing = async (req,res) => {
    try {
        const {financingId, name} = req.body;
        if(!financingId) {
            sendHttpResponse(res, '', 403, 'No existe financiamiento');
        }
        const updatedFinancing = await updateFinancing(financingId, {name});
        sendHttpResponse(res, updatedFinancing, 200)
    } catch (error) {
        console.log(e.message);
        sendHttpResponse(res, '', 500, 'Error al actualizar');
        return;
    }
}

exports.getAllFinancing = getAllFinancing;
exports.createFinancing = createFinancing;
exports.updateFinancing = updateFinancing;