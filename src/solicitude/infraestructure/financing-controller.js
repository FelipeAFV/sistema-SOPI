const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findAllCostCenter } = require("../domain/costcenter-repository");
const { findAllFinancing, getFinancingByName, saveFinancing, updateFinancingById, deleteFinancingById } = require("../domain/financing-repository");

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
        const {id, name} = req.body;
        console.log(req.body)
        if(!id) {
            sendHttpResponse(res, '', 403, 'No existe financiamiento');
        }
        const updatedFinancing = await updateFinancingById(id, {name});
        sendHttpResponse(res, updatedFinancing, 200)
    } catch (error) {
        console.log(error.message);
        sendHttpResponse(res, '', 500, 'Error al actualizar');
        return;
    }
};

const deleteFinancing = async(req,res) => {
    try {
        const {id} = req.body;
        if(!id) throw new Error('No hay id relacionado a dicho financiamiento');
        const deleteFinancing = await deleteFinancingById(id);
        sendHttpResponse(res, deleteFinancing, 200);
    } catch (error) {
        sendHttpResponse(res, error.message, 400);
    }
}

exports.getAllFinancing = getAllFinancing;
exports.createFinancing = createFinancing;
exports.updateFinancing = updateFinancing;
exports.deleteFinancing = deleteFinancing;