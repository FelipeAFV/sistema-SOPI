const { CostCenter } = require("./models")

const findAllCostCenter = async () => {
    try {
        const costCenters = CostCenter.findAll();
    
        return costCenters;

    } catch (e) {
        return null;
    }
};

const saveCostCenter = async (costCenter) => {
    return await CostCenter.create(costCenter);
};

const getCostCenterByName = async (name) => {
    return await CostCenter.findOne({where:{name}})
};

const updateCostCenterById = async (id, costName) => {
    const costCenter = await CostCenter.findOne({where:id});
    return await costCenter.update(costName)
};

const deleteCostCenterById = async(id) => {
    try {
        const costCenter = await CostCenter.findOne({where: {id}});
        if(!costCenter) throw new Error('No existe centro de costo con ese id');
        costCenter.destroy();
        return 'Centro de costo eliminado exitosamente'
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.findAllCostCenter = findAllCostCenter;
exports.saveCostCenter = saveCostCenter;
exports.getCostCenterByName = getCostCenterByName;
exports.updateCostCenterById = updateCostCenterById;
exports.deleteCostCenterById = deleteCostCenterById;