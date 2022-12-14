const { userRepository } = require("../../auth/domain/user-repository");
const { Purchase } = require("../../purchases/domain/models");
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { addManagerForSopi, findPossibleManagers, findAllManagerInPurchase } = require("../application/responsible-service");
const { ApiValidationError } = require("../domain/api-errors");
const { saveManager, disableManagerById } = require("../domain/manager-repository");
const { Manager } = require("../domain/models");



const addManager = async (req, res) => {

    const {managerId, purchaseId} = req.body;

    
    
    try {
        const user = await userRepository.findUserById(managerId)

        const manager = await addManagerForSopi({managerId, purchaseId, profileId: user.profile.id })
        sendHttpResponse(res, manager, 200);
        return;
    } catch (e) {
        if (e instanceof ApiValidationError) {
            sendHttpResponse(res, 'Error', 400, e);
            return;
            
        }
        console.log(e)
        sendHttpResponse(res, 'Error', 500, 'Error al ingresar gestor de compra');
        return;
    }


    

}

const possibleManager = async (req,res) => {
    try {
        const {compraId} = req.query;
        if(!compraId){
            const possibleManagers = await findPossibleManagers();
            sendHttpResponse(res,possibleManagers,200)   
        }else{
            const managers = await findAllManagerInPurchase(compraId)
            console.log(managers)
            const activeManagers = managers.filter((m) => m.isActive)
            console.log(activeManagers)
            sendHttpResponse(res,activeManagers,200)
        }
         
    } catch (error) {
        sendHttpResponse(res,error.message, 403)
    }
    
};

const disableManager = async (req, res) => {
    try {
        const {id} = req.body;
        if(!id) throw new Error('Falta indicar el id del manager');
        const managerDisabled = await disableManagerById(id);
        sendHttpResponse(res, managerDisabled, 200)
    } catch (error) {
        sendHttpResponse(res, error.message, 500);
    }
}


exports.possibleManager = possibleManager;
exports.addManager = addManager;
exports.disableManager = disableManager;
