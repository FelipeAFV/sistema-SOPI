const { sequelize } = require("../../database/db-init");

const Solicitud = sequelize.define('solicitud', {
    
},
{
    tableName: 'solicitudes'
});


const Detalle = sequelize.define('detalle', {
    
},
{
    tableName: 'detalles'
});

Solicitud.loadAssociations = () => {
    Solicitud.hasMany(Detalle);
}

Detalle.loadAssociations = () => {
    const { ProcesoCompra } = require("../../compras/models/models");
    Detalle.belongsTo(ProcesoCompra);
    Detalle.belongsTo(Solicitud);
}

exports.Solicitud = Solicitud;
exports.Detalle = Detalle;