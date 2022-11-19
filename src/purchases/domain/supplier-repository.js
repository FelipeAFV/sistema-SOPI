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


exports.saveSupplier = saveSupplier;
exports.getAllSuppliers = getAllSuppliers;
exports.getSupplierByName = getSupplierByName;
