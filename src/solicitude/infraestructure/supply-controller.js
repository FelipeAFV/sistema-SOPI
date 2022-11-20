const { sendHttpResponse } = require("../../share/utils/response-parser");
const { saveSupply, getSupplyByName, getAllSupplies, updateSupplyBydId, deleteSupplyBydId } = require("../domain/supply-repository");

class SupplyController {
    createSupply = async (req, res) => {
        try {
            const supplyData = req.body;
    
            const isCreated = await getSupplyByName(supplyData.name);
    
            if(isCreated) {
                sendHttpResponse(res, 'El item ya existe, por favor vuelva a intentarlo');
            } else {
                let name = supplyData.name.toLowerCase().charAt(0).toUpperCase() +supplyData.name.slice(1) ;
                supplyData.name = name;
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
        try {
            const {supplyId, ...data} = req.body
            if(!supplyId || !data) throw new Error('body incompleto')
            const supply = await updateSupplyBydId(supplyId, data)
            sendHttpResponse(res,supply,200)
        } catch (error) {
            sendHttpResponse(res,error.message, 400)
        }
    
    };
    
    deleteSupply = async (req,res) => {
        try {
            const {supplyId} = req.body
            if(!supplyId) throw new Error('body incompleto')
            const resp = await deleteSupplyBydId(supplyId)
            sendHttpResponse(res,resp,200)
        } catch (error) {
            sendHttpResponse(res,error.message, 400)
        }
    };
}


exports.SupplyController = new SupplyController;