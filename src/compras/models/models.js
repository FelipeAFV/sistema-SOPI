const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db-init");


const Purchase = sequelize.define('purchase',{

}, {
    tableName: 'compras'
});

const PurchaseDetail = sequelize.define('purchaseDetail', {
    quantity: {
        type: DataTypes.INTEGER,
        field: 'cantidad'
    },
    price: {
        type: DataTypes.NUMBER,
        field: 'precio'
    },

}, {
    tableName: 'compras_detalle'
});
const PurchaseLog = sequelize.define('purchaseLog', {

}, {
    tableName: 'compras_log'
});

const PurchaseType = sequelize.define('purchaseType', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    minValue: {
        type: DataTypes.DOUBLE,
        field: 'valor_minimo'
    },
    maxValue: {
        type: DataTypes.DOUBLE,
        field: 'valor_maximo'
    },
}, {
    tableName: 'compras_tipo'
});

const PurchaseStatus = sequelize.define('purchaseStatus', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    }
}, {
    tableName: 'compras_estado'
});

const Supplier = sequelize.define('supplier', {
    supplierName: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    businessName: {
        type: DataTypes.STRING,
        field: 'razon_social'
    },
    address:{
        type: DataTypes.STRING,
        field: 'dirección'
    },
    city: {
        type: DataTypes.STRING,
        field: 'ciudad'
    },
    sector:{
        type: DataTypes.STRING,
        field: 'comuna'
    },
    phone: {
        type: DataTypes.STRING,
        field: 'telefono'
    },
    
}, {
    tableName: 'proveedores'
});


Purchase.loadAssociations = () => {
    Purchase.belongsTo(PurchaseType);
    Purchase.belongsTo(Supplier);
    Purchase.hasMany(PurchaseLog);
    Purchase.hasMany(PurchaseDetail);

    const { Document, Manager } = require("../../gestion/models/models");
    Purchase.hasMany(Document);
    Purchase.hasMany(Manager);

    
}

PurchaseDetail.loadAssociations = () => {
    PurchaseDetail.belongsTo(Purchase);

    const { SopiDetail } = require("../../solicitudes/models/models");
    PurchaseDetail.belongsTo(SopiDetail)
}
PurchaseLog.loadAssociations = () => {
    PurchaseLog.belongsTo(PurchaseStatus)
    PurchaseLog.belongsTo(Purchase)
    
}
PurchaseType.loadAssociations = () => {
    PurchaseType.hasMany(Purchase)
}
PurchaseStatus.loadAssociations = () => {
    PurchaseStatus.hasMany(PurchaseLog);
    
}
Supplier.loadAssociations = () => {
    Supplier.hasMany(Purchase)

}


exports.Purchase = Purchase;
exports.PurchaseDetail = PurchaseDetail;
exports.PurchaseLog =PurchaseLog;
exports.PurchaseType =PurchaseType;
exports.PurchaseStatus = PurchaseStatus;
exports.Supplier = Supplier;