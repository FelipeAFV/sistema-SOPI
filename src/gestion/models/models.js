const { DataTypes } = require("sequelize");


const { sequelize } = require("../../database/db-init");


const Document = sequelize.define('documento', {
    documentName : {
        type: DataTypes.STRING,
        field: 'nombre_documento'
    },
    documentType: {
        type: DataTypes.STRING,
        field: 'tipo_documento'
    },
    documentRoute: {
        type: DataTypes.STRING,
        field: 'ruta_documento'
    }
}, {
    tableName: 'documentos'
});

const Ticket = sequelize.define('ticket',{

}, {
    tableName: 'tickets'
});
const Comment = sequelize.define('comment',{
    title: {
        type: DataTypes.STRING,
        field: 'titulo_comentario'
    },
    content: {
        type: DataTypes.STRING,
        field: 'contenido'
    },
    state: {
        type: DataTypes.INTEGER,
        field: 'estado'
    },
    expirationDate: {
        type: DataTypes.DATE,
        field: 'fecha_vencimiento'
    }

}, {
    tableName: 'commentarios'
});
const Manager = sequelize.define('manegar',{
    managerName: {
        type: DataTypes.STRING,
        field: 'nombre_jefe'
    }
}, {
    tableName: 'gestores'
});



Document.loadAssociations = () => {
    const { Purchase } = require("../../compras/models/models");

    Document.belongsTo(Purchase);


}

Manager.loadAssociations = () => {

    Manager.hasMany(Ticket);
}

Ticket.loadAssociations = () => {
    Ticket.belongsTo(Manager);
    Ticket.hasMany(Comment);
}

Comment.loadAssociations = () => {
    Comment.belongsTo(Ticket);
}



exports.Manager = Manager;
exports.Document = Document;
exports.Comment = Comment;
exports.Ticket = Ticket;