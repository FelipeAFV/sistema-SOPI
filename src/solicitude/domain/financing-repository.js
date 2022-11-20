const { Financing } = require("./models");

const findAllFinancing = async () => {
    
    try {
        const financing = await Financing.findAll();
        return financing;

    } catch (e) {
        return null;
    }
};

const getFinancingByName = async(name) => {
    return await Financing.findOne({
        where:{name}
    })
};

const saveFinancing = async(financing) => {
    return await Financing.create(financing);
};

const updateFinancing = async(id , financing) => {
    const financingToUpdate = await Financing.findOne({where:id});
    return await financingToUpdate.update(financing);
}



exports.findAllFinancing = findAllFinancing;
exports.saveFinancing = saveFinancing;
exports.getFinancingByName = getFinancingByName;
exports.updateFinancing = updateFinancing;