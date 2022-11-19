const { sendHttpResponse } = require("../../share/utils/response-parser");
const { getCategoryByName, saveCategory, getAllCategories } = require("../domain/category-repository");


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
    
    };
    
    deleteCategory = async (req,res) => {
    
    };
}


exports.CategoryController = new CategoryController;
