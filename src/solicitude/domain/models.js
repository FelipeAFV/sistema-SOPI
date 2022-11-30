
const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../database/db-init");


const Sopi = sequelize.define('sopi', {
    basis: {
        type: DataTypes.STRING,
        field: 'fundamento',
        allowNull: false
    },
    priority: {
        type: DataTypes.BOOLEAN,
        field: 'prioridad'
    },
    technicalSpecification: {
        type: DataTypes.STRING,
        field: 'especificacion_tecnica'
    }
},
    {
        tableName: 'solicitudes'
    });


const SopiDetail = sequelize.define('sopiDetail', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    features: {
        type: DataTypes.STRING,
        field: 'caracteristicas'
    },
    quantity: {
        type: DataTypes.INTEGER,
        field: 'cantidad'
    },
    price: {
        type: DataTypes.DOUBLE,
        field: 'precio'
    },
    sopiId: {
        type: DataTypes.INTEGER,
        field: 'solicitud_id'
    }


},
    {
        tableName: 'solicitudes_detalle'
    });

const SopiLog = sequelize.define('sopiLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    updateDate: {
        type: DataTypes.DATE,
        field: 'fecha_actualización'
    },
    comment: {
        field: 'comentario',
        type: DataTypes.STRING
    }
},
    {
        tableName: 'solicitudes_log'
    });
const SopiStatus = sequelize.define('sopiStatus', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    cod: {
        type: DataTypes.STRING,
        field: 'código'
    },
    level: {
        type: DataTypes.INTEGER,
        field: 'nivel_completitud'
    }
},
    {
        tableName: 'solicitudes_estado',
        timestamps: false
    });
const Supplies = sequelize.define('supply', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    feature: {
        type: DataTypes.STRING,
        field: 'caracteristicas'
    },
    price: {
        type: DataTypes.DOUBLE,
        field: 'precio'
    }
},
    {
        tableName: 'insumos'
    });

const SuppliesCategory = sequelize.define('suppliesCategory', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    }
},
    {
        tableName: 'categorias'
    });
const CostCenter = sequelize.define('costCenter', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },

},
    {
        tableName: 'centros_costo',
        timestamps: false
    });
const Financing = sequelize.define('financing', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    }

},
    {
        tableName: 'financiamientos',
        timestamps: false
    });

Sopi.loadAssociations = () => {
    Sopi.belongsTo(CostCenter, { foreignKey: { field: 'centro_costo_id' } });
    Sopi.belongsTo(Financing, { foreignKey: { field: 'financiamiento_id' } });
    Sopi.hasMany(SopiLog /* { as: 'sopiLogStatus', through: SopiLog, uniqueKey:false  *//* foreignKey: { field: 'sopi_id', name: 'sopiId' }  }*/);
    Sopi.hasMany(SopiDetail, { foreignKey: { field: 'solicitud_id' } });
    Sopi.belongsTo(SopiStatus, { as: 'status', foreignKey: { field: 'estado_id' } });


    const { Purchase, PurchaseSopi } = require("../../purchases/domain/models");
    Sopi.belongsToMany(Purchase, { through: PurchaseSopi, foreignKey: { field: 'sopi_id', name: 'sopiId' } });

    const { User } = require("../../auth/domain/models");
    Sopi.belongsTo(User, { foreignKey: { field: 'usuario_id' } });

}
SopiDetail.loadAssociations = () => {
    SopiDetail.belongsTo(Sopi, { foreignKey: { field: 'solicitud_id' } });
    SopiDetail.belongsTo(Supplies, { foreignKey: { field: 'insumo_id' } });
    const { PurchaseDetail } = require("../../purchases/domain/models");
    SopiDetail.hasOne(PurchaseDetail, { foreignKey: { field: 'solicitud_detalle_id' } })

}
SopiLog.loadAssociations = () => {
    SopiLog.belongsTo(Sopi);
    SopiLog.belongsTo(SopiStatus);
    const { User } = require("../../auth/domain/models");
    SopiLog.belongsTo(User, { foreignKey: { field: 'usuario_id' } });

}
SopiStatus.loadAssociations = () => {
    SopiStatus.hasMany(SopiLog,/* { through: SopiLog, uniqueKey:false *//* foreignKey: { field: 'estado_id', name: 'statusId' }  }*/);
    SopiStatus.hasMany(Sopi, { foreignKey: { field: 'estado_id' } });

}
Supplies.loadAssociations = () => {
    Supplies.hasMany(SopiDetail, { foreignKey: { field: 'insumo_id' } });
    Supplies.belongsTo(SuppliesCategory, { foreignKey: { field: 'categoria_id' } });
}
SuppliesCategory.loadAssociations = () => {
    SuppliesCategory.hasMany(Supplies, { foreignKey: { field: 'categoria_id' } });
}
CostCenter.loadAssociations = () => {
    CostCenter.hasMany(Sopi, {
        foreignKey: {
            allowNull: false, field: 'centro_costo_id'
        }
    });
}
Financing.loadAssociations = () => {
    Financing.hasMany(Sopi, {
        foreignKey: {
            allowNull: false, field: 'financiamiento_id'
        }
    });
}



exports.Sopi = Sopi;
exports.SopiDetail = SopiDetail;
exports.SopiLog = SopiLog;
exports.SopiStatus = SopiStatus;
exports.Supplies = Supplies;
exports.SuppliesCategory = SuppliesCategory;
exports.CostCenter = CostCenter;
exports.Financing = Financing;
