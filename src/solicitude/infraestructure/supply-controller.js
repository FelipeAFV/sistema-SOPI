const { sendHttpResponse } = require("../../share/utils/response-parser");
const { saveSupply, getSupplyByName, getAllSupplies } = require("../domain/supply-repository");

class SupplyController {
    createSupply = async (req, res) => {
        try {
            const supplyData = req.body;
    
            const isCreated = await getSupplyByName(supplyData.name);
    
            if(isCreated) {
                sendHttpResponse(res, 'El item ya existe, por favor vuelva a intentarlo');
            } else {
                const supplyCreated = await saveSupply(supplyData);
                sendHttpResponse(res,supplyCreated,200);
            }
            
        } catch (error) {
            sendHttpResponse(res, 'Error en supply controlador!!');
        }
    };
    
    getSupplies = async (req,res) => {
        const supplies = await getAllSupplies();
        try {
            
            if(!supplies) {
                sendHttpResponse(res, 'Error en supply controlador',500);
            }
            sendHttpResponse(res,supplies, 200);
        } catch (error) {
            sendHttpResponse(res, 'Error');
        }
    };
    
    getSupply = async (req,res) => {
    
    };
    
    updateSupply = async (req,res) => {
    
    };
    
    deleteSupply = async (req,res) => {
    
    };
}


exports.SupplyController = new SupplyController;