const {Manager} = require('./models')

const findManagerPurchase = async (userId) => {
    const result = await Manager.findAll({where:{userId}})
    if(!result){
        return null
    }
    return result;
}

exports.findManagerPurchase = findManagerPurchase;