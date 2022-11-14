const { SuppliesCategory } = require("./models")


const saveCategory = async (data) => {
    return await SuppliesCategory.create(data);
};

const getCategoryByName = async(name) => {
    const category = await SuppliesCategory.findOne({where:{name}});
    return category;
}

exports.saveCategory = saveCategory;
exports.getCategoryByName = getCategoryByName;