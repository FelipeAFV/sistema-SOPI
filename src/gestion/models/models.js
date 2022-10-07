const { DataTypes } = require("sequelize");


const { sequelize } = require("../../database/db-init");


const Document = sequelize.define('documento', {
    nombre : {
        type: DataTypes.STRING
    },
    tipo: {
        type: DataTypes.STRING
    },
    ruta: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'documentos'
});

const Ticket = sequelize.define('ticket',{

}, {
    tableName: 'tickets'
});
const Comment = sequelize.define('comment',{

}, {
    tableName: 'commentarios'
});
const Manager = sequelize.define('manegar',{

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