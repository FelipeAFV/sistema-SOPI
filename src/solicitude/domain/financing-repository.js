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

const updateFinancingById = async(id , financing) => {
    const financingToUpdate = await Financing.findOne({where:id});
    return await financingToUpdate.update(financing);
};

const deleteFinancingById = async(id) => {
    try {
        const financing = await Financing.findOne({where: {id}});
        if(!financing) throw new Error('No existe financiamiento con ese id');
        financing.destroy();
        return 'Financiamiento eliminado exitosamente'
    } catch (error) {
        throw new Error(error.message);
    }
};



exports.findAllFinancing = findAllFinancing;
exports.saveFinancing = saveFinancing;
exports.getFinancingByName = getFinancingByName;
exports.updateFinancingById = updateFinancingById;
exports.deleteFinancingById = deleteFinancingById;