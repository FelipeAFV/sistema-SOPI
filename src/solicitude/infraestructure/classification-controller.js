const { sendHttpResponse } = require("../../share/utils/response-parser");
const { getCategoryByName, saveCategory } = require("../domain/category-repository");


class CategoryController {
    createCategory = async (req, res) => {
        try {
            const categoryData = req.body;
            const isCreated = await getCategoryByName(categoryData.name);
            if(isCreated) {
                sendHttpResponse(res, 'La categoría ya existe en el sistema, vuelva a intentarlo');
            } else {
                const categoryCreated = await saveCategory(categoryData);
                sendHttpResponse(res, categoryCreated, 200);
            }
            
        } catch (error) {
            sendHttpResponse(res, 'Error en classification controlador');
        }
    };
    
    getCategories = async (req,res) => {
    
    };
    
    getCategory = async (req,res) => {
    
    };
    
    updateCategory = async (req,res) => {
    
    };
    
    deleteCategory = async (req,res) => {
    
    };
}


exports.CategoryController = new CategoryController;
