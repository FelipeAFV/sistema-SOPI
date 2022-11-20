const { SuppliesCategory } = require("./models")


const saveCategory = async (data) => {
    return await SuppliesCategory.create(data);
};

const getCategoryByName = async(name) => {
    const category = await SuppliesCategory.findOne({where:{name}});
    return category;
};

const getAllCategories = async () => {
    try {
        const categories =  await SuppliesCategory.findAll();
        return categories;
    } catch (e) {
        return null;
    }
};

exports.saveCategory = saveCategory;
exports.getCategoryByName = getCategoryByName;
exports.getAllCategories = getAllCategories;