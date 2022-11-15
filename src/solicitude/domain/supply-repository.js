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

exports.saveSupply = saveSupply;
exports.getAllSupplies = getAllSupplies;
exports.getSupplyByName = getSupplyByName;
