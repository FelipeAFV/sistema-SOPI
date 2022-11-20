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
}

exports.findAllCostCenter = findAllCostCenter;
exports.saveCostCenter = saveCostCenter;
exports.getCostCenterByName = getCostCenterByName;