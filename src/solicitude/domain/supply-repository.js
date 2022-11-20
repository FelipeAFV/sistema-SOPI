const { Supplies } = require("./models")


const saveSupply = async (supply) => {
    return await Supplies.create(supply);
};

const getAllSupplies = async () => {
    try {
        const supplies =  await Supplies.findAll();
        return supplies;

    } catch (e) {
        return null;
    }
}

const getSupplyByName = async(name) => {
    const supply = await Supplies.findOne({where:{name}});
    return supply;
}

const updateSupplyBydId = async (supplyId, data) => {

    try {
        const supply = await Supplies.findOne({where:{id:supplyId}});
        if(!supply) throw new Error('No existe un insumo con ese id')
        supply.update(data)
        return supply    
    } catch (error) {
        throw new Error(error.message)
    }
    
}

const deleteSupplyBydId = async (supplyId) => {

    try {
        const supply = await Supplies.findOne({where:{id:supplyId}});
        if(!supply) throw new Error('No existe un insumo con ese id')
        supply.destroy()
        return 'insumo eliminado con exito'    
    } catch (error) {
        throw new Error(error.message)
    }
    
}

exports.deleteSupplyBydId = deleteSupplyBydId;
exports.updateSupplyBydId = updateSupplyBydId;
exports.saveSupply = saveSupply;
exports.getAllSupplies = getAllSupplies;
exports.getSupplyByName = getSupplyByName;
