const {Supplier} = require("./models");

const saveSupplier = async(supplier) => {
    return await Supplier.create(supplier);
};

const getSupplierByName  = async(name) => {
    const supplier = await Supplier.findOne({where:{supplierName:name}});
    return supplier;
};

const getAllSuppliers = async () => {
    try {
        const suppliers = await Supplier.findAll();
        return suppliers;
    } catch (e) {
        return null;
    }
};

const updateSupplierById = async (supplierId, data) => {
    try {
        const supplier = await Supplier.findOne({where:{id:supplierId}})
        if(!supplier) throw new Error('proveedor no existe')
        supplier.update(data)
        return supplier
    } catch (error) {
        throw new Error('Error al actualizar proveedor')
    }
}

const deleteSupplierById = async (supplierId) => {
    try {
        const supplier = await Supplier.findOne({where:{id:supplierId}})
        if(!supplier) throw new Error('proveedor no existe')
        supplier.destroy()
        return 'proveedor eliminado con exito'
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.deleteSupplierById = deleteSupplierById;
exports.updateSupplierById = updateSupplierById;
exports.saveSupplier = saveSupplier;
exports.getAllSuppliers = getAllSuppliers;
exports.getSupplierByName = getSupplierByName;
