const { sendHttpResponse } = require("../../share/utils/response-parser");
const { getCategoryByName, saveCategory, getAllCategories, updateCategoryBydId, deleteCategoryBydId } = require("../domain/category-repository");


class CategoryController {
    createCategory = async (req, res) => {
        try {
            const categoryData = req.body;
            const isCreated = await getCategoryByName(categoryData.name);
            if(isCreated) {
                sendHttpResponse(res, 'La categoría ya existe en el sistema, vuelva a intentarlo');
            } else {
                let name = categoryData.name.toLowerCase().charAt(0).toUpperCase() +categoryData.name.slice(1) ;
                categoryData.name = name;
                const categoryCreated = await saveCategory(categoryData);
                sendHttpResponse(res, categoryCreated, 200);
            }
            
        } catch (error) {
            sendHttpResponse(res, 'Error en classification controlador');
        }
    };
    
    getCategories = async (req,res) => {
        
        try {
            const categories = await getAllCategories();
            if(!categories) {
                sendHttpResponse(res, 'Error en classification controlador',500);
            }
            sendHttpResponse(res, categories, 200);
        } catch (error) {
            sendHttpResponse(res, 'Error');
        }
    };
    
    getCategory = async (req,res) => {
    
    };
    
    updateCategory = async (req,res) => {
     
        try {
            const {categoryId, ...data} = req.body
            if(!categoryId || !data) throw new Error('body incompleto')
            const category = await updateCategoryBydId(categoryId, data)
            sendHttpResponse(res,category,200)
        } catch (error) {
            sendHttpResponse(res,error.message, 400)
        }
        
        
    };
    
    deleteCategory = async (req,res) => {
        try {
            const {categoryId} = req.body
            if(!categoryId) throw new Error('body incompleto')
            const category = await deleteCategoryBydId(categoryId)
            sendHttpResponse(res,category,200)
        } catch (error) {
            sendHttpResponse(res,error.message, 400)
        }
    };
}


exports.CategoryController = new CategoryController;
