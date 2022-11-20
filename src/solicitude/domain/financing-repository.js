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
}



exports.findAllFinancing = findAllFinancing;
exports.saveFinancing = saveFinancing;
exports.getFinancingByName = getFinancingByName;