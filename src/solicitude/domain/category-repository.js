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

const updateCategoryBydId = async (categoryId, data) => {

    try {
        const category = await SuppliesCategory.findOne({where:{id:categoryId}});
        console.log(category);
        if(!category) throw new Error('No existe una categoria con ese id')
        category.update(data)
        return category    
    } catch (error) {
        throw new Error(error.message)
    }
    
}

const deleteCategoryBydId = async (categoryId) => {

    try {
        const category = await SuppliesCategory.findOne({where:{id:categoryId}});
        if(!category) throw new Error('No existe una categoria con ese id')
        category.destroy()
        return 'categoria eliminada con exito'    
    } catch (error) {
        throw new Error(error.message)
    }
    
}

exports.deleteCategoryBydId = deleteCategoryBydId;
exports.updateCategoryBydId = updateCategoryBydId;
exports.saveCategory = saveCategory;
exports.getCategoryByName = getCategoryByName;
exports.getAllCategories = getAllCategories;