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

}, {
    tableName: 'tickets'
});
const Comment = sequelize.define('comment',{
    title: {
        type: DataTypes.STRING,
        field: 'titulo'
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
const Manager = sequelize.define('manager',{
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    }
}, {
    tableName: 'gestores'
});



Document.loadAssociations = () => {
    const { Purchase } = require("../../compras/models/models");
    
    Document.belongsTo(Purchase);
    
    
}

Manager.loadAssociations = () => {
    const { User } = require("../../auth/models/models");
    Manager.belongsTo(User);
    const { Purchase } = require("../../compras/models/models");
    Manager.belongsTo(Purchase);

    Manager.hasMany(Ticket);
}

Ticket.loadAssociations = () => {
    Ticket.belongsTo(Manager);
    Ticket.hasMany(Comment);

    const { User } = require("../../auth/models/models");
    Ticket.belongsTo(User);
}

Comment.loadAssociations = () => {
    Comment.belongsTo(Ticket);
}



exports.Manager = Manager;
exports.Document = Document;
exports.Comment = Comment;
exports.Ticket = Ticket;