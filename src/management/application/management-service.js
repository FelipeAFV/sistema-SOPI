const {findManagerPurchase} = require('../domain/managment-repository')
const {sendHttpResponse} = require('../../share/utils/response-parser')
const {Manager} = require('../domain/models')
const {userRepository} = require('../../auth/domain/user-repository')


const getManagerPurchase = async(req,res) => {
    const {userId} = req.body;
    const result = await findManagerPurchase(userId);
    sendHttpResponse(res, result, 200);
}

// const createManager = async (req,res) => {
//     const {userId, purchaseId} = req.body;
//     const userExists = await userRepository.findUserById(userId)
//     console.log(userExists);
//     if(!userExists){
//         sendHttpResponse(res,'usuario no existe', 400)
//     }else {
//         const result = await findManagerPurchase(userId);
//         console.log(result);
//         if (result.find(e => e.purchaseId == purchaseId)) {
//             sendHttpResponse(res,'usuario ya esta añadido a compra', 400)
//           }else {
//             const manager = Manager.create({name:userExists.firstname, userId:userExists.id, purchaseId:purchaseId})
//             sendHttpResponse(res,'new manager created', 200)
//         }
//     }
//     /*const result = await findManagerPurchase(userId);
//     if(result) {
//         sendHttpResponse(res,'manager ya esta añadido a compra', 400)
//     }else {
//         const manager = Manager.create({})
//     }*/
// }

exports.getManagerPurchase = getManagerPurchase;
