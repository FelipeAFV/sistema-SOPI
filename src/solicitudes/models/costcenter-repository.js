const { CostCenter } = require("./models")

const findAllCostCenter = async () => {
    try {
        const costCenters = CostCenter.findAll();
    
        return costCenters;

    } catch (e) {
        return null;
    }
} 

exports.findAllCostCenter = findAllCostCenter;