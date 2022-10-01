const { sequelize } = require("../../database/db-init");

const Ticket = sequelize.define('ticket',{
    
}, {
    tableName: 'tickets'
});

const ResponsableTicket = sequelize.define('responsableTicket',{
    
}, {
    tableName: 'responsable_tickets'
});

Ticket.loadAssociations = () => {
    
    // const { Workflow } = require("../../workflow/models/models");
    // Ticket.belongsTo(Workflow);
    
    // const { Perfil } = require("../../auth/models/models");
    // Ticket.belongsToMany(Perfil, {through: ResponsableTicket});
}


ResponsableTicket.loadAssociations = () => {
    
}
exports.Ticket = Ticket;
exports.ResponsableTicket = ResponsableTicket;