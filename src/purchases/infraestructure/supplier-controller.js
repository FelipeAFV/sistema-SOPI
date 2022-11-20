const {sendHttpResponse} = require("../../share/utils/response-parser");
const { saveSupplier, getSupplierByName, getAllSuppliers } = require("../domain/supplier-repository");


class SupplierController {
    createSupplier = async(req,res) => {
        try {
            const supplierData = req.body;
            const isCreated = await getSupplierByName(supplierData.supplierName);

            if(isCreated) {
                sendHttpResponse(res, 'El proveedor ya existe, por favor vuelta a intentarlo');
            } else {
                let name = supplierData.supplierName.toLowerCase().charAt(0).toUpperCase() +supplierData.supplierName.slice(1) ;
                supplierData.supplierName = name;
                //console.log(name.charAt(0).toUpperCase() + name.slice(1));
                
                const supplierCreated = await saveSupplier(supplierData);
                sendHttpResponse(res, supplierCreated, 200);
            }
        } catch (error) {
            sendHttpResponse(res, 'Error en supplier controller!!!')
        }
    };
    getSuppliers = async(req,res) => {
        try {
            const suppliers = await getAllSuppliers();
            if(!suppliers) {
                sendHttpResponse(res, 'Error en supplier controlador',500);
            }
            sendHttpResponse(res, suppliers, 200);
        } catch (error) {
            sendHttpResponse(res, 'Error aaaas');
        }
    }

}

exports.SupplierController = new SupplierController;