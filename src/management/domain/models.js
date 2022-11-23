const { DataTypes } = require("sequelize");

const { sequelize } = require("../../database/db-init");


const Document = sequelize.define('documento', {
    name : {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    type: {
        type: DataTypes.STRING,
        field: 'tipo'
    },
    path: {
        type: DataTypes.STRING,
        field: 'ruta'
    }
}, {
    tableName: 'documentos'
});

const Ticket = sequelize.define('ticket',{
    title: {
        type: DataTypes.STRING,
        field: 'titulo'
    },
    content: {
        type: DataTypes.STRING,
        field: 'contenido'
    },
    expirationDate: {
        type: DataTypes.DATEONLY,
        field: 'fecha_vencimiento'
    }

}, {
    tableName: 'tickets', updatedAt:false, createdAt:'fecha_creacion'
});

const TicketStatus = sequelize.define('ticketStatus',{
    name: {
        type: DataTypes.STRING,
        field: 'estado'
    },
    

}, {
    tableName: 'ticket_status', timestamps:false
});

const Comment = sequelize.define('comment',{
    response: {
        type: DataTypes.STRING,
        field: 'respuesta'
    },
    

}, {
    tableName: 'comentarios'
});
const Manager = sequelize.define('manager',{
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    }
}, {
    tableName: 'gestores'
});



Document.loadAssociations = () => {
    const { Purchase } = require("../../purchases/domain/models");
    
    Document.belongsTo(Purchase, { foreignKey: { field: 'compra_id'}});
    
    
}

Manager.loadAssociations = () => {
    const { User } = require("../../auth/domain/models");
    Manager.belongsTo(User, { foreignKey: { field: 'usuario_id'}});
    const { Purchase } = require("../../purchases/domain/models");
    Manager.belongsTo(Purchase, { foreignKey: { field: 'compra_id'}});
    
    Manager.hasMany(Ticket, {foreignKey: { field: 'gestor_id'}});
}

Ticket.loadAssociations = () => {
    const { Purchase } = require("../../purchases/domain/models");

    Ticket.belongsTo(Manager, { foreignKey: { field: 'gestor_id'}});
    Ticket.belongsTo(Purchase, { foreignKey: { field: 'compra_id'}});
    Ticket.hasMany(Comment, { foreignKey: { field: 'ticket_id'}});

    const { User } = require("../../auth/domain/models");
    Ticket.belongsTo(User, { foreignKey: {field: 'responsable_id'}});
    Ticket.belongsTo(TicketStatus, { foreignKey: {field: 'estado_id'}})
}

TicketStatus.loadAssociations = () => {
    TicketStatus.hasMany(Ticket, { foreignKey: {field: 'estado_id'}})
}

Comment.loadAssociations = () => {
    Comment.belongsTo(Ticket, { foreignKey: { field: 'ticket_id'}});
    const { User } = require("../../auth/domain/models");
    Comment.belongsTo(User, {foreignKey: {field: 'creador_id', name:'creatorId'}});
}


exports.TicketStatus = TicketStatus;
exports.Manager = Manager;
exports.Document = Document;
exports.Comment = Comment;
exports.Ticket = Ticket;