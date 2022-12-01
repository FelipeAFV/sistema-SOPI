const { Manager, TicketStatus } = require("./models")
const { User } = require("../../auth/domain/models");
const { Ticket } = require('./models');
const { Purchase, PurchaseStatus } = require("../../purchases/domain/models");
const { sequelize } = require("../../database/db-init");
const { Op } = require("sequelize");


const addTicket = async ({ managerId, userId, title, content, date, purchaseId, statusId }) => {
    const newTicket = await Ticket.create({ title: title, content: content, expirationDate: date, managerId: managerId, ticketStatusId: statusId, userId: userId, purchaseId: purchaseId });
    return newTicket
};

const getTicketsFromManagerId = async (id) => {
    const ticket = await Ticket.findAll({ where: { managerId: id } });

    return ticket;
}
const getTicketsFromUserId = async (id) => {
    const ticket = await Ticket.findAll({ where: { userId: id }, include: [{ model: Purchase, include: [{ model: PurchaseStatus, as: 'status' }] }] });

    return ticket;
}

const getTicketFromId = async (id) => {

    const ticket = await Ticket.findOne({ where: { id: id }, include:[{model: User, attributes:['username','firstname','lastname']},{model:TicketStatus},{model:Manager, attributes:['id'],include:[{model:User, attributes:['username','firstname','lastname']}]}] })

    return ticket;
};

const updateFromIdTicket = async (id, updateValues) => {
    try {
        const ticket = await getTicketFromId(id)
        await ticket.update(updateValues)
        return ticket

    } catch (error) {
        console.log(error)
        throw new Error('error al actualizar Ticket')
    }

}

const getAllTickets = async(conditions, page ,perPage) => {
    const tickets = await Ticket.findAndCountAll({where:conditions,include:[{model:User, attributes:['username','firstname','lastname']},{model:TicketStatus}] , offset: (page-1)*perPage, limit:perPage, distinct: true,order: [['fecha_creacion','ASC'] ]});
    
    return tickets;
}

const getTicketFromPurchase = async (purchaseId) => {
    return await Ticket.findAll({ where: { purchaseId } });
}

exports.updateFromIdTicket = updateFromIdTicket;
exports.getTicketFromId = getTicketFromId;
exports.addTicket = addTicket;
exports.getTicketsFromManagerId = getTicketsFromManagerId;
exports.getTicketsFromUserId = getTicketsFromUserId;
exports.getAllTickets = getAllTickets;
exports.getTicketFromPurchase = getTicketFromPurchase;